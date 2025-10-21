import {LitElement, html, PropertyValues} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Events, Chapter, Data, Page, Recipe, footer, STORAGE_ITEM} from './shared';


/**
 * Custom element that does all the heavy lifting for the Good And Cheap app.
 * This component fetches data from a JSON endpoint; sends data to child
 * components for rendering; sets CSS transitions for before/after view changes;
 * and updates the browser's address bar and title.
 */
@customElement('gc-app')
class GoodAndCheapApp extends LitElement {
  private clickHandler: EventListenerObject;
  private favoritesHandler: EventListenerObject;
  private ingredientsHandler: EventListenerObject;
  private popstateHandler: EventListenerObject;

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
  @state() favorites: string[] = [];

  constructor() {
    super();
    this.baseTitle = document.title;
    this.clickHandler = this.handleClick.bind(this);
    this.popstateHandler = this.updateFromUrl.bind(this);
    this.ingredientsHandler = this.handleIngredients.bind(this);
    this.favoritesHandler = this.handleFavorites.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(Events.Click, this.clickHandler);
    this.addEventListener(Events.Favorites, this.favoritesHandler);
    this.addEventListener(Events.Ingredients, this.ingredientsHandler);
    window.addEventListener(Events.Popstate, this.popstateHandler);
    this.fetchData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(Events.Click, this.clickHandler);
    this.removeEventListener(Events.Favorites, this.favoritesHandler);
    this.removeEventListener(Events.Ingredients, this.ingredientsHandler);
    window.removeEventListener(Events.Popstate, this.popstateHandler);
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
      this.getStorage();
      this.updateFromUrl();
    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  /**
   * Gets localStorage for pre-populating saved ingredients on return visits.
   */
  private getStorage() {
    const storage = JSON.parse(localStorage.getItem(STORAGE_ITEM));
    if (!storage) return;

    const {chapters, recipes} = this.data;
    const {favorites, ingredients} = storage;

    // Update ingredients in each recipe in the data object.
    for (const list of ingredients) {
      const recipe = recipes.find(recipe => recipe.slug === list.id);
      recipe.savedIngredients = list.items;
    }

    // Update each recipe entry's favorite state.
    this.favorites = favorites || [];
    for (const favorite of favorites) {
      const recipe = recipes.find(recipe => recipe.slug === favorite);
      recipe.favorite = true;
    }

    // Update the recipes's states within each chapter's list of recipes.
    for (const chapter of chapters) {
      const {recipes} = chapter;
      for (const recipe of recipes) {
        if (favorites.includes(recipe.slug)) {
          recipe.favorite = true;
        }
      }
    }
  }

  /**
   * Captures event dispatched from a recipe element and updates the recipe
   * with saved ingredients.
   */
  private handleIngredients(event: CustomEvent) {
    const {slug, saved} = event.detail;
    const {recipes} = this.data;

    const recipe = recipes.find(recipe => recipe.slug === slug);
    recipe.savedIngredients = saved;

    this.setStorage();
  }

  /**
   * Captures event dispatched from a recipe element and updates the list of
   * user favorites.
   */
  private handleFavorites(event: CustomEvent) {
    const {detail} = event;
    const {chapter: chapterSlug, checked, id} = detail;

    const {chapters, recipes} = this.data;

    // Update the recipe entry.
    const recipe = recipes.find(recipe => recipe.slug === id);
    recipe.favorite = checked;

    // Update the recipe in its chapter list.
    const chapter = chapters.find(chapter => chapter.slug === chapterSlug);
    const recipe_ = chapter.recipes.find(recipe => recipe.slug === id);
    recipe_.favorite = checked;

    // Add/remove the favorite and sort the list for readability.
    if (checked) {
      this.favorites.push(id);
    } else {
      const index = this.favorites.indexOf(id);
      this.favorites.splice(index, 1);
    }
    this.favorites.sort();

    // Save to localStorage.
    this.setStorage();
  }

  /**
   * Saves user-selected items to localStorage for populating UI on follow-up
   * visits.
   */
  private setStorage() {
    const {recipes} = this.data;

    // Get saved ingredients
    const filtered = recipes.filter(recipe => recipe.savedIngredients !== undefined);
    const ingredients = [];
    for (const recipe of filtered) {
      const {slug, savedIngredients} = recipe;
      ingredients.push({
        id: slug,
        items: savedIngredients,
      });
    }

    // Bundle everything up and save it to localStorage.
    const saved = {
      favorites: this.favorites,
      ingredients,
    };
    
    localStorage.setItem(STORAGE_ITEM, JSON.stringify(saved));
  }

  /**
   * Updates the app when a link is clicked.
   */
  private handleClick(event: Event) {
    const {target} = event;
    const href = (<HTMLAnchorElement>target).getAttribute('href');

    // Bail if there's no attribute or if the link goes to an external site.
    if (!href || href.startsWith('http')) return;

    // Otherwise, hijack the link since it's from the app and the view needs to
    // change.
    event.preventDefault();

    // Get last segment for looking up the type of content to render.
    const segments = href.split('/');
    const slug = segments[segments.length - 1];
    
    // See if the slug is valid for one of our content types.
    const {chapters, pages, recipes} = this.data;
    const chapter = chapters.find((chapter: Chapter) => chapter.slug === slug);
    const page = pages.find((page: Page) => page.slug === slug);
    const recipe = recipes.find((recipe: Recipe) => recipe.slug === slug);

    // If we have valid content, render it and update the UI and browser.
    if (chapter) {
      this.context = 'chapter';
      this.updateComponent(this.chapterElement, chapter);
      this.updateAddressBar(slug);
    } else if (page) {
      this.context = 'page';
      this.updateComponent(this.pageElement, page);
      this.updateAddressBar(slug);
    } else if (recipe) {
      this.context = 'recipe';
      this.updateComponent(this.recipeElement, recipe);
      this.updateAddressBar(slug, recipe.chapter);
    }

    this.updateButtonLabel();
    this.updateDocumentTitle(slug);
  }

  /**
   * Updates the app when the 'Back' button is clicked. If current context
   * is a Recipe, then next will be a Chapter. Otherwise, default to Home.
   */
  private handleBackButton() {
    if (this.context === 'recipe') {
      this.context = 'chapter';

      // Get the chapter based off URL slug.
      const slug = this.getSlug();
      const chapter = this.getChapter(slug);

      // Render the chapter and update the UI.
      this.updateComponent(this.chapterElement, chapter);
      this.updateButtonLabel();
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
    element.dispatchEvent(new CustomEvent(Events.Data, {
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

    // Look up content based on URL slug.
    const {chapters, pages, recipes} = this.data;
    const chapter = chapters.find((chapter: Chapter) => chapter.slug === slug);
    const page = pages.find((page: Page) => page.slug === slug);
    const recipe = recipes.find((recipe: Recipe) => recipe.slug === slug);

    // Set current context, render current content, update the UI.
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
    history.pushState(null, '', path);
  }

  /**
   * Updates document title (and browser history list).
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
        <div class="header">
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
              srcset="./wordmark-dark.png">
            <img src="./wordmark.png" alt="Good And Cheap">
          </picture>
        </div>
      </header>

      <main>
        <gc-home
          class="view"
          transition="${this.homeTransition}"  
          ?inert="${this.context !== 'home'}"></gc-home>
        <gc-page
          class="view"
          role="article"
          transition="${this.pageTransition}"
          ?inert="${this.context !== 'page'}"></gc-page>
        <gc-chapter
          class="view"
          role="article"
          transition="${this.chapterTransition}"
          ?inert="${this.context !== 'chapter'}"></gc-chapter>
        <gc-recipe
          class="view"
          role="article"
          transition="${this.recipeTransition}"
          ?inert="${this.context !== 'recipe'}"></gc-recipe>
      </main>
      ${unsafeHTML(footer)}
      <gc-touch></gc-touch>
    `;
  }
}
