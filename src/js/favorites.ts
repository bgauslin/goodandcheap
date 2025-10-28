import {LitElement, html, nothing} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {favoriteIcon, Events, RecipePreview} from './shared';


/**
 * Custom element for rendering favorites in a <dialog>, as well as removing
 * them.
 */
@customElement('gc-favorites')
class GoodAndCheapFavorites extends LitElement {
  private clickListener: EventListenerObject;
  private dataListener: EventListenerObject;
  private keyListener: EventListenerObject;

  @property({reflect: true}) active: boolean = false;

  @query('button') button: HTMLButtonElement;
  @query('.content') content: HTMLElement;
  @query('dialog') dialog: HTMLDialogElement;
  @query('.toggle') toggle: HTMLElement;

  @state() data = new Set<RecipePreview>();
  @state() inert: boolean = true;
  @state() open: boolean = false;

  constructor() {
    super();
    this.clickListener = this.handleClick.bind(this);
    this.dataListener = this.updateData.bind(this);
    this.keyListener = this.handleKey.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(Events.Data, this.dataListener);
    document.addEventListener(Events.Click, this.clickListener);
    document.addEventListener(Events.Keyup, this.keyListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(Events.Data, this.dataListener);
    document.removeEventListener(Events.Click, this.clickListener);
    document.removeEventListener(Events.Keyup, this.keyListener);
  }

  protected createRenderRoot() {
    return this;
  }

  private updateData(event: CustomEvent) {
    this.data = event.detail;
    this.requestUpdate();
    this.animateToggle();
  }

  /**
   * Adds am animation to the button and its count whenever a favorite
   * is added or removed.
   */
  private async animateToggle() {
    await this.updateComplete;

    // Don't animate the toggle if favorites panel is open.
    if (this.active) return;

    this.toggle.classList.add('added');
    this.toggle.addEventListener('animationend', () => {
      this.toggle.classList.remove('added');
    }, {once: true});
  }

  /**
   * Opens/closes the <dialog> and uses a one-time listener and an RAF tick
   * to ensure smooth transitions since a <dialog> opens/closes instantly
   * by default.
   */
  private togglePanel() {
    if (this.open) {
      this.active = false;
      this.inert = true;
      this.content.addEventListener('transitionend', () => {
        this.dialog.close();
        this.open = false;
      }, {once: true});
    } else {
      this.active = true;
      this.open = true;
      this.dialog.showModal();
      window.requestAnimationFrame(() => this.inert = false);
    }
  }

  /**
   * Sets custom properties that animate the recipe's removal, then dispatches
   * event that removes the favorite from the list.
   */
  private removeFavorite(event: Event) {
    const {target} = event;
    const closest = (<HTMLButtonElement>target).closest('.previews__item');
    const element = (<HTMLElement>closest);

    // Get chapter and ID for sending up to the app.
    const chapter = element.dataset.chapter;
    const id = element.dataset.id;

    // Get element's height and set custom property so that its transition
    // triggers when the custom property changes.
    const {height} = element.getBoundingClientRect();
    element.style.setProperty('--block-size', `${height}px`);

    // Wait a tick, change the custom property, then remove the element from
    // the favorites list after its transition ends.
    window.requestAnimationFrame(() => {
      element.style.setProperty('--block-size', '0');
      
      element.addEventListener('transitionend', () => {
        element.removeAttribute('style');

        this.dispatchEvent(new CustomEvent(Events.Favorites, {
          bubbles: true,
          composed: true,
          detail: {
            chapter,
            id,
          }
        }));
      }, {once: true});
    });
  }

  /**
   * Opens/closes the <dialog> based on where a click occurs. This allows
   * clicks outside the element to close an opened <dialog>.
   */
  private handleClick(event: Event) {
    const target = <HTMLElement>event.composedPath()[0];

    // Keep the dialog open if content area or a remove button is clicked.
    if (['content', 'meta', 'remove'].includes(target.className)) {
      return;
    }

    // Open the dialog if the opener button is clicked; close it if click is
    // anywhere else.
    if (target === this.button || this.open) {
      this.togglePanel();
    }
  }

  /**
   * Forces attribute changes when the [esc] key is pressed. Since the [esc] key
   * closes modal dialogs by default, and since we can't hijack modal behavior
   * to change the 'open' state after a transition finishes, we need to manually
   * change the attributes here.
   */
  private handleKey(event: KeyboardEvent) {
    const {code} = event;

    if (code === 'Escape' && this.open) {
      this.active = false;
      this.inert = true;
      this.open = false;
    }
  }

  protected render() {
    let counter = 0;
    const previews = [];
    for (const recipe of this.data) {
      const {badge, chapter, id, image, serving, title} = recipe;
      counter += 1;
      previews.push(html`
        <li class="previews__item" data-id="${id}" data-chapter="${chapter}">
          <a class="previews__link" href="./${chapter}/${id}">
            <figure class="previews__figure">
              <img class="previews__img" src="./images/${image}@thumb.webp" alt="">
            </figure>
            <div class="previews__description">
              <p class="previews__title">${title}</p>
              ${badge ? html`<p class="badge">${badge}</p>` : nothing}
              ${serving ? html`<p class="serving">${serving}</p>` : nothing}
            </div>
            <div class="previews__counter">${counter}</div>
          </a>
          <button
            aria-label="Remove ${title} from Favorites"  
            class="remove"
            title="Remove from Favorites"
            type="button"
            @click="${this.removeFavorite}">
            <svg aria-hidden="true" viewbox="0 0 24 24">
              <path d="M7,7 L17,17 M7,17 L17,7"/>
            </svg>
          </button>
        </li>
      `);
    }

    const count = this.data.size;
    let label = count ? `${count} Favorite${count > 1 || count === 0 ? 's' : ''}` : 'Favorites';
    if (this.active) label = 'Close Favorites';
    return html`
      <div class="toggle">
      ${!this.active ?
      html`
        <button
          aria-label="${label}"
          class="favorite favorite--toggle"
          title="${label}"
          type="button">
          ${unsafeHTML(favoriteIcon)}
        </button>
        ${count ? html`<div class="count">${count}</div>` : nothing}
      ` :
      html`
        <button
          aria-label="${label}"
          class="close"
          title="${label}"
          type="button">
          <svg aria-hidden="true" viewbox="0 0 24 24">
            <path d="M5,5 L19,19 M5,19 L19,5"/>
          </svg>
        </button>
      `}
      </div>

      <dialog
        ?inert="${this.inert}"
        ?open="${this.open}">
        <div class="dialog">
          <div class="content" ?data-empty="${count === 0}">
            <div class="meta">
              <h1>${count > 0 ? `${count}` : 'No'} Favorite${count > 1 || count === 0 ? 's' : ''}</h1>
            </div>
            ${previews.length > 0 ? html`
            <ol class="previews">
              ${previews}
            </ol>` : nothing}
          </div>
        </div>
      </dialog>
    `;
  }
}
