import {LitElement, html, nothing, PropertyValues} from 'lit';
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
      ${this.loading ? html`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><rect x="11" y="1" width="2" height="5" opacity=".14"/><rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29"/><rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43"/><rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57"/><rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71"/><rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86"/><rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg>` : nothing}
      <img
        alt=""
        aria-hidden="${this.loading}"
        src="./images/${this.src}@medium.webp"
        srcset="
          ./images/${this.src}@small.webp 480w,
          ./images/${this.src}@medium.webp 640w,
          ./images/${this.src}@large.webp 720w"
        sizes="(min-width: 720px) 720px, 100vw">
    `;
  }
}
