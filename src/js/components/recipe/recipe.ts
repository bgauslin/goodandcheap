import {LitElement, html, nothing, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


interface recipe {
  badge: string,
  cost?: {
    each: string,
    total: string,
    units: string
  },
  image: string,
  ingredients?: {
    items: string[],
    label?: string,
  }[],
  overview: string,
  steps?: string[],
  title: string,
}

@customElement('gc-recipe')
class Recipe extends LitElement {
  @property() recipe: string;
  @state() data: recipe;

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
    if (changedProperties.has('recipe')) {
      this.fetchData();
    }
  }

  private async fetchData(): Promise<any> {
    try {
      const response = await fetch(`/api/${this.recipe}.json`);
      this.data = await response.json();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  protected render() {
    if (!this.data) return;

    const {badge, cost, image, ingredients, overview, steps, title} = this.data;

    const cost_ = cost ? html`
      <p class="cost">
        ${cost.total} Total<br>
        ${cost.each} / ${cost.units}
      </p>` : nothing;

    const overview_ = overview ? html`
      <section class="overview">
        ${unsafeHTML(overview)}
      </section>` : nothing;

    const ingredients_ = ingredients ? html`
      <section class="ingredients">
      ${ingredients.map((group, index) => {
        const {label, items} = group;
        return html`
          ${index === 0 ? html`<h2>Ingredients</h2>` : nothing}
          ${label ? html`<h3>${label}</h3>` : nothing}
          <ul>
            ${items.map(item => html`<li>${item}</li>`)}
          </ul>
        `;
      })}
      </section>` : nothing;

    const steps_ = steps ? html`
      <section class="steps">
        <h2>Steps</h2>
        <ol>
          ${steps.map(step => html`<li>${step}</li>`)}
        </ol>
      </section>` : nothing;

    return html`
      <section class="cover">
        <h1>${title}</h1>
        <div class="badge">${badge}</div>
        ${cost_}
        <img src="/images/${image}@large.webp" alt="">
      </section>
      ${overview_}
      ${ingredients_}
      ${steps_}
    `;
  }
}
