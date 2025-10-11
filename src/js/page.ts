import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Page} from './_types';


@customElement('gc-page')
class GoodAndCheapPage extends LitElement {
  private dataListener: EventListenerObject;
  
  @state() data: Page;

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

    const {image, content, title} = this.data;
    return html`
      <img src="./images/${image}@large.webp" alt="">
      <section>
        <h1>${title}</h1>
        ${unsafeHTML(content)}
      </section>
    `;
  }
}
