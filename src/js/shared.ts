export const favoriteIcon = `
  <svg aria-hidden="true" viewbox="0 0 24 24">
    <path d="M12,21 L3,12 A 1 1 0 0 1 12 5 A 1 1 0 0 1 21 12 L12,21"/>
  </svg>`;

export const footer = `
  <footer>
    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en" title="Creative Commons Attribution-NonCommercial-ShareAlike License" target="_blank">
      <img src="./by-nc-sa-80x15.svg" alt="Creative Commons License">
    </a>
    <small>
      All content © 2014–${new Date().toLocaleDateString('en', {year: '2-digit'})} Leanne Brown<br>
      Web app © ${new Date().getFullYear()} Ben Gauslin
    <small>
  </footer>`;

export const STORAGE_ITEM = 'saved';

export enum Events {
  Click = 'click',
  Data = 'data',
  Favorites = 'favorites',
  Ingredients = 'ingredients',
  Popstate = 'popstate',
  Touchend = 'touchend',
  Touchstart = 'touchstart',
}

export interface Chapter {
  content: string,
  id: string,
  image: string,
  recipes: {
    badge: string,
    chapter: string,
    favorite?: boolean,
    id: string,
    image: string,
    serving: string,
    title: string,
  }[],
  title: string,
}

export interface Page {
  content: string,
  id: string,
  image: string,
  title: string,
}

export interface Recipe {
  badge: string,
  chapter: string,
  cost?: {
    each: string,
    total: string,
    units: string
  },
  favorite?: boolean,
  id: string,
  image: string,
  ingredients?: {
    items: string[],
    label?: string,
  }[],
  more: {
    copy: string,
    cost?: {
      each: string,
      total: string,
      units: string
    },
    heading: string,
    image?: string,
    ingredients?: {
      items: string[],
      label?: string,
    }[],
    steps?: string[],
  }[],
  overview: string,
  savedIngredients?: string[],
  serving: string,
  steps?: string[],
  title: string,
}

export interface Data {
  chapters: Chapter[];
  pages: Page[];
  recipes: Recipe[];
}
