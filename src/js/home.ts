import {LitElement, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';


interface Home {
  chapters: Item[],
  pages: Item[],
}

interface Item {
  count: string,
  image: string,
  slug: string,
  title: string,
}

@customElement('gc-home')
class GoodAndCheapHome extends LitElement {
  @state() data: Home;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected createRenderRoot() {
    return this;
  }

  /**
   * This component fetches its own data to quickly render it while the
   * app is busy fetching data for everything else.
   */
  private async fetchData(): Promise<Home> {
    try {
      const response = await fetch('./api/home.json');
      this.data = await response.json();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  protected render() {
    if (!this.data) return;

    const {chapters, pages} = this.data;

    return html`
      ${this.renderList('Recipes', chapters, 'chapter')}
      ${this.renderList('More Info', pages, 'page')}
    `;
  }

  private renderList(heading: string, items: Item[], type: string) {
    return html`
      <h2>${heading}</h2>
      <ul class="previews">
      ${items.map(item => {
        const {count, image, slug, title} = item;
        return html`
          <li>
            <a href="${slug}" data-type="${type}">
              <img src="./images/${image}@thumb.webp" alt="">
              <div class="blurb">
                <h3>${title}</h3>
                ${count ? html`<p class="count">${count} Recipes</p>` : nothing }
              </div>
            </a>
          </li>
        `;
      })}
      </ul>
    `;
  }
}
