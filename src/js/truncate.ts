import {LitElement, html, nothing, PropertyValues} from 'lit';
import {customElement, property, queryAll, state} from 'lit/decorators.js';


/**
 * Web component that truncates text content via CSS and adds a button for
 * showing the rest of the content.
 */
@customElement('gc-truncate')
class GoodAndCheapTruncate extends LitElement {
  @property({reflect: true}) clamp: boolean = true;
  @property() content: string;
  @queryAll('p, ol, ul') elements: HTMLElement[];
  @state() showButton: boolean = false;

  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() { 
    super.disconnectedCallback();
  }

  protected createRenderRoot() {
    return this;
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('content')) {
      this.clamp = true;
      this.setup();
    }
  }

  private async setup() {
    await this.updateComplete;

    let scrollHeight = 0;
    let clientHeight = 0;
    for (const element of this.elements) {
      scrollHeight += element.scrollHeight;
      clientHeight += element.clientHeight;
    }

    this.showButton = scrollHeight > clientHeight;
  }

  protected render() {
    return html`
      ${this.showButton && this.clamp ? html`
      <div class="truncate">
        <button
          class="more-less"
          type="button"
          @click="${() => this.clamp = !this.clamp}">more…</button>
      </div>` : nothing}
    `;
  }
}
