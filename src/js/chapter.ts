import {LitElement, html, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


interface chapter {
  content: string,
  count: string,
  image: string,
  recipes: {
    badge: string,
    chapter: string,
    image: string,
    slug: string,
    title: string,
  }[],
  title: string,
}

@customElement('gc-chapter')
class Chapter extends LitElement {
  @property() chapter: string;
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
      this.fetchData();
    }
  }

  private async fetchData(): Promise<any> {
    if (!this.chapter) return;

    try {
      const response = await fetch(`/api/${this.chapter}.json`);
      this.data = await response.json();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  protected render() {
    if (!this.data) return;

    const {content, count, image, recipes, title} = this.data;

    return html`
      <img src="/images/${image}@large.webp" alt="">
      
      <section class="overview">
        <h1>${title}</h1>
        ${unsafeHTML(content)}
        <p class="count">${count} Recipes</p>
      </section>

      <ul class="previews">
      ${recipes.map((recipe, index) => {
        const {badge, chapter, image, slug, title} = recipe;
        return html`
          <li>
            <a href="${slug}"
              data-context="${chapter}"  
              data-type="recipe">
              <img src="/images/${image}@thumb.webp" alt="">
              <div class="blurb">
                <h3>${title}</h3>
                <p class="badge">${badge}</p>
              </div>
              <div class="counter">${index + 1}</div>
            </a>
          </li>
        `;
      })}
      </ul>
    `;
  }
}
