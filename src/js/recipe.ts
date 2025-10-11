import {LitElement, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Recipe} from './_types';


@customElement('gc-recipe')
class GoodAndCheapRecipe extends LitElement {
  private dataListener: EventListenerObject;

  @state() data: Recipe;

  constructor() {
    super();
    this.dataListener = this.updateData.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('recipe', this.dataListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('recipe', this.dataListener);
  }

  protected createRenderRoot() {
    return this;
  }

  private updateData(event: CustomEvent) {
    this.data = event.detail;
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
      <section class="overview" id="overview">
        ${unsafeHTML(overview)}
      </section>` : nothing;

    const ingredients_ = ingredients ? html`
      <section id="ingredients">
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
      <section id="steps">
        <h2>Steps</h2>
        <ol>
          ${steps.map(step => html`<li>${step}</li>`)}
        </ol>
      </section>` : nothing;

    return html`
      <section class="cover">
        <img src="./images/${image}@large.webp" alt="">  
        <h1>${title}</h1>
        <div class="badge">${badge}</div>
        ${cost_}
      </section>
      ${overview_}
      ${ingredients_}
      ${steps_}
    `;
  }
}
