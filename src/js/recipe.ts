import {LitElement, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Recipe, footer} from './shared';


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
          ${ingredients.map(group => {
            const {label, items} = group;
            return html`
              ${label ? html`<h3>${label}</h3>` : nothing}
              <ul class="ingredients">
                ${items.map(item => html`<li>${unsafeHTML(item)}</li>`)}
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
              <h2>${heading}</h2>
              ${image ? html`
              <div class="">
                <img src="./images/${image}@medium.webp" alt="">
                ${cost ? html`
                <p class="cost">
                  ${cost.total} Total<br>
                  ${cost.each} / ${cost.units}
                </p>` : nothing}
              </div>` : nothing}
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

        ${unsafeHTML(footer)}
      </div>
    `;
  }
}
