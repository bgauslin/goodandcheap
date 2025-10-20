import {LitElement, html, nothing} from 'lit';
import {customElement, queryAll, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Events, Recipe, favoriteIcon, footer} from './shared';


/**
 * Custom element for rendering a Recipe for the Good And Cheap app.
 * This element receives data from a custom event and renders it, then sets
 * up an Intersection Observer for styling sticky headings when stuck.
 */
@customElement('gc-recipe')
class GoodAndCheapRecipe extends LitElement {
  private dataListener: EventListenerObject;

  @queryAll(':is([id="ingredients"], [id="steps"]) h2') headings: HTMLHeadingElement[];
  
  @state() data: Recipe;
  @state() favorite: boolean = false;
  @state() ingredients: string[] = [];
  @state() observer: IntersectionObserver;

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
    this.observer.disconnect();
  }

  protected createRenderRoot() {
    return this;
  }

  private async updateData(event: CustomEvent) {
    this.data = event.detail;
    await this.updateComplete;
    this.ingredients = this.data.savedIngredients || [];
    this.favorite = this.data.favorite;
    this.watch();
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
        slug: this.data.slug,
        saved: this.ingredients,
      },
    }));
  }

  /**
   * Sets up an IntersectionObserver for sticky elements.
   */
  private watch() {
    this.observer = new IntersectionObserver(this.sticky, {
      root: this,
      rootMargin: '-1px',
      threshold: 1,
    });

    for (const heading of this.headings) {
      this.observer.observe(heading);
    }
  }

  /**
   * IntersectionObserver callback that updates sticky elements.
   */
  private sticky(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      const {target} = entry;

      if (entry.isIntersecting) {
        target.classList.remove('stuck');
      } else {
        target.classList.add('stuck');
      }
    }
  }

  /**
   * TODO: Description.
   */
  private handleFavorite(id: string) {
    this.favorite = !this.favorite;

    this.dispatchEvent(new CustomEvent(Events.Favorites, {
      bubbles: true,
      composed: true,
      detail: {
        id,
        checked: this.favorite,
      }
    }));
  }

  protected render() {
    if (!this.data) return;

    const {
      badge,
      cost,
      favorite,
      image,
      ingredients,
      more,
      overview,
      serving,
      slug,
      steps,
      title
    } = this.data;

    return html`
      <div class="cover">
        <gc-image class="cover__photo" src="${image}"></gc-image>
        ${cost ? html`
        <p class="cost">
          ${cost.total} Total<br>
          ${cost.each} / ${cost.units}
        </p>` : nothing}
      </div>

      <div class="content">     
        ${badge ? html`<div class="badge">${badge}</div>` : nothing}
        <h1>${unsafeHTML(title)}</h1>
        ${serving ? html`<div class="serving">${serving}</div>` : nothing}
      
        <button
          class="favorite"
          data-checked="${this.favorite}"
          title="${this.favorite ? 'Remove from' : 'Add to'} Favorites"
          type="button"
          @click="${() => this.handleFavorite(slug)}">
          ${unsafeHTML(favoriteIcon)}
        </button>

        ${overview ? html`
        <section class="overview" id="overview">
          ${unsafeHTML(overview)}
        </section>` : nothing}

        ${ingredients ? html`
        <section id="ingredients">
          <h2>Ingredients</h2>
          ${ingredients.map((group, i) => {
            const {label, items} = group;
            return html`
              ${label ? html`<h3>${label}</h3>` : nothing}
              <ul class="ingredients">
                ${items.map((item, j) => {
                  const id = `${i}.${j}`;
                  const checked = this.ingredients.includes(id);
                  const path = checked ? 'M4,11 L10,17, L20,7' : '';
                  return html`
                  <li ?data-checked="${checked}" @click="${() => this.saveIngredients(id)}">
                    <svg aria-hidden="true" viewbox="0 0 24 24"><path d="${path}"/></svg>
                    <span>${unsafeHTML(item)}</span>
                  </li>`
                })}
              </ul>
            `;
          })}
        </section>` : nothing}

        ${steps ? html`
        <section id="steps">
          <h2>Steps</h2>
          <ol class="steps">
            ${steps.map(step => html`<li>${unsafeHTML(step)}</li>`)}
          </ol>
        </section>` : nothing}

        ${more ? html`
        <section id="more">
          ${more.map(item => {
            const {copy, cost, heading, image, ingredients, steps} = item;
            return html`
            <div class="more">
              ${image ? html`
              <div class="photo">
                <img
                  alt=""
                  src="./images/${image}@medium.webp"
                  srcset="
                    ./images/${image}@small.webp 480w,
                    ./images/${image}@medium.webp 640w,
                    ./images/${image}@large.webp 720w"
                  sizes="(min-width: 60rem) 720px, 100vw">
                ${cost ? html`
                <p class="cost">
                  ${cost.total} Total<br>
                  ${cost.each} / ${cost.units}
                </p>` : nothing}
              </div>` : nothing}

              <h2>${heading}</h2>

              ${copy ? html`<p>${unsafeHTML(copy)}</p>` : nothing}

              ${ingredients ? html`
                ${ingredients.map(group => {
                  const {label, items} = group;
                  return html`
                    ${label ? html`<h3>${label}</h3>` : nothing}
                    <ul class="ingredients">
                      ${items.map(item => html`<li>${unsafeHTML(item)}</li>`)}
                    </ul>
                  `;
                })}
              ` : nothing}

              ${steps ? html`
                <ol class="steps">
                  ${steps.map(step => html`<li>${unsafeHTML(step)}</li>`)}
                </ol>` : nothing}
            </div>`;
          })}
        </section>` : nothing}
      </div>

      ${unsafeHTML(footer)}
    `;
  }
}
