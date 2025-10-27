import {footer, Events, Page} from './shared';


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
    this.addEventListener(Events.Data, this.dataListener);
  }

  disconnectedCallback() {
    this.removeEventListener(Events.Data, this.dataListener);
  }

  private updateData(event: CustomEvent) {
    this.data = event.detail;
    this.render();
  }

  private render() {
    const {content, image, title} = this.data;
    this.innerHTML = `
      <div class="cover">
        <gc-cover class="cover__photo" src="${image}"></gc-cover>
      </div>

      <div class="content">
        <div class="copy">
          <h1>${title}</h1>
          ${content}
        </div>
      </div>

      ${footer}
    `;
  }
});
