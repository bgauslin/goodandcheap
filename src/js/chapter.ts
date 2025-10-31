import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {favoriteIcon, footer, Events, Chapter} from './shared';


/**
 * Custom element for rendering a Chapter for the Good And Cheap app.
 */
@customElement('gc-chapter')
class GoodAndCheapChapter extends LitElement {
  private dataListener: EventListenerObject;

  @state() data: Chapter;
  @state() favorites: Set<string>;

  constructor() {
    super();
    this.dataListener = this.updateData.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(Events.Data, this.dataListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(Events.Data, this.dataListener);
  }

  protected createRenderRoot() {
    return this;
  }

  /**
   * Receives data for rendering and creates a copy of the favorites for
   * adding/removing when a 'favorite' button is clicked.
   */
  private updateData(event: CustomEvent) {
    this.data = event.detail;
    this.favorites = new Set();

    // Populate local copy for toggling 'favorite' state of each recipe preview.
    const {recipes} = this.data;
    for (const recipe of recipes) {
      const {favorite, id} = recipe;
      if (favorite) {
        this.favorites.add(id);
      }
    }
  }

  /**
   * Sends recipe ID and chapter up to the app for updating the list of
   * favorited recipes.
   */
  private updateFavorite(id: string) {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }

    // Re-render the template.
    this.requestUpdate();

    // Dispatch to the app for processing.
    this.dispatchEvent(new CustomEvent(Events.Favorites, {
      bubbles: true,
      composed: true,
      detail: {
        chapter: this.data.id,
        id,
      }
    }));
  }

  protected render() {
    if (!this.data) return;

    const {content, image, recipes, title} = this.data;
    
    let counter = 0;
    const previews = [];
    for (const recipe of recipes) {
      const {badge, chapter, id, image, serving, title} = recipe;
      const favorite = this.favorites.has(id);
      let callout = html`<p class="serving">${serving}</p>`;
      if (badge) callout = html`<p class="badge">${badge}</p>`;
      const linkTitle = `View recipe for ${title}`;
      const buttonTitle = favorite ? `Remove ${title} from Favorites` : `Add ${title} to Favorites`;
      counter += 1;
      previews.push(html`
        <li class="previews__item">
          <a
            class="previews__thumb"
            href="./${chapter}/${id}" title="${linkTitle}"
            tabindex="-1">
            <img class="previews__img" src="./images/${image}@thumb.webp" alt="">
          </a>
          <a
            class="previews__link"
            href="./${chapter}/${id}"
            title="${linkTitle}">
            <div class="previews__description">
              <p class="previews__title">${title}</p>
              ${callout}
            </div>
          </a>
          <label
            class="favorite favorite--preview"
            title="${buttonTitle}">
            <input
              aria-label="${buttonTitle}"
              type="checkbox"
              ?checked="${favorite}"
              @click="${() => this.updateFavorite(id)}">
            ${unsafeHTML(favoriteIcon)}
          </label>
          <span class="previews__counter">${counter}</span>
        </li>
      `);
    }

    return html`
      <div class="cover">
        <gc-cover class="cover__photo" src="${image}"></gc-cover>
      </div>
      
      <div class="content">
        <div class="copy">
          <h1>${unsafeHTML(title)}</h1>
          <gc-truncate source="${this.data.id}" words="24">
            ${unsafeHTML(content)}
          </gc-truncate>
        </div>

        <p class="count">${recipes.length} Recipes</p>
        <ul class="previews">
          ${previews}
        </ul>
      </div>

      ${unsafeHTML(footer)}
    `;
  }
}
