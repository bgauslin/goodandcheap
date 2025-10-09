import {LitElement, html, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

interface chapter {
  title: string,
  content: string,
  image: string,
  recipes: {
    title: string,
    chapter: string,
    slug: string,
    image: string,
  }[],
}

/**
 * Web component for a chapter of recipes.
 */
@customElement('gc-chapter')
class Chapter extends LitElement {
  @property() chapter: string;
  @state() endpoint: string;
  @state() data: chapter;

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
    if (changedProperties.has('chapter')) {
      this.fetchChapter();
    }
  }

  private async fetchChapter(): Promise<any> {
    this.endpoint = `/api/${this.chapter}.json`;

    try {
      const response = await fetch(this.endpoint);
      this.data = await response.json();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  protected render() {
    if (!this.data) return;

    const {title, content, image, recipes} = this.data;

    return html`
      <h1>${title}</h1>
      ${unsafeHTML(content)}
      <img src="${image}" alt="">
      <ul>
      ${recipes.map(recipe => {
        const {title, slug} = recipe;
        return html`
          <li>
            <a href="${slug}" data-type="recipe">${title}</a>
          </li>
        `;
      })}
      </ul>
    `;
  }
}
