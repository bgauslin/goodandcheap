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

  @query('gc-chapter') chapterElement: HTMLElement;
  @query('gc-page') pageElement: HTMLElement;
  @query('gc-recipe') recipeElement: HTMLElement;

  @state() baseTitle: string;
  @state() chapterTransition: string;
  @state() context: string = 'home';
  @state() data: Data;
  @state() homeTransition: string;
  @state() pageTransition: string;
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
      const response = await fetch('./api/goodandcheap.json');
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

    const {chapters, pages, recipes} = this.data;
    const href = (<HTMLAnchorElement>target).getAttribute('href');
    switch (type) {
      case 'chapter':
        const chapter_ = chapters.find((chapter: Chapter) => chapter.slug === href);
        this.updateChapter(chapter_);
        this.updateBrowser(href);
        break;
      case 'page':
        const page_ = pages.find((page: Page) => page.slug === href);
        this.updatePage(page_);
        this.updateBrowser(href);
        break;
      case 'recipe':
        const recipe_ = recipes.find((recipe: Recipe) => recipe.slug === href);
        const chapter = (<HTMLElement>target).dataset.context;
        this.updateRecipe(recipe_);
        this.updateBrowser(href, chapter);
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

    const chapter = chapters.find((chapter: Chapter) => chapter.slug === lastSegment);
    const page = pages.find((page: Page) => page.slug === lastSegment);
    const recipe = recipes.find((recipe: Recipe) => recipe.slug === lastSegment);

    if (chapter) {
      this.updateChapter(chapter);
    } else if (page) {
      this.updatePage(page);
    } else if (recipe) {
      this.updateRecipe(recipe);
    } else {
      this.context = 'home';
    }
  }

  private updateChapter(detail: Chapter) {
    this.context = 'chapter';
    this.chapterElement.dispatchEvent(new CustomEvent('chapter', {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  private updatePage(detail: Page) {
    this.context = 'page';
    this.pageElement.dispatchEvent(new CustomEvent('page', {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  private updateRecipe(detail: Recipe) {
    this.context = 'recipe';
    this.recipeElement.dispatchEvent(new CustomEvent('recipe', {
      bubbles: true,
      composed: true,
      detail,
    }));
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
