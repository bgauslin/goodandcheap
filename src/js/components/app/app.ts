import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

/**
 * Web component for a clock with nine sets of hands.
 */
@customElement('goodandcheap-app')
class App extends LitElement {
  @state() chapter: string;
  @state() recipe: string;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    // TODO: For testing/debugging.
    this.recipe = 'raita';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <goodandcheap-recipe recipe="${this.recipe}"></goodandcheap-recipe>
    `;
  }
}
