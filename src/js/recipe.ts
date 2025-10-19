import {LitElement, html, nothing} from 'lit';
import {customElement, queryAll, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Recipe, footer} from './shared';


interface Ingredients {
  slug: string,
  items: string[],
};

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
  @state() storage: Ingredients[];
  @state() ingredients: Ingredients;
  @state() observer: IntersectionObserver;

  constructor() {
    super();
    this.dataListener = this.updateData.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('data', this.dataListener);
    this.getStoredIngredients();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('data', this.dataListener);
    this.observer.disconnect();
  }

  protected createRenderRoot() {
    return this;
  }

  private async updateData(event: CustomEvent) {
    this.data = event.detail;
    await this.updateComplete;
    this.watch();
    this.getIngredients();
  }

  /**
   * TODO: Ensure that this ic only called one time when first connected.
   */
  private getStoredIngredients() {
    this.storage = JSON.parse(localStorage.getItem('ingredients'));
    
    console.log('this.storage', this.storage);

    if (this.storage) {
      const recipe = this.storage.find(item => item.slug === this.data.slug);
      this.ingredients.items = recipe.items;
    }

    console.log('this.ingredients', this.ingredients);
  }

  /**
   * TODO: This should be called every time the recipe changes.
   */
  private getIngredients() {
    console.log('getIngredients() before', this.ingredients);

    if (!this.ingredients) {
      this.ingredients = {
        slug: this.data.slug,
        items: [],
      }
    }

    console.log('getIngredients() after', this.ingredients);
  }

  /**
   * TODO: Get the click target and add/remove it to the items array.
   */
  private saveIngredients(event: Event) {
    const {target} = event;
    const value = (<HTMLElement>target).dataset.index;
    
    const index = this.ingredients.items.indexOf(value);
    if (index < 0) {
      this.ingredients.items.push(value);
    } else {
      this.ingredients.items.splice(index, 1);
    }
    this.ingredients.items.sort();

    // Toggle data attribute for styling.
    (<HTMLElement>target).dataset.checked = `${index < 0}`;

    console.log('saveIngredients()', this.ingredients);

    // Save the items to localStorage.
    // localStorage.setItem('ingredients', JSON.stringify(this.storage));
  }

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

  protected render() {
    if (!this.data) return;

    const {
      badge,
      cost,
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
                ${items.map((item, j) => html`
                  <li
                    data-checked="false"
                    data-index="${i}.${j}"
                    @click="${this.saveIngredients}">
                    ${unsafeHTML(item)}
                  </li>`
                )}
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
