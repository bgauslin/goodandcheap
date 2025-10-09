import {LitElement, html, PropertyValues} from 'lit';
import {customElement, state} from 'lit/decorators.js';

interface allData {
  chapters: string[];
  pages: string[];
  recipes: string[];
}

@customElement('gc-app')
class App extends LitElement {
  private clickHandler: EventListenerObject;
  private popstateHandler: EventListenerObject;

  @state() allChapters: string[];
  @state() allPages: string[];
  @state() chapter: string;
  @state() context: string = 'home';
  @state() data: allData;
  @state() page: string;
  @state() recipe: string;
  @state() root: string = '';

  constructor() {
    super();
    this.clickHandler = this.handleClick.bind(this);
    this.popstateHandler = this.handlePopstate.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.clickHandler);
    window.addEventListener('popstate', this.popstateHandler);
    this.fetchInfo();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.clickHandler);
    window.removeEventListener('popstate', this.popstateHandler);
  }

  protected createRenderRoot() {
    return this;
  }

  private async fetchInfo() {
    try {
      const response = await fetch('/api/all.json');
      this.data = await response.json();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  private handleClick(event: Event) {
    event.preventDefault();

    const {target} = event;
    const type = (<HTMLElement>target).dataset.type;

    if (!['chapter', 'page', 'recipe'].includes(type)) return;

    const href = (<HTMLAnchorElement>target).getAttribute('href');

    switch (type) {
      case 'chapter':
        this.chapter = href;
        this.context = 'chapter';
        this.updateBrowser(this.chapter);
        break;
      case 'page':
        this.page = href;
        this.context = 'page';
        this.updateBrowser(this.page);
        break;
      case 'recipe':
        this.recipe = href;
        this.context = 'recipe';
        const chapter = (<HTMLElement>target).dataset.context;
        this.updateBrowser(this.recipe, chapter);
        break;
      default:
        break;
    }

    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  private handlePopstate() {
    const url = new URL(window.location.href);
    const {pathname} = url;
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    
    const {chapters, pages, recipes} = this.data;

    if (recipes.includes(lastSegment)) {
      this.context = 'recipe';
      this.recipe = lastSegment;
    } else if (chapters.includes(lastSegment)) {
      this.context = 'chapter';
      this.chapter = lastSegment;
    } else if (pages.includes(lastSegment)) {
      this.context = 'page';
      this.page = lastSegment;
    } else {
      this.context = 'home';
    }

    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  private updateBrowser(slug: string, context?: string) {
    let path = `${this.root}/${slug}`;
    if (context) {
      path = `${this.root}/${context}/${slug}`;
    }
    
    history.pushState(null, '', path);
  }

  protected render() {
    return html`
      <gc-home
        ?hidden="${this.context !== 'home'}"></gc-home>
      <gc-page
        page="${this.page}"
        ?hidden="${this.context !== 'page'}"></gc-page>
      <gc-chapter
        chapter="${this.chapter}"
        ?hidden="${this.context !== 'chapter'}"></gc-chapter>
      <gc-recipe
        recipe="${this.recipe}"
        ?hidden="${this.context !== 'recipe'}"></gc-recipe>
    `;
  }
}
