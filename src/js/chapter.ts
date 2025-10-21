import {Events, Chapter, favoriteIcon, footer} from './shared';


/**
 * Custom element for rendering a Chapter for the Good And Cheap app.
 * This element simply receives data from a custom event and renders it.
 */
customElements.define('gc-chapter', class GoodAndCheapChapter extends HTMLElement {
  private clickListener: EventListenerObject;
  private data: Chapter;
  private dataListener: EventListenerObject;

  constructor() {
    super();
    this.clickListener = this.handleClick.bind(this);
    this.dataListener = this.updateData.bind(this);
  }

  connectedCallback() {
    this.addEventListener(Events.Click, this.clickListener);
    this.addEventListener(Events.Data, this.dataListener);
  }

  disconnectedCallback() {
    this.removeEventListener(Events.Click, this.clickListener);
    this.removeEventListener(Events.Data, this.dataListener);
  }

  private updateData(event: CustomEvent) {
    this.data = event.detail;
    this.render();
  }

  /**
   * Sends recipe ID and chapter up to the app for updating the list of
   * favorited recipes.
   */
  private handleClick(event: Event) {
    const {target} = event;
    const id = (<HTMLElement>target).dataset.id;
    if (!id) return;

    const dataChecked = (<HTMLElement>target).dataset.checked;
    const checked = dataChecked === 'true' ? false : true;

    (<HTMLElement>target).dataset.checked = `${checked}`;
    (<HTMLElement>target).title = checked ?
        'Remove from Favorites' : 'Add to Favorites';

    this.dispatchEvent(new CustomEvent(Events.Favorites, {
      bubbles: true,
      composed: true,
      detail: {
        chapter: this.data.id,
        checked,
        id,
      }
    }));
  }

  private render() {
    const {content, image, recipes, title} = this.data;

    let items = '';
    for (const [index, recipe] of recipes.entries()) {
      const {badge, chapter, favorite, id, image, serving, title} = recipe;
      let callout = `<p class="serving">${serving}</p>`;
      if (badge) callout = `<p class="badge">${badge}</p>`;

      items += `
        <li>
          <a href="./${chapter}/${id}">
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

          <button
            class="favorite"
            data-id="${id}"
            data-checked="${favorite}"
            title="${favorite ? 'Remove from' : 'Add to'} Favorites"
            type="button">
            ${favoriteIcon}
          </button>
        </li>
      `;
    }

    this.innerHTML = `
      <div class="cover">
        <gc-cover class="cover__photo" src="${image}"></gc-cover>
      </div>
      
      <div class="content">
        <h1>${title}</h1>
        ${content}
        <p class="count">${recipes.length} Recipes</p>
        <ul class="previews">
          ${items}
        </ul>
      </div>

      ${footer}
    `;
  }
});
