import {LitElement, html, nothing, PropertyValues} from 'lit';
import {customElement, property, queryAll, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


/**
 * Web component that truncates text content via CSS and adds a button for
 * showing the rest of the content.
 */
@customElement('gc-truncate')
class GoodAndCheapTruncate extends LitElement {

  @property({attribute: 'content-id'}) contentId: string;
  @property({reflect: true}) words: number = 30;
  
  @queryAll('p') paragraphElements: HTMLParagraphElement[];  
  
  @state() enabled: boolean = true;
  @state() showButton: boolean = false;
  
  @state() paragraphs: string[];
  @state() original: string;
  @state() truncated: string;

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
    if (changedProperties.has('contentId')) {
      this.enabled = true;
      this.original = '';
      this.paragraphs = [];
      this.truncated = '';
      this.setup();
    }
  }

  private setup() {
    // Save original paragraph text for extracting the truncated version.
    for (const p of this.paragraphElements) {
      this.paragraphs.push(p.textContent);
    }

    // Reassemble the original paragraphs for replacing the truncated version.
    for (const p of this.paragraphElements) {
      this.original += `<p>${p.textContent}</p>`;
    }

    // Clear everything out.
    // this.innerHTML = '';
    
    // Assemble the truncated version.
    const words = this.paragraphs[0].split(/\s+/);
    for (let i = 0; i < this.words; i++) {
      this.truncated += `${words[i]}`;
      if (i < this.words - 1) {
        this.truncated += ' ';
      }
    }
  }

  protected render() {
    return html`
      ${this.enabled ? html`
      <p>
        ${this.truncated}
        <button
          class="more-less"
          type="button"
          @click="${() => this.enabled = !this.enabled}">more…</button>
      </p>` : html`${unsafeHTML(this.original)}`}
    `;
  }
}
