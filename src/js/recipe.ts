import {LitElement, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Recipe} from './shared';


@customElement('gc-recipe')
class GoodAndCheapRecipe extends LitElement {
  private dataListener: EventListenerObject;

  @state() data: Recipe;
  @state() tab: string = 'overview';

  constructor() {
    super();
    this.dataListener = this.updateData.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('data', this.dataListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('data', this.dataListener);
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
      <section
        aria-hidden="${this.tab !== 'overview'}"
        aria-labelledby="tab-overview"
        class="overview"
        id="overview"
        role="tabpanel"
        tabindex="0">
        ${unsafeHTML(overview)}
      </section>` : nothing;

    const ingredients_ = ingredients ? html`
      <section
        aria-hidden="${this.tab !== 'ingredients'}"
        aria-labelledby="tab-ingredients"
        id="ingredients"
        role="tabpanel"
        tabindex="0">
      ${ingredients.map((group, index) => {
        const {label, items} = group;
        return html`
          ${index === 0 ? html`<h2>Ingredients</h2>` : nothing}
          ${label ? html`<h3>${label}</h3>` : nothing}
          <ul>
            ${items.map(item => html`<li>${unsafeHTML(item)}</li>`)}
          </ul>
        `;
      })}
      </section>` : nothing;

    const steps_ = steps ? html`
      <section
        aria-hidden="${this.tab !== 'steps'}"
        aria-labelledby="tab-steps"
        id="steps"
        role="tabpanel"
        tabindex="0">
        <ol>
          ${steps.map(step => html`<li>${unsafeHTML(step)}</li>`)}
        </ol>
      </section>` : nothing;

    return html`
      <div class="cover">
        <gc-image class="cover-photo" src="${image}"></gc-image>
        <h1>${unsafeHTML(title)}</h1>
        <div class="badge">${badge}</div>
        ${cost_}
      </div>

      <div role="tablist">
        ${overview ? this.renderTabControl('Overview', 'overview') : nothing}
        ${ingredients ? this.renderTabControl('Ingredients', 'ingredients') : nothing}
        ${steps ? this.renderTabControl('Steps', 'steps') : nothing}
      </div>

      ${overview_}
      ${ingredients_}
      ${steps_}
    `;
  }

  private renderTabControl(label: string, id: string) {
    return html`
      <button
        aria-controls="${id}"
        aria-selected="${this.tab === id}"
        id="tab-${id}"
        role="tab"
        tabindex="${this.tab === id ? 0 : -1}"
        @click="${() => this.tab = id}">${label}</button>
      `;
  }
}
