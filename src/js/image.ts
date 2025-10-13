import {LitElement, html, PropertyValues} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';

@customElement('gc-image')
class GoodAndCheapImage extends LitElement {
  @property() src: string;
  @query('img') image: HTMLImageElement;
  @state() loading: boolean = true;
  
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('src')) {
      this.loading = true;
    }
  }

  private async load() {
    await this.updateComplete;

    if (this.image.complete) {
      this.loading = false;
    } else {
      this.image.onload = () => this.loading = false;
    }
  }

  protected createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <img
        alt=""
        aria-hidden="${this.loading}"
        src="./images/${this.src}@large.webp">
    `;
  }
}
