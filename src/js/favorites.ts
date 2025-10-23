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
      this.inert = false;
      this.dialog.showModal();
      this.open = true;
    }
  }

  private handleClick(event: Event) {
    const target = event.composedPath()[0];
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
        <li>
          <a href="./${chapter}/${id}">
            <figure>
              <img src="./images/${image}@thumb.webp" alt="">
            </figure>
            <div class="description">
              <p class="title">${title}</p>
              ${badge ? html`<p class="badge">${badge}</p>` : nothing}
              ${serving ? html`<p class="serving">${serving}</p>` : nothing}
            </div>
            <div class="counter">${counter}</div>
          </a>
        </li>
      `);
      counter += 1;
    }

    const label = 'View Favorites';
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
          <div class="content">
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
