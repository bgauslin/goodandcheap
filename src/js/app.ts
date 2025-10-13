import {LitElement, html, PropertyValues} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Chapter, Page, Recipe} from './shared';


interface Data {
  chapters: Chapter[];
  pages: Page[];
  recipes: Recipe[];
}

@customElement('gc-app')
class GoodAndCheapApp extends LitElement {
  private clickHandler: EventListenerObject;

  @query('gc-chapter') chapterElement: HTMLElement;
  @query('gc-page') pageElement: HTMLElement;
  @query('gc-recipe') recipeElement: HTMLElement;

  @state() chapterTransition: string;
  @state() homeTransition: string;
  @state() pageTransition: string;
  @state() recipeTransition: string;

  @state() backLabel: string = 'Home';
  @state() baseTitle: string;
  @state() context: string = 'home';
  @state() data: Data;

  constructor() {
    super();
    this.baseTitle = document.title;
    this.clickHandler = this.handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.clickHandler);
    this.fetchData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.clickHandler);
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
      this.updateFromUrl();
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

    const chapter = chapters.find((chapter: Chapter) => chapter.slug === slug);
    const page = pages.find((page: Page) => page.slug === slug);
    const recipe = recipes.find((recipe: Recipe) => recipe.slug === slug);

    if (type === 'chapter') {
      this.context = 'chapter';
      this.updateComponent(this.chapterElement, chapter);
      this.updateAddressBar(slug);
    } else if (type === 'page') {
      this.context = 'page';
      this.updateComponent(this.pageElement, page);
      this.updateAddressBar(slug);
    } else if (type === 'recipe') {
      this.context = 'recipe';
      this.updateComponent(this.recipeElement, recipe);
      this.updateAddressBar(slug, recipe.chapter);
    }

    this.updateButtonLabel();
    this.updateDocumentTitle(slug);
  }

  /**
   * Updates the app when the 'Back' button is clicked.
   */
  private handleBackButton() {
    if (this.context === 'recipe') {
      this.context = 'chapter';

      const slug = this.getSlug();
      const chapter = this.getChapter(slug);

      this.updateButtonLabel();
      this.updateComponent(this.chapterElement, chapter);
      this.updateAddressBar(chapter.slug);
      this.updateDocumentTitle(chapter.slug);
    } else {
      this.context = 'home';

      this.updateAddressBar('');
      this.updateDocumentTitle();
    }
  }

  /**
   * Dispatches custom event to a component with data for rendering.
   */ 
  private updateComponent(element: HTMLElement, detail: Chapter|Page|Recipe) {
    element.dispatchEvent(new CustomEvent('data', {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  /**
   * Updates the 'Back' button's label on page load and view transition.
   */
  private updateButtonLabel() {
    if (this.context === 'recipe') {
      const slug = this.getSlug();
      const chapter = this.getChapter(slug);
      this.backLabel = chapter.title;
    } else {
      this.backLabel = 'Home'
    }
  }

  /**
   * Updates the app when browser's 'Back' and 'Forward' buttons are clicked.
   */ 
  private updateFromUrl() {
    const slug = this.getSlug();

    const {chapters, pages, recipes} = this.data;
    const chapter = chapters.find((chapter: Chapter) => chapter.slug === slug);
    const page = pages.find((page: Page) => page.slug === slug);
    const recipe = recipes.find((recipe: Recipe) => recipe.slug === slug);

    if (chapter) {
      this.context = 'chapter';
      this.updateComponent(this.chapterElement, chapter);
    } else if (page) {
      this.context = 'page';
      this.updateComponent(this.pageElement, page);
    } else if (recipe) {
      this.context = 'recipe';
      this.updateComponent(this.recipeElement, recipe);
    } else {
      this.context = 'home';
    }

    this.updateButtonLabel();
    this.updateDocumentTitle(slug);
  }

  /**
   * Helper function that gets the last URL segment from the address bar.
   */
  private getSlug(): string {
    const url = new URL(window.location.href);
    const {pathname} = url;
    const segments = pathname.split('/');
    
    return segments[segments.length - 1];
  }

  /**
   * Helper function that gets the parent Chapter of a Recipe for updating
   * elements and the browser window.
   */
  private getChapter(slug: string): Chapter {
    const {chapters, recipes} = this.data;
    const recipe = recipes.find(recipe => recipe.slug === slug);
    const chapter = chapters.find(chapter => chapter.slug === recipe.chapter);
    
    return chapter;
  }

  /**
   * Updates URL in the address bar.
   */ 
  private updateAddressBar(slug: string, parent?: string) {
    let path = `./${slug}`;
    if (parent) {
      path = `./${parent}/${slug}`;
    }
    history.replaceState(null, '', path);
  }

  /**
   * Updates document title (and browser history).
   */ 
  private updateDocumentTitle(slug?: string) {
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

    document.title = title ? `${title.replace('&amp;', '&')} · ${this.baseTitle}` : this.baseTitle;
  }

  /**
   * Sets attribute values for in/out and forward/back transitions.
   */
  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('context')) {
      const prev = changedProperties.get('context');
      const next = this.context;

      // Going forward.
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
        <div>
          <button
            id="back"
            title="${this.backLabel}"
            type="button"
            ?disabled="${this.context === 'home'}"
            @click="${this.handleBackButton}">
            <svg aria-hidden="true" viewbox="0 0 24 24">
              <path d="M15,4 L7,12 L15,20"/>
            </svg>
            <span>${unsafeHTML(this.backLabel)}</span>
          </button>

          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcset="./img/wordmark-dark.png">
            <img src="./img/wordmark.png" alt="Good And Cheap">
          </picture>
        </div>
      </header>

      <main>
        <gc-home
          transition="${this.homeTransition}"  
          ?inert="${this.context !== 'home'}"></gc-home>
        <gc-page
          transition="${this.pageTransition}"
          ?inert="${this.context !== 'page'}"></gc-page>
        <gc-chapter
          transition="${this.chapterTransition}"
          ?inert="${this.context !== 'chapter'}"></gc-chapter>
        <gc-recipe
          transition="${this.recipeTransition}"
          ?inert="${this.context !== 'recipe'}"></gc-recipe>
      </main>

      <footer>
        <img src="./img/by-nc-sa-80x15.svg" alt="Creative Commons License">
      </footer>
    `;
  }
}
