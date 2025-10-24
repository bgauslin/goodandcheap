import {LitElement, html, nothing} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {favoriteIcon, Events, RecipePreview} from './shared';


@customElement('gc-favorites')
class GoodAndCheapFavorites extends LitElement {
  private clickListener: EventListenerObject;
  private dataListener: EventListenerObject;
  private keyListener: EventListenerObject;

  @query('button') button: HTMLButtonElement;
  @query('.content') content: HTMLElement;
  @query('dialog') dialog: HTMLDialogElement;

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
  }

  private togglePanel() {
    if (this.open) {
      this.inert = true;
      this.content.addEventListener('transitionend', () => {
        this.dialog.close();
        this.open = false;
      }, {once: true});
    } else {
      this.open = true;
      this.dialog.showModal();
      window.requestAnimationFrame(() => this.inert = false);
    }
  }

  /**
   * Dispatches event that removes the favorite from the list.
   */
  private removeFavorite(chapter: string, id: string) {
    this.dispatchEvent(new CustomEvent(Events.Favorites, {
      bubbles: true,
      composed: true,
      detail: {
        chapter,
        id,
      }
    }));
  }

  private handleClick(event: Event) {
    const target = <HTMLElement>event.composedPath()[0];

    // Keep the dialog open if content area or a remove button is clicked.
    if (['content', 'remove'].includes(target.className)) {
      return;
    }

    // Open the dialog if the opener button is clicked; close it if click is
    // anywhere else.
    if (target === this.button || this.open) {
      this.togglePanel();
    }
  }

  private handleKey(event: KeyboardEvent) {
    if (event.code === 'Escape' && this.open) {
      event.preventDefault();
      this.togglePanel();
    }
  }

  protected render() {
    let counter = 1;
    const previews = [];
    for (const recipe of this.data) {
      const {badge, chapter, id, image, serving, title} = recipe;
      previews.push(html`
        <li class="previews__item">
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
            class="remove"
            data-id="${id}"
            title="Remove from Favorites"
            type="button"
            @click="${() => this.removeFavorite(chapter, id)}">
            <svg aria-hidden="true" viewbox="0 0 24 24">
              <path d="M7,7 L17,17 M7,17 L17,7"/>
            </svg>
          </button>
        </li>
      `);
      counter += 1;
    }

    const label = 'View Favorites';
    const count = previews.length;
    return html`
      <button
        aria-label="${label}"
        class="favorite"
        title="${label}"
        type="button">
        ${unsafeHTML(favoriteIcon)}
        ${this.data ? this.data.size : nothing}
      </button>

      <dialog
        ?inert="${this.inert}"
        ?open="${this.open}">
        <div class="dialog">
          <div
            class="content"
            ?data-empty="${count === 0}">
          <h1>${count > 0 ? `${count}` : 'No'} saved recipe${count > 1 || count === 0 ? 's' : ''}</h1>

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
