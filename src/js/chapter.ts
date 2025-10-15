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
      const {badge, chapter, image, serving, slug, title} = recipe;
      let callout = `<p class="serving">${serving}</p>`;
      if (badge) callout = `<p class="badge">${badge}</p>`;

      items += `
        <li>
          <a href="./${chapter}/${slug}">
            <figure>
              <img src="./images/${image}@thumb.webp" alt="">
            </figure>
            <div class="copy">
              <div class="description">
                <p class="title">${title}</p>
                ${callout}
              </div>
              <div class="counter">${index + 1}</div>
            </div>
          </a>
        </li>
      `;
    }

    this.innerHTML = `
      <div class="cover">
        <gc-image class="cover__photo" src="${image}"></gc-image>
      </div>
      
      <div class="content">
        <h1>${title}</h1>
        ${content}
        <p class="count">${recipes.length} Recipes</p>
        <ul class="previews">
          ${items}
        </ul>
        ${footer}
      </div>
    `;
  }
});
