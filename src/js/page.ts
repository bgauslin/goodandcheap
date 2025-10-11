import {Page} from './_types';


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
      <figure class="cover-photo">
        <img src="./images/${image}@large.webp" alt="">
      </figure>

      <section>
        <h1>${title}</h1>
        ${content}
      </section>
    `;
  }
});
