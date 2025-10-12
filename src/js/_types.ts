export interface Chapter {
  content: string,
  image: string,
  recipes: {
    badge: string,
    chapter: string,
    image: string,
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
  slug: string,
  steps?: string[],
  title: string,
}