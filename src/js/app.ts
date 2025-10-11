import {LitElement, html, PropertyValues} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';
import {Chapter, Page, Recipe} from './_types';


interface Data {
  chapters: Chapter[];
  pages: Page[];
  recipes: Recipe[];
}

@customElement('gc-app')
class App extends LitElement {
  private clickHandler: EventListenerObject;
  private popstateHandler: EventListenerObject;

  @query('gc-chapter') chapter: HTMLElement;
  @query('gc-page') page: HTMLElement;
  @query('gc-recipe') recipe: HTMLElement;

  @state() baseTitle: string;
  @state() chapterTransition: string;
  @state() context: string = 'home';
  @state() data: Data;
  @state() homeTransition: string;
  @state() pageTransition: string;
  @state() recipeTransition: string;

  constructor() {
    super();
    this.baseTitle = document.title;
    this.clickHandler = this.handleClick.bind(this);
    this.popstateHandler = this.handlePopstate.bind(this);
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

  /**
   * Gets all data for rendering.
   */
  private async fetchData(): Promise<Data> {
    try {
      const response = await fetch('./api/app.json');
      this.data = await response.json();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  /**
   * Updates the app when a link is clicked.
   */
  private handleClick(event: Event) {
    event.preventDefault();

    const {target} = event;
    const type = (<HTMLElement>target).dataset.type;

    if (!['chapter', 'page', 'recipe'].includes(type)) return;

    const {chapters, pages, recipes} = this.data;
    const slug = (<HTMLAnchorElement>target).getAttribute('href');
    switch (type) {
      case 'chapter':
        const chapter_ = chapters.find((chapter: Chapter) => chapter.slug === slug);
        this.updateComponent(this.chapter, chapter_, 'chapter');
        this.updateBrowser(slug);
        break;
      case 'page':
        const page_ = pages.find((page: Page) => page.slug === slug);
        this.updateComponent(this.page, page_, 'page');
        this.updateBrowser(slug);
        break;
      case 'recipe':
        const recipe_ = recipes.find((recipe: Recipe) => recipe.slug === slug);
        const chapter = (<HTMLElement>target).dataset.context;
        this.updateComponent(this.recipe, recipe_, 'recipe');
        this.updateBrowser(slug, chapter);
        break;
      default:
        break;
    }

    this.updateDocument(slug);
  }

  /**
   * Updates the app when browser's back and forward buttons are clickes.
   */ 
  private handlePopstate() {
    const url = new URL(window.location.href);
    const {pathname} = url;
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];

    const {chapters, pages, recipes} = this.data;
    const chapter = chapters.find((chapter: Chapter) => chapter.slug === lastSegment);
    const page = pages.find((page: Page) => page.slug === lastSegment);
    const recipe = recipes.find((recipe: Recipe) => recipe.slug === lastSegment);

    if (chapter) {
      this.updateComponent(this.chapter, chapter, 'chapter');
    } else if (page) {
      this.updateComponent(this.page, page, 'page');
    } else if (recipe) {
      this.updateComponent(this.recipe, recipe, 'recipe');
    } else {
      this.context = 'home';
    }

    this.updateDocument(lastSegment);
  }

  /**
   * Dispatches custom event to a component with data for rendering.
   */ 
  private updateComponent(element: HTMLElement, detail: Chapter|Page|Recipe, context: string) {
    element.dispatchEvent(new CustomEvent('data', {
      bubbles: true,
      composed: true,
      detail,
    }));
    this.context = context;
  }

  /**
   * Updates URL in the address bar.
   */ 
  private updateBrowser(slug: string, context?: string) {
    let path = `./${slug}`;
    if (context) {
      path = `./${context}/${slug}`;
    }
    history.pushState(null, '', path);
  }

  /**
   * Updates document title (and browser history).
   */ 
  private updateDocument(slug: string) {
    let title = null;
    const {chapters, pages, recipes} = this.data;

    if (this.context === 'chapter') {
      const chapter = chapters.find((chapter: Chapter) => chapter.slug === slug);
      title = chapter.title;
    } else if (this.context === 'page') {
      const page = pages.find((page: Page) => page.slug === slug);
      title = page.title;
    } else if (this.context === 'recipe') {
      const recipe = recipes.find((recipe: Recipe) => recipe.slug === slug);
      title = recipe.title;
    }

    document.title = title ? `${title} · ${this.baseTitle}` : this.baseTitle;
  }

  /**
   * Sets attributes on elements for in/out and forward/back transitions.
   */
  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('context')) {
      const prev = changedProperties.get('context');
      const next = this.context;

      // Going forward.
      if (prev === 'home' && next === 'chapter') {
        this.homeTransition = 'start-out';
        this.chapterTransition = 'end-in';
        window.requestAnimationFrame(() => this.chapter.scrollTo(0, 0));
      }

      if (prev === 'chapter' && next === 'recipe') {
        this.chapterTransition = 'start-out';
        this.recipeTransition = 'end-in';
        window.requestAnimationFrame(() => this.recipe.scrollTo(0, 0));
      }

      if (prev === 'home' && next === 'page') {
        this.homeTransition = 'start-out';
        this.pageTransition = 'end-in';
        window.requestAnimationFrame(() => this.page.scrollTo(0, 0));
      }

      // Coming back.
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
          transition="${this.pageTransition}"></gc-page>
        <gc-chapter
          aria-hidden="${this.context !== 'chapter'}"
          transition="${this.chapterTransition}"></gc-chapter>
        <gc-recipe
          aria-hidden="${this.context !== 'recipe'}"
          transition="${this.recipeTransition}"></gc-recipe>
      </main>

      <footer>
        <img src="./img/by-nc-sa-80x15.svg" alt="Creative Commons License">
      </footer>
    `;
  }
}
