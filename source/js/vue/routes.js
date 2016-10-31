import Home from './components/Home.vue'
import Chapters from './components/chapters/Chapters.vue'
import Pages from './components/pages/Pages.vue'

import Chapter from './components/chapters/Chapter.vue'
import Page from './components/pages/Page.vue'

import Recipe from './components/recipes/Recipe.vue'
import Blurb from './components/recipes/Blurb.vue'
import RecipeIngredients from './components/recipes/Ingredients.vue'
import RecipeInstructions from './components/recipes/Instructions.vue'

import Favorites from './components/favorites/Favorites.vue'

import NotFound from './components/NotFound.vue'

export default function() {
  const routes = [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'chapters',
          component: Chapters
        },
        {
          path: 'info',
          name: 'pages',
          component: Pages
        }
      ]
    },
    {
      path: '/info/:slug',
      name: 'info',
      component: Page
    },
    {
      path: '/chapter/:slug',
      name: 'chapter',
      component: Chapter
    },
    {
      path: '/recipe/:slug',
      name: 'recipe',
      component: Recipe,
      children: [
        {
          path: '',
          component: Blurb
        },
        {
          path: 'ingredients',
          component: RecipeIngredients
        },
        {
          path: 'steps',
          component: RecipeInstructions
        }
      ]
    },
    {
      path: '/recipe',
      redirect: '/'
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '*',
      component: NotFound
    }
  ]

  return routes
}
