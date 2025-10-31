import {LitElement, css, html, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


/**
 * Web component that truncates text content and adds a button for showing
 * the rest of it. Note: The original light DOM text doesn't display since
 * there are no shadow DOM <slot> elements.
 */
@customElement('gc-truncate')
class GoodAndCheapTruncate extends LitElement {
  @property({attribute: 'words', reflect: true, type: Number}) limit: number;
  @property({attribute: 'source', reflect: true}) source: string;

  @state() enableTruncation: boolean = true;
  @state() originalContent: string = '';
  @state() paragraphs: string[] = [];
  @state() truncated: boolean = true;
  @state() truncatedContent: string = '';

  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() { 
    super.disconnectedCallback();
  }

  /**
   * Resets everything when new content is rendered.
   */
  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('source') || changedProperties.has('limit')) {
      this.enableTruncation = true;
      this.originalContent = '';
      this.paragraphs = [];
      this.truncated = true;
      this.truncatedContent = '';
      this.setup();
    }
  }

  /**
   * Saves the original paragraphs for rendering and creates a truncated
   * version from the first original paragraph.
   */
  private async setup() {
    await this.updateComplete;

    // Get original paragraphs in the light DOM for extracting the truncated
    // version.
    const paragraphElements = this.querySelectorAll('p');
    for (const paragraph of paragraphElements) {
      this.paragraphs.push(paragraph.textContent);
    }

    // Reassemble the original paragraphs for replacing the truncated version
    // when truncation is toggled by the button.
    for (const paragraph of paragraphElements) {
      this.originalContent += `<p>${paragraph.textContent}</p>`;
    }

    // Create the truncated version, but only if there are enough words
    // to show when expanded. Because it's odd to hide only 2-3 more words,
    // set a threshold in addition to the word limit.
    const threshold = 10;

    // Get a total word count of all paragraphs.
    let total = 0;
    for (const paragraph of this.paragraphs) {
      const words = paragraph.split(/\s+/);
      total += words.length;
    }

    // Get the first paragraph's content, and if there are fewer words in the
    // first paragraph than the word limit, stop truncating.
    if (total > (this.limit + threshold)) {
      const words = this.paragraphs[0].split(/\s+/);
      for (let i = 0; i < this.limit; i++) {
        const word = words[i];
        if (word) {
          this.truncatedContent += word;
          if (i < (this.limit - 1)) {
            this.truncatedContent += ' ';
          }
        } else {
          break;
        }
      }
    } else {
      this.enableTruncation = false;
    }
  }

  protected render() {
    return html`
      ${this.enableTruncation ? html`
        ${this.truncated ? html`
          <p>
            ${this.truncatedContent}
            ${this.renderButton()}
          </p>` : html`
          ${unsafeHTML(this.originalContent)}
          <div class="less">${this.renderButton()}</div>
        `}` : html`
        ${unsafeHTML(this.originalContent)}
      `}
    `;
  }

  private renderButton() {
    return html`
      <button
        title="${this.truncated ? 'Show more text' : 'Show less text'}"
        type="button"
        @click="${() => this.truncated = !this.truncated}">
        ${this.truncated ? '(more…)' : '(show less)'}
      </button>
    `;
  }

  // Shadow DOM stylesheet.
  static styles = css`
    p {
      line-height: 1.5;
    }

    .less {
      margin-block-start: -.5rem;
      text-align: end;
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
    
      &.touch,
      &:focus-visible {
        color: var(--text-color);
      }
    
      @media (any-hover: hover) {
        & {
          transition: color var(--transition);
        }
        
        &:hover {
          color: var(--text-color);
        }
      }
    }
  `;
}
