import Home from './components/views/Home.vue'
import Chapters from './components/chapters/Chapters.vue'
import Pages from './components/pages/Pages.vue'

import Chapter from './components/chapters/Chapter.vue'
import Page from './components/pages/Page.vue'

import Recipe from './components/recipes/Recipe.vue'

import NotFound from './components/views/NotFound.vue'

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
      path: '/page/:slug',
      name: 'page',
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
      component: Recipe
    },
    {
      path: '/recipe',
      redirect: '/'
    },
    {
      path: '*',
      component: NotFound
    }
  ]

  return routes
}
