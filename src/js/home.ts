import {LitElement, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


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
      ${this.renderList('Recipes', 'chapter', chapters, true)}
      ${this.renderList('More Info', 'page', pages)}
    `;
  }

  private renderList(heading: string, type: string, items: Item[], count:boolean = false) {
    return html`
      <h2>${heading}</h2>
      <ul class="previews">
      ${items.map(item => {
        const {image, slug, title} = item;
        return html`
          <li>
            <a href="${slug}" data-type="${type}">
              <img src="./images/${image}@thumb.webp" alt="">
              <div class="blurb">
                <h3>${unsafeHTML(title)}</h3>
                ${count ? html`<p class="count">${items.length} Recipes</p>` : nothing }
              </div>
            </a>
          </li>
        `;
      })}
      </ul>
    `;
  }
}
