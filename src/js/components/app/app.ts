import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

/**
 * Web component for Good And Cheap app.
 */
@customElement('gc-app')
class App extends LitElement {
  private clickHandler: EventListenerObject;

  @state() chapter: string;
  @state() page: string;
  @state() recipe: string;

  constructor() {
    super();
    this.clickHandler = this.handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.clickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.clickHandler);
  }

  protected createRenderRoot() {
    return this;
  }

  private handleClick(event: Event) {
    event.preventDefault();

    const {target} = event;
    const type = (<HTMLElement>target).dataset.type;

    if (!['chapter', 'page', 'recipe'].includes(type)) return;

    const href = (<HTMLAnchorElement>target).getAttribute('href');

    if (type === 'chapter') this.chapter = href;
    if (type === 'page') this.page = href;
    if (type === 'recipe') this.recipe = href;
  }

  protected render() {
    return html`
      <gc-home></gc-home>
      <gc-page page="${this.page}"></gc-page>
      <gc-chapter chapter="${this.chapter}"></gc-chapter>
      <gc-recipe recipe="${this.recipe}"></gc-recipe>
    `;
  }
}
