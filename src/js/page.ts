import {Page, footer} from './shared';


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
    const {image, content, title} = this.data;
    this.innerHTML = `
      <gc-image class="cover-photo" src="${image}"></gc-image>

      <div class="content">
        <h1>${title}</h1>
        ${content}
        ${footer}
      </div>
    `;
  }
});
