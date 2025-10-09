import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';


interface home {
  chapters: item[],
  pages: item[],
}

interface item {
  image: string,
  slug: string,
  title: string,
}

@customElement('gc-home')
class Home extends LitElement {
  @state() data: home;

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

  private async fetchData(): Promise<any> {
    try {
      const response = await fetch('/api/home.json');
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
      ${this.renderList('Chapters', chapters, 'chapter')}  
      ${this.renderList('Pages', pages, 'page')}      
    `;
  }

  private renderList(heading: string, items: item[], type: string) {
    return html`
      <h2>${heading}</h2>
      <ul>
      ${items.map(item => {
        const {image, slug, title} = item;
        return html`
          <li>
            <a href="${slug}" data-type="${type}">
              <img src="/images/${image}@thumb.webp" alt="">
              ${title}
            </a>
          </li>
        `;
      })}
      </ul>
    `;
  }
}
