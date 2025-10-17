import {Page, footer} from './shared';


/**
 * Custom element for rendering a Page for the Good And Cheap app.
 * This element simply receives data from a custom event and renders it.
 */
customElements.define('gc-page', class GoodAndCheapPage extends HTMLElement {
  private data: Page;
  private dataListener: EventListenerObject;

  constructor() {
    super();
    this.dataListener = this.updateData.bind(this);
  }

  connectedCallback() {
    this.addEventListener('data', this.dataListener);
  }

  disconnectedCallback() {
    this.removeEventListener('data', this.dataListener);
  }

  private updateData(event: CustomEvent) {
    this.data = event.detail;
    this.render();
  }

  private render() {
    const {content, image, title} = this.data;
    this.innerHTML = `
      <div class="cover">
        <gc-image class="cover__photo" src="${image}"></gc-image>
      </div>

      <div class="content">
        <h1>${title}</h1>
        ${content}
        ${footer}
      </div>
    `;
  }
});
