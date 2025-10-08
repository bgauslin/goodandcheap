import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import shadowStyles from './recipe.scss';

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

/**
 * Web component for a clock with nine sets of hands.
 */
@customElement('goodandcheap-recipe')
class App extends LitElement {
  private endpoint: string = '/api/breakfast/omelette.json';
  private recipe: recipe;

  static styles = css`${shadowStyles}`;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    console.log('goodandcheap-recipe');
    this.fetchRecipe();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private async fetchRecipe(): Promise<any> {
    console.log('this.endpoint', this.endpoint);

    try {
      const response = await fetch(this.endpoint);
      this.recipe = await response.json();
      console.log('this.recipe', this.recipe);
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  protected render() {
    if (this.recipe) {

      console.log('render this.recipe', this.recipe);

      const {title, badge, image, cost, overview, ingredients, steps} = this.recipe;
      
      return html`
        <h2>${title}</h2>
        <div class="badge">${badge}</div>
        <img src="${image}" alt="">
        ${cost.map(item => html`<p>${item}</p>`)}
        ${overview}
        ${ingredients.map(group => {
          const {label, items} = group;
          return html`
            <h4>${label}</h4>
            <ul>
              ${items.map(item => html`<li>${item}</li>`)}
            </ul>
          `;
        })}
        <ol>
          ${steps.map(step => html`<li>${step}</li>`)}
        </ol>
      `;
    }
  }
}
