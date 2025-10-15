export interface Chapter {
  content: string,
  image: string,
  recipes: {
    badge: string,
    chapter: string,
    image: string,
    serving: string,
    slug: string,
    title: string,
  }[],
  slug: string,
  title: string,
}

export interface Page {
  content: string,
  image: string,
  slug: string,
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
  image: string,
  ingredients?: {
    items: string[],
    label?: string,
  }[],
  overview: string,
  serving: string,
  slug: string,
  steps?: string[],
  title: string,
}

export const footer = `
  <footer>
    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en" title="Creative Commons Attribution-NonCommercial-ShareAlike License">
      <img src="./by-nc-sa-80x15.svg" alt="Creative Commons License">
    </a>
    <small>
      All content © ${new Date().getFullYear()} Leanne Brown<br>
      Web app © ${new Date().getFullYear()} Ben Gauslin
    <small>
  </footer>`;
