import {LitElement, html, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

interface page {
  content: string,
  image: string,
  title: string,
}

@customElement('gc-page')
class Page extends LitElement {
  @property() page: string;
  @state() endpoint: string;
  @state() data: page;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected createRenderRoot() {
    return this;
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('page')) {
      this.fetchPage();
    }
  }

  private async fetchPage(): Promise<any> {
    this.endpoint = `/api/${this.page}.json`;

    try {
      const response = await fetch(this.endpoint);
      this.data = await response.json();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  protected render() {
    if (!this.data) return;

    const {title, content} = this.data;

    return html`
      <h1>${title}</h1>
      ${unsafeHTML(content)}
    `;
  }
}
