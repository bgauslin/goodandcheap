import {LitElement, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {checkboxIcon, favoriteIcon, footer, Events, Recipe} from './shared';


/**
 * Custom element for rendering a recipe for the Good And Cheap app.
 * This element receives data from a custom event and renders it, and sends
 * saved ingredients and favorite state up to the app for processing.
 */
@customElement('gc-recipe')
class GoodAndCheapRecipe extends LitElement {
  private dataListener: EventListenerObject;
  private keyListener: EventListenerObject;
  
  @state() data: Recipe;
  @state() favorite: boolean = false;
  @state() ingredients: string[] = [];

  constructor() {
    super();
    this.dataListener = this.updateData.bind(this);
    this.keyListener = this.handleKey.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(Events.Data, this.dataListener);
    window.addEventListener(Events.Keyup, this.keyListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(Events.Data, this.dataListener);
    window.removeEventListener(Events.Keyup, this.keyListener);
  }

  protected createRenderRoot() {
    return this;
  }

  private async updateData(event: CustomEvent) {
    this.data = event.detail;
    await this.updateComplete;
    this.ingredients = this.data.savedIngredients || [];
    this.favorite = this.data.favorite;
  }

  /**
   * Updates the list of checked ingredients and dispatches them to the app
   * to store and render on subsequent visits.
   */
  private saveIngredients(id: string) {
    const index = this.ingredients.indexOf(id);

    // Add/remove ingredient and sort the list for readability.
    if (index < 0) {
      this.ingredients.push(id);
    } else {
      this.ingredients.splice(index, 1);
    }
    this.ingredients.sort();

    // Re-render the template.
    this.requestUpdate();

    // Send saved ingredients up to the app.
    this.dispatchEvent(new CustomEvent(Events.Ingredients, {
      bubbles: true,
      composed: true,
      detail: {
        id: this.data.id,
        saved: this.ingredients,
      },
    }));
  }

  /**
   * Sends recipe ID and chapter up to the app for updating the list of
   * favorited recipes.
   */
  private handleFavorite(id: string, chapter: string) {
    this.favorite = !this.favorite;

    this.dispatchEvent(new CustomEvent(Events.Favorites, {
      bubbles: true,
      composed: true,
      detail: {
        chapter,
        id,
      }
    }));
  }
  
  /**
   * Adds keyboard a11y to ingredients items.
   */
  private handleKey(event: KeyboardEvent) {
    const {code} = event;
    if (code === 'Enter') {
      const element = <HTMLElement>document.activeElement;
      if (element.className === 'ingredients__item') {
        element.click();
      }
    }
  }

  protected render() {
    if (!this.data) return;

    const {
      badge,
      chapter,
      cost,
      id,
      image,
      ingredients,
      more,
      overview,
      serving,
      steps,
      title
    } = this.data;

    return html`
      <div class="cover">
        <gc-cover class="cover__photo" src="${image}"></gc-cover>
        ${cost ? html`
        <p class="cost">
          ${cost.total} Total<br>
          ${cost.each} / ${cost.units}
        </p>` : nothing}
      </div>

      <div class="content">
        <div class="copy">
          ${badge ? html`<div class="badge">${badge}</div>` : nothing}
          <h1>${unsafeHTML(title)}</h1>
          ${serving ? html`<div class="serving">${serving}</div>` : nothing}
          ${overview ? html`
            <gc-truncate content-id="${id}">
              ${unsafeHTML(overview)}
            </gc-truncate>
          ` : nothing}
          <button
            class="favorite favorite--recipe"
            data-checked="${this.favorite}"
            title="${this.favorite ? 'Remove from' : 'Add to'} Favorites"
            type="button"
            @click="${() => this.handleFavorite(id, chapter)}">
            ${unsafeHTML(favoriteIcon)}
          </button>
        </div>

        ${ingredients ? html`
        <section class="ingredients">
          <h2>Ingredients</h2>
          ${ingredients.map((group, i) => {
            const {label, items} = group;
            return html`
              ${label ? html`<h3>${label}</h3>` : nothing}
              <ul class="ingredients__list ingredients__list--main">
                ${items.map((item, j) => {
                  const id = `${i}.${j}`;
                  const checked = this.ingredients.includes(id);
                  return html`
                  <li
                    class="ingredients__item"
                    ?data-checked="${checked}"
                    tabindex="0"
                    @click="${() => this.saveIngredients(id)}">
                    <span class="checkbox">${checked ? html`${unsafeHTML(checkboxIcon)}` : nothing}</span>
                    <span class="text">${unsafeHTML(item)}</span>
                  </li>`
                })}
              </ul>
            `;
          })}
        </section>` : nothing}

        ${steps ? html`
        <section class="steps">
          <h2>Steps</h2>
          <ol class="steps__list">
            ${steps.map(step => html`<li class="steps__item">${unsafeHTML(step)}</li>`)}
          </ol>
        </section>` : nothing}

        ${more ? html`
        <section>
          ${more.map((item, k) => {
            const {copy, cost, heading, image, ingredients, steps} = item;
            return html`
            <div class="more">
              ${image ? html`
              <div class="photo">
                <img
                  alt=""
                  src="./images/${image}@medium.webp"
                  srcset="
                    ./images/${image}@small.webp 400w,
                    ./images/${image}@medium.webp 600w,
                    ./images/${image}@large.webp 800w"
                    ./images/${image}@xlarge.webp 1000w"
                  sizes="(min-width: 32rem) 512px, 100vw">
                ${cost ? html`
                <p class="cost">
                  ${cost.total} Total<br>
                  ${cost.each} / ${cost.units}
                </p>` : nothing}
              </div>` : nothing}

              <h2>${heading}</h2>

              ${copy ? html`<p>${unsafeHTML(copy)}</p>` : nothing}

              ${ingredients ? html`
                ${ingredients.map((group, m) => {
                  const {label, items} = group;
                  return html`
                    ${label ? html`<h3>${label}</h3>` : nothing}
                    <ul class="ingredients__list">
                    ${items.map((item, n) => {
                      const id = `${k}.${m}.${n}`;
                      const checked = this.ingredients.includes(id);
                      return html`
                        <li
                          class="ingredients__item"
                          ?data-checked="${checked}"
                          tabindex="0"
                          @click="${() => this.saveIngredients(id)}">
                          <span class="checkbox">${checked ? html`${unsafeHTML(checkboxIcon)}` : nothing}</span>
                          <span class="text">${unsafeHTML(item)}</span>
                      </li>`})}
                    </ul>
                  `;
                })}
              ` : nothing}

              ${steps ? html`
                <ol class="steps__list">
                  ${steps.map(step => html`<li class="steps__item">${unsafeHTML(step)}</li>`)}
                </ol>` : nothing}
            </div>`;
          })}
        </section>` : nothing}
      </div>

      ${unsafeHTML(footer)}
    `;
  }
}
