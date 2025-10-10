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

  @state() chapter: string;
  @state() context: string = 'home';
  @state() data: allData;
  @state() page: string;
  @state() recipe: string;
  @state() root: string = '';
  @state() transitionHome: string;
  @state() transitionPage: string;
  @state() transitionChapter: string;
  @state() transitionRecipe: string;

  constructor() {
    super();
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

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('context')) {
      const prev = changedProperties.get('context');
      const next = this.context;

      // Going down.
      if (prev === 'home' && next === 'chapter') {
        this.transitionHome = 'start-out';
        this.transitionChapter = 'end-in';
      }

      if (prev === 'chapter' && next === 'recipe') {
        this.transitionChapter = 'start-out';
        this.transitionRecipe = 'end-in';
      }

      if (prev === 'home' && next === 'page') {
        this.transitionHome = 'start-out';
        this.transitionPage = 'end-in';
      }

      // Coming back up.
      if (prev === 'recipe' && next === 'chapter') {    
        this.transitionChapter = 'start-in';
        this.transitionRecipe = 'end-out';
      }

      if (prev === 'chapter' && next === 'home') {
        this.transitionHome = 'start-in';
        this.transitionChapter = 'end-out';
      }

      if (prev === 'page' && next === 'home') {
        this.transitionHome = 'start-in';
        this.transitionPage = 'end-out';
      } 
    }
  }

  private async fetchData() {
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
    let path = `${this.root}/${slug}`;
    if (context) {
      path = `${this.root}/${context}/${slug}`;
    }
    history.pushState(null, '', path);
  }

  protected render() {
    return html`
      <gc-home
        aria-hidden="${this.context !== 'home'}"
        transition="${this.transitionHome}"></gc-home>
      <gc-page
        aria-hidden="${this.context !== 'page'}"  
        page="${this.page}"
        transition="${this.transitionPage}"></gc-page>
      <gc-chapter
        aria-hidden="${this.context !== 'chapter'}"
        chapter="${this.chapter}"
        transition="${this.transitionChapter}"></gc-chapter>
      <gc-recipe
        aria-hidden="${this.context !== 'recipe'}"
        recipe="${this.recipe}"
        transition="${this.transitionRecipe}"></gc-recipe>
    `;
  }
}
