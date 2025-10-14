import {Chapter, footer} from './shared';


customElements.define('gc-chapter', class GoodAndCheapChapter extends HTMLElement {
  private data: Chapter;
  private dataListener: EventListenerObject;

  constructor() {
    super();
    this.dataListener = this.updateData.bind(this);
  }

  connectedCallback() {
    this.addEventListener('data', this.dataListener);
  }

  disconnectedCallback() {
    this.removeEventListener('data', this.dataListener);
  }

  private updateData(event: CustomEvent) {
    this.data = event.detail;
    this.render();
  }

  private render() {
    const {content, image, recipes, title} = this.data;

    let items = '';
    for (const [index, recipe] of recipes.entries()) {
      const {badge, image, slug, title} = recipe;
      items += `
        <li>
          <a href="${slug}" data-type="recipe">
            <img src="./images/${image}@thumb.webp" alt="">
            <div class="blurb">
              <p class="title">${title}</p>
              <p class="badge">${badge}</p>
            </div>
            <div class="counter">${index + 1}</div>
          </a>
        </li>
      `;
    }

    this.innerHTML = `
      <gc-image class="cover-photo" src="${image}"></gc-image>
      
      <section class="overview">
        <h1>${title}</h1>
        ${content}
        <p class="count">${recipes.length} Recipes</p>
      </section>

      <ul class="previews">
        ${items}
      </ul>

      ${footer}
    `;
  }
});
