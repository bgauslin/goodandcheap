import {LitElement, html, nothing, PropertyValues} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';


/**
 * Custom element for rendering a cover image for the Good And Cheap app.
 * This element fetches an image when its 'src' attribute changes and displays
 * a spinner until the image is fully loaded.
 */
@customElement('gc-cover')
class GoodAndCheapCover extends LitElement {
  @property() src: string;
  @query('img') image: HTMLImageElement;
  @state() loading: boolean = true;
  
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('src')) {
      this.loading = true;
      this.load();
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
      ${this.loading ? html`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner{animation: spin .75s step-end infinite;stroke:currentColor;stroke-width:2;stroke-linecap:round;transform-origin:center}@keyframes spin{8.3%{transform:rotate(30deg)}16.6%{transform:rotate(60deg)}25%{transform:rotate(90deg)}33.3%{transform:rotate(120deg)}41.6%{transform:rotate(150deg)}50%{transform:rotate(180deg)}58.3%{transform:rotate(210deg)}66.6%{transform:rotate(240deg)}75%{transform:rotate(270deg)}83.3%{transform:rotate(300deg)}91.6%{transform:rotate(330deg)}100%{transform:rotate(360deg)}}</style><g class="spinner"><path d="M12,1 v5" opacity=".14"/><path d="M12,1 v5" transform="rotate(30 12 12)" opacity=".29"/><path d="M12,1 v5" transform="rotate(60 12 12)" opacity=".43"/><path d="M12,1 v5" transform="rotate(90 12 12)" opacity=".57"/><path d="M12,1 v5" transform="rotate(120 12 12)" opacity=".71"/><path d="M12,1 v5" transform="rotate(150 12 12)" opacity=".86"/><path d="M12,1 v5" transform="rotate(180 12 12)"/></g></svg>` : nothing}
      <img
        alt=""
        aria-hidden="${this.loading}"
        src="./images/${this.src}@medium.webp"
        srcset="
          ./images/${this.src}@small.webp 400w,
          ./images/${this.src}@medium.webp 600w,
          ./images/${this.src}@large.webp 800w"
          ./images/${this.src}@xlarge.webp 1000w"
        sizes="(min-width: 32rem) 512px, 100vw">
    `;
  }
}
