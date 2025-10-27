import {LitElement, css, html, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


/**
 * Web component that truncates text content and adds a button for showing
 * the rest of it. The original text doesn't display since there's no <slot>
 * for it in the shadow DOM.
 */
@customElement('gc-truncate')
class GoodAndCheapTruncate extends LitElement {
  @property({attribute: 'content-id'}) contentId: string;
  @property({attribute: 'words', reflect: true}) wordCount: number = 30;
    
  @state() enabled: boolean = true;
  @state() original: string;
  @state() paragraphs: string[];
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

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('contentId')) {
      this.enabled = true;
      this.original = '';
      this.paragraphs = [];
      this.truncated = '';
      this.setup();
    }
  }

  /**
   * Saves the original paragraphs for rendering and creates a truncated
   * version from the first paragraph.
   */
  private async setup() {
    await this.updateComplete;

    // Get original paragraphs in the light DOM for extracting a truncated
    // version.
    const paragraphElements = this.querySelectorAll('p')
    for (const p of paragraphElements) {
      this.paragraphs.push(p.textContent);
    }

    // Reassemble the original paragraphs for replacing the truncated version.
    for (const p of paragraphElements) {
      this.original += `<p>${p.textContent}</p>`;
    }

    // Create the truncated version, but only if there are enough words to
    // show when expanded. I.e., it's silly to hide only 2-3 more words, so
    // set a threshold for truncating the original in addition to the target
    // word count.
    const threshold = this.wordCount / 2;
    const words = this.paragraphs[0].split(/\s+/);

    if (words.length >= (this.wordCount + threshold)) {
      for (let i = 0; i < this.wordCount; i++) {
        this.truncated += `${words[i]}`;
        if (i < this.wordCount - 1) {
          this.truncated += ' ';
        }
      }
    } else {
      this.enabled = false;
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

  // Shadow DOM stylesheet.
  static styles = css`
    p {
      line-height: var(--base-line-height);
    }

    button {
      appearance: none;
      background: none;
      border: none;
      color: var(--brand-color);
      cursor: pointer;
      font: inherit;
      margin: 0;  
      outline: none;
      padding: 0;
    }
  `;
}
