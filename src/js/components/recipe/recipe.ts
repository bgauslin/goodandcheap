import {LitElement, html, nothing, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

interface recipe {
  title: string,
  badge: string,
  image: string,
  cost?: string[],
  overview: string,
  ingredients?: {
    label?: string,
    items: string[],
  }[],
  steps?: string[],
}

@customElement('gc-recipe')
class Recipe extends LitElement {
  @property() recipe: string;
  @state() endpoint: string;
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
      this.fetchRecipe();
    }
  }

  private async fetchRecipe(): Promise<any> {
    this.endpoint = `/api/${this.recipe}.json`;

    try {
      const response = await fetch(this.endpoint);
      this.data = await response.json();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  protected render() {
    if (!this.data) return;

    const {badge, cost, ingredients, overview, steps, title} = this.data;

    const cost_ = cost ? cost.map(item => html`<p>${item}</p>`) : nothing;

    const ingredients_ = ingredients ?
        ingredients.map(group => {
          const {label, items} = group;
          return html`
            <h3>${label}</h3>
            <ul>
              ${items.map(item => html`<li>${item}</li>`)}
            </ul>
          `;
        }) :
        nothing;

    const steps_ = steps ?
        html`<ol>${steps.map(step => html`<li>${step}</li>`)}</ol>` :
        nothing;

    return html`
      <section class="cover">
        <h1>${title}</h1>
        <div class="badge">${badge}</div>
        ${cost_}
      </section>
      <section class="overview">
        <h2>Overview</h2>
        ${unsafeHTML(overview)}
      </section>
      <section class="ingredients">
        <h2>Ingredients</h2>
        ${ingredients_}
      </section>
      <section class="steps">
        <h2>Steps</h2>
        ${steps_}
      </section>
    `;
  }
}
