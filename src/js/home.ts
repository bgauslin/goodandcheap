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
  @state() tab: string = 'recipes';

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
      <div role="tablist">
        ${this.renderTabControl('Recipes', 'recipes')}
        ${this.renderTabControl('More Info', 'info')}
      </div>

      ${this.renderList('chapter', chapters, 'recipes', true)}
      ${this.renderList('page', pages, 'info')}
    `;
  }

  private renderTabControl(label: string, id: string) {
    return html`
      <button
        aria-controls="tabpanel-${id}"
        aria-selected="${this.tab === id}"
        id="tab-${id}"
        role="tab"
        tabindex="${this.tab === id ? 0 : -1}"
        @click="${() => this.tab = id}">${label}</button>
      `;
  }

  private renderList(type: string, items: Item[], id: string, count:boolean = false) {
    return html`
      <ul
        aria-hidden="${this.tab !== id}"
        aria-labelledby="tab-${id}"
        class="previews"
        id="tabpanel-${id}"
        role="tabpanel"
        tabindex="0">
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
