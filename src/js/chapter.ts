import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Chapter} from './_types';


@customElement('gc-chapter')
class GoodAndCheapChapter extends LitElement {
  private dataListener: EventListenerObject;

  @state() data: Chapter;

  constructor() {
    super();
    this.dataListener = this.updateData.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('data', this.dataListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('data', this.dataListener);
  }

  protected createRenderRoot() {
    return this;
  }

  private updateData(event: CustomEvent) {
    this.data = event.detail;
  }

  protected render() {
    if (!this.data) return;

    const {content, count, image, recipes, title} = this.data;

    return html`
      <img src="./images/${image}@large.webp" alt="">
      
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
              <img src="./images/${image}@thumb.webp" alt="">
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
