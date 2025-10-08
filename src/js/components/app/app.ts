import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import shadowStyles from './app.scss';

/**
 * Web component for a clock with nine sets of hands.
 */
@customElement('goodandcheap-app')
class App extends LitElement {
  static styles = css`${shadowStyles}`;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected render() {
    return html`
      <goodandcheap-recipe></goodandcheap-recipe>
    `;
  }
}
