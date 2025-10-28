import {LitElement, html, PropertyValues} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {footer, STORAGE_ITEM, Events, Chapter, Data, Page, Recipe, RecipePreview} from './shared';


/**
 * Custom element that does all the heavy lifting for the Good And Cheap app.
 * This component fetches data from a JSON endpoint; sends data to child
 * components for rendering; sets CSS transitions for before/after view changes;
 * processes and stores saved favorites and ingredients; and updates the
 * browser's address bar and title.
 */
@customElement('gc-app')
class GoodAndCheapApp extends LitElement {
  private clickHandler: EventListenerObject;
  private favoritesHandler: EventListenerObject;
  private ingredientsHandler: EventListenerObject;
  private observer: MutationObserver;
  private popstateHandler: EventListenerObject;

  // Elements.
  @query('gc-chapter') chapterElement: HTMLElement;
  @query('gc-favorites') favoritesElement: HTMLElement;
  @query('gc-page') pageElement: HTMLElement;
  @query('gc-recipe') recipeElement: HTMLElement;

  // Properties.
  @state() backLabel: string = 'Home';
  @state() baseTitle: string;
  @state() chapters: Chapter[];
  @state() context: string = 'home';
  @state() data: Data;
  @state() dialogOpen: boolean = false;
  @state() favorites = new Set<RecipePreview>();
  @state() loading: boolean = true;
  @state() pages: Page[];
  @state() recipes: Recipe[];

  // Transitions.
  @state() chapterTransition: string;
  @state() homeTransition: string;
  @state() pageTransition: string;
  @state() recipeTransition: string;

  constructor() {
    super();
    this.baseTitle = document.title;
    this.clickHandler = this.handleClick.bind(this);
    this.favoritesHandler = this.handleFavorites.bind(this);
    this.ingredientsHandler = this.handleIngredients.bind(this);
    this.popstateHandler = this.updateFromUrl.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(Events.Click, this.clickHandler);
    this.addEventListener(Events.Favorites, this.favoritesHandler);
    this.addEventListener(Events.Ingredients, this.ingredientsHandler);
    window.addEventListener(Events.Popstate, this.popstateHandler);
    this.fetchData();
    this.setupObserver();
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

      // Clone the data to properties for later lookups.
      const {chapters, pages, recipes} = this.data;
      this.chapters = chapters;
      this.pages = pages;
      this.recipes = recipes;

      // We should be all set now.
      this.getStorage();
      this.updateFromUrl();
      await this.updateComplete;
      this.loading = false;

    } catch (error) {
      console.warn('Currently unable to fetch data. :(');
      return;
    }
  }

  /**
   * Sets up a MutationOberver that toggles a property based on the open/closed
   * state of the Favorites component.
   */
  private async setupObserver() {
    await this.updateComplete;
    this.observer = new MutationObserver(() => {
      this.dialogOpen = this.favoritesElement.getAttribute('active') === 'true';
    });
    this.observer.observe(this.favoritesElement, {attributes: true});
  }

  /**
   * Gets localStorage for saved ingredients and favorites for return visits.
   */
  private getStorage() {
    const storage = JSON.parse(localStorage.getItem(STORAGE_ITEM));
    if (!storage) return;

    const {favorites, ingredients} = storage;

    // Update ingredients in each recipe.
    for (const list of ingredients) {
      const recipe = this.recipes.find(recipe => recipe.id === list.id);
      recipe.savedIngredients = list.items;
    }

    // Save the recipe preview to favorites and update it within its chapter.
    for (const chapter of this.chapters) {
      const {recipes} = chapter;
      for (const preview of recipes) {
        if (favorites.includes(preview.id)) {
          this.favorites.add(preview);
          preview.favorite = true;
        }
      }
    }

    // Update each recipe's 'favorite' status.
    for (const favorite of favorites) {
      const recipe = this.recipes.find(recipe => recipe.id === favorite);
      recipe.favorite = true;
    }

    // Send favorites to the component.
    this.updateComponent(this.favoritesElement, this.favorites);
  }

  /**
   * Captures event dispatched from <gc-recipe> and updates the recipe with
   * saved ingredients.
   */
  private handleIngredients(event: CustomEvent) {
    const {id, saved} = event.detail;
    const recipe = this.recipes.find(recipe => recipe.id === id);
    recipe.savedIngredients = saved;
    this.setStorage();
  }

  /**
   * Captures event dispatched from components and updates the list of user
   * favorites.
   */
  private handleFavorites(event: CustomEvent) {
    const {detail} = event;
    const {chapter: chapterId, id} = detail;

    // Look up the recipe, find its preview in the chapter, then update its
    // preview in favorites.
    const recipe = this.recipes.find(recipe => recipe.id === id);
    const chapter = this.chapters.find(chapter => chapter.id === chapterId);
    const preview = chapter.recipes.find(recipe => recipe.id === id);

    const checked = !this.favorites.has(preview);

    // Update the recipe itself and within its chapter.
    recipe.favorite = checked;
    preview.favorite = checked;

    // Add/remove recipe preview to/from favorites.
    if (checked) {
      this.favorites.add(preview);
    } else {
      this.favorites.delete(preview);
    }
    
    // If the favorite is removed while on a recipe or chapter view, update
    // the view.
    const lastSegment = this.getSegment();
    if (lastSegment === chapter.id) {
      this.updateComponent(this.chapterElement, chapter);
    }
    if (lastSegment === id) {
      this.updateComponent(this.recipeElement, recipe);
    } 

    // Update favorites element and save favorites to localStorage.
    this.updateComponent(this.favoritesElement, this.favorites);
    this.setStorage();
  }

  /**
   * Saves user-selected ingredients and favorites to localStorage for
   * populating the UI on return visits.
   */
  private setStorage() {
    // Get saved ingredients.
    const filtered = this.recipes.filter(
        recipe => recipe.savedIngredients !== undefined);
    const ingredients = [];
    for (const recipe of filtered) {
      const {id, savedIngredients} = recipe;
      ingredients.push({
        id,
        items: savedIngredients,
      });
    }

    // Get just the recipe IDs from favorites.
    const favorites = [];
    for (const favorite of this.favorites) {
      favorites.push(favorite.id);
    }

    // Bundle and save everything.
    const saved = {
      favorites,
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

    // Hijack the link since it's from the app and the view needs to change.
    event.preventDefault();

    // Get last segment for looking up the type of content to render.
    const segments = href.split('/');
    const id = segments[segments.length - 1];
    
    // See if the ID is valid for one of our content types.
    const chapter = this.chapters.find((chapter: Chapter) => chapter.id === id);
    const page = this.pages.find((page: Page) => page.id === id);
    const recipe = this.recipes.find((recipe: Recipe) => recipe.id === id);

    // Get previous context in case a favorite was clicked and we're already
    // on a recipe view.
    const previousContext = this.context;

    // If we have valid content, render it and update the UI and browser.
    if (chapter) {
      this.context = 'chapter';
      this.updateComponent(this.chapterElement, chapter);
      this.updateAddressBar(id);
    } else if (page) {
      this.context = 'page';
      this.updateComponent(this.pageElement, page);
      this.updateAddressBar(id);
    } else if (recipe) {
      this.context = 'recipe';
      this.updateComponent(this.recipeElement, recipe);
      this.updateAddressBar(id, recipe.chapter);
    }

    // Reset scroll position if a recipe was clicked from the favorites list.
    if (previousContext === 'recipe' && this.context === 'recipe') {
      window.requestAnimationFrame(() => this.recipeElement.scrollTo(0, 0));
    }

    // Update the UI.
    this.updateButtonLabel();
    this.updateDocumentTitle(id);
  }

  /**
   * Updates the app when the 'Back' button is clicked. If current context
   * is a recipe, then next will be a chapter. Otherwise, default to home.
   */
  private handleBackButton() {
    if (this.context === 'recipe') {
      this.context = 'chapter';

      // Get the chapter based off URL segment.
      const id = this.getSegment();
      const chapter = this.getChapter(id);

      // Render the chapter and update the UI.
      this.updateComponent(this.chapterElement, chapter);
      this.updateButtonLabel();
      this.updateAddressBar(chapter.id);
      this.updateDocumentTitle(chapter.id);
    } else {
      this.context = 'home';
      this.updateAddressBar('');
      this.updateDocumentTitle();
    }
  }

  /**
   * Dispatches custom event to a component with data for rendering.
   */ 
  private updateComponent(element: HTMLElement,
      detail: Chapter|Page|Recipe|Set<RecipePreview>) {
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
      const id = this.getSegment();
      const chapter = this.getChapter(id);
      this.backLabel = chapter.title;
    } else {
      this.backLabel = 'Home'
    }
  }

  /**
   * Updates the app when browser's 'Back' and 'Forward' buttons are clicked.
   */ 
  private updateFromUrl() {
    const id = this.getSegment();

    // Look up content based on URL segment.
    const chapter = this.chapters.find((chapter: Chapter) => chapter.id === id);
    const page = this.pages.find((page: Page) => page.id === id);
    const recipe = this.recipes.find((recipe: Recipe) => recipe.id === id);

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
    this.updateDocumentTitle(id);
  }

  /**
   * Helper function that gets the last URL segment from the address bar.
   */
  private getSegment(): string {
    const url = new URL(window.location.href);
    const {pathname} = url;
    const segments = pathname.split('/');
    
    return segments[segments.length - 1];
  }

  /**
   * Helper function that gets the parent chapter of a recipe for updating
   * components and the browser.
   */
  private getChapter(id: string): Chapter {
    const recipe = this.recipes.find(recipe => recipe.id === id);
    const chapter = this.chapters.find(chapter => chapter.id === recipe.chapter);
    
    return chapter;
  }

  /**
   * Updates URL in the browser's address bar.
   */ 
  private updateAddressBar(id: string, parent?: string) {
    let path = `./${id}`;
    if (parent) {
      path = `./${parent}/${id}`;
    }
    history.pushState(null, '', path);
  }

  /**
   * Updates document title in the browser.
   */ 
  private updateDocumentTitle(id?: string) {
    let title = null;

    if (this.context === 'chapter') {
      const chapter = this.chapters.find(
          (chapter: Chapter) => chapter.id === id);
      title = chapter.title;
    } else if (this.context === 'page') {
      const page = this.pages.find((page: Page) => page.id === id);
      title = page.title;
    } else if (this.context === 'recipe') {
      const recipe = this.recipes.find((recipe: Recipe) => recipe.id === id);
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

      // Going forward to 'page' or 'chapter' from 'home'.
      if (prev === 'home') {
        if (next === 'page') {
          this.homeTransition = 'start-out';
          this.pageTransition = 'end-in';
          window.requestAnimationFrame(() => this.pageElement.scrollTo(0, 0));
        } else if (next === 'chapter') {
          this.homeTransition = 'start-out';
          this.chapterTransition = 'end-in';
          window.requestAnimationFrame(() => this.chapterElement.scrollTo(0, 0));
        }
      }

      // Going forward to 'recipe' from 'home', 'page', or 'chapter'.
      // (start-out, end-in)
      if (next === 'recipe') {
        if (prev === 'home') {
          this.homeTransition = 'start-out';
          this.recipeTransition = 'end-in';
        } else if (prev === 'page') {
          this.pageTransition = 'start-out';
          this.recipeTransition = 'end-in';
        } else if (prev === 'chapter') {
          this.chapterTransition = 'start-out';
          this.recipeTransition = 'end-in'; 
        }
        window.requestAnimationFrame(() => this.recipeElement.scrollTo(0, 0));
      }

      // Coming back from 'recipe' to 'chapter'.
      if (prev === 'recipe' && next === 'chapter') {    
        this.chapterTransition = 'start-in';
        this.recipeTransition = 'end-out';
      }

      // Coming back from 'chapter' or 'page' to 'chapter'.
      if (next === 'home') {
        if (prev === 'chapter') {
          this.homeTransition = 'start-in';
          this.chapterTransition = 'end-out';
        } else if (prev === 'page') {
          this.homeTransition = 'start-in';
          this.pageTransition = 'end-out';
        }
      }
    }
  }

  protected render() {
    return html`
      <header>
        <div class="header">
          <button
            aria-label="${this.backLabel}"
            class="back"
            title="${this.backLabel}"
            type="button"
            ?disabled="${this.context === 'home' || this.dialogOpen}"
            @click="${this.handleBackButton}">
            <svg aria-hidden="true" viewbox="0 0 24 24">
              <path d="M14,5 L7,12 L14,19"/>
            </svg>
            <span>${unsafeHTML(this.backLabel)}</span>
          </button>

          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcset="./wordmark-dark.png">
            <img src="./wordmark.png" alt="Good And Cheap">
          </picture>

          <gc-favorites></gc-favorites>
        </div>
      </header>

      <main ?data-loading="${this.loading}">
        <gc-home
          active="${!this.dialogOpen}"
          class="view"
          transition="${this.homeTransition}"  
          ?inert="${this.context !== 'home'}"></gc-home>
        <gc-page
          active="${!this.dialogOpen}"
          class="view"
          role="article"
          transition="${this.pageTransition}"
          ?inert="${this.context !== 'page'}"></gc-page>
        <gc-chapter
          active="${!this.dialogOpen}"
          class="view"
          role="article"
          transition="${this.chapterTransition}"
          ?inert="${this.context !== 'chapter'}"></gc-chapter>
        <gc-recipe
          active="${!this.dialogOpen}"
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
