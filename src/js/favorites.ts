import {LitElement, html} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Events, favoriteIcon} from './shared';


@customElement('gc-favorites')
class GoodAndCheapFavorites extends LitElement {
  private clickListener: EventListenerObject;
  private keyListener: EventListenerObject;

  @query('button') button: HTMLButtonElement;
  @query('dialog') dialog: HTMLDialogElement;

  @state() favorites: [];
  @state() inert: boolean = true;
  @state() open: boolean = false;

  constructor() {
    super();
    this.clickListener = this.handleClick.bind(this);
    this.keyListener = this.handleKey.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(Events.Click, this.clickListener);
    document.addEventListener('keyup', this.keyListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keyup', this.keyListener);
  }

  protected createRenderRoot() {
    return this;
  }

  private togglePanel() {
    if (this.open) {
      this.inert = true;
      this.dialog.addEventListener('transitionend', () => {
        this.dialog.close();
        this.open = false;
      }, {once: true});
    } else {
      this.inert = false;
      this.dialog.show();
      this.open = true;
    }
  }

  private handleClick(event: Event) {
    const target = event.composedPath()[0];
    if (target === this.button || (target === document.body && this.open)) {
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
    if (!this.favorites) return;

    const label = this.open ? 'Close' : 'Favorites';

    return html`
      <button
        aria-label="${label}"
        id="toggle"
        title="${label}"
        type="button">
        ${unsafeHTML(favoriteIcon)}
      </button>

      <dialog
        id="info"
        ?inert="${this.inert}"
        ?open="${this.open}">
        <div></div>
      </dialog>
    `;
  }
}
