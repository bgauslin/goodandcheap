import {LitElement, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {footer} from './shared';

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

      <div class="content">
        ${this.renderList('chapter', chapters, 'recipes', true)}
        ${this.renderList('page', pages, 'info')}
        ${unsafeHTML(footer)}
      </div>
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
      <div
        aria-hidden="${this.tab !== id}"
        aria-labelledby="tab-${id}"
        id="tabpanel-${id}"
        role="tabpanel"
        tabindex="0">
        <ul class="previews">
        ${items.map(item => {
          const {count, image, slug, title} = item;
          return html`
            <li>
              <a href="${slug}" data-type="${type}">
                <figure>
                  <img src="./images/${image}@thumb.webp" alt="">
                </figure>
                <div class="copy">
                  <div class="description">
                    <p class="title">${unsafeHTML(title)}</p>
                    ${count ? html`<p class="count">${count} Recipes</p>` : nothing }
                  </div>
                </div>
              </a>
            </li>
          `;
        })}
        </ul>
      </div>
    `;
  }
}
