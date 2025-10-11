import {LitElement, html, PropertyValues} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';


interface allData {
  chapters: string[];
  pages: string[];
  recipes: string[];
}

@customElement('gc-app')
class App extends LitElement {
  private clickHandler: EventListenerObject;
  private popstateHandler: EventListenerObject;

  @query('gc-chapter') chapterElement: HTMLElement;
  @query('gc-page') pageElement: HTMLElement;
  @query('gc-recipe') recipeElement: HTMLElement;

  @state() baseTitle: string;
  @state() chapter: string;
  @state() chapterTransition: string;
  @state() context: string = 'home';
  @state() data: allData;
  @state() homeTransition: string;
  @state() page: string;
  @state() pageTransition: string;
  @state() recipe: string;
  @state() recipeTransition: string;


  constructor() {
    super();
    this.clickHandler = this.handleClick.bind(this);
    this.popstateHandler = this.handlePopstate.bind(this);
    this.baseTitle = document.title;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.clickHandler);
    window.addEventListener('popstate', this.popstateHandler);
    this.fetchData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.clickHandler);
    window.removeEventListener('popstate', this.popstateHandler);
  }

  protected createRenderRoot() {
    return this;
  }

  private async fetchData() {
    try {
      const response = await fetch('./api/all.json');
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
  }

  private updateBrowser(slug: string, context?: string) {
    let path = `./${slug}`;
    if (context) {
      path = `./${context}/${slug}`;
    }
    history.pushState(null, '', path);

    if (this.context === 'home') {
      document.title = this.baseTitle;
    } else {
      // TODO: Get title of current view;
      document.title = `PAGE · ${this.baseTitle}`;
    }
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('context')) {
      const prev = changedProperties.get('context');
      const next = this.context;

      // Going down.
      if (prev === 'home' && next === 'chapter') {
        this.homeTransition = 'start-out';
        this.chapterTransition = 'end-in';
        window.requestAnimationFrame(() => this.chapterElement.scrollTo(0, 0));
      }

      if (prev === 'chapter' && next === 'recipe') {
        this.chapterTransition = 'start-out';
        this.recipeTransition = 'end-in';
        window.requestAnimationFrame(() => this.recipeElement.scrollTo(0, 0));
      }

      if (prev === 'home' && next === 'page') {
        this.homeTransition = 'start-out';
        this.pageTransition = 'end-in';
        window.requestAnimationFrame(() => this.pageElement.scrollTo(0, 0));
      }

      // Coming back up.
      if (prev === 'recipe' && next === 'chapter') {    
        this.chapterTransition = 'start-in';
        this.recipeTransition = 'end-out';
      }

      if (prev === 'chapter' && next === 'home') {
        this.homeTransition = 'start-in';
        this.chapterTransition = 'end-out';
      }

      if (prev === 'page' && next === 'home') {
        this.homeTransition = 'start-in';
        this.pageTransition = 'end-out';
      } 
    }
  }

  protected render() {
    return html`
      <header>
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcset="./img/wordmark-dark.png">
          <img src="./img/wordmark.png" alt="Good And Cheap">
        </picture>
      </header>

      <main>
        <gc-home
          aria-hidden="${this.context !== 'home'}"
          transition="${this.homeTransition}"></gc-home>
        <gc-page
          aria-hidden="${this.context !== 'page'}"  
          page="${this.page}"
          transition="${this.pageTransition}"></gc-page>
        <gc-chapter
          aria-hidden="${this.context !== 'chapter'}"
          chapter="${this.chapter}"
          transition="${this.chapterTransition}"></gc-chapter>
        <gc-recipe
          aria-hidden="${this.context !== 'recipe'}"
          recipe="${this.recipe}"
          transition="${this.recipeTransition}"></gc-recipe>
      </main>

      <footer>
        <img src="./img/by-nc-sa-80x15.svg" alt="Creative Commons License">
      </footer>
    `;
  }
}
