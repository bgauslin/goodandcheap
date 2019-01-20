import Chapters from './components/Chapters.vue';
import Chapter from './components/Chapter.vue';
import Favorites from './components/Favorites.vue';
import Home from './components/Home.vue';
import NotFound from './components/NotFound.vue';
import Pages from './components/Pages.vue';
import Page from './components/Page.vue';
import Recipe from './components/Recipe.vue';
import RecipeBlurb from './components/RecipeBlurb.vue';
import RecipeIngredients from './components/RecipeIngredients.vue';
import RecipeInstructions from './components/RecipeInstructions.vue';
import Search from './components/SearchResults.vue';

export default () => {
  const routes = [
    {
      path: '/',
      component: Home,
      children: [
        {
          name: 'chapters',
          path: '/',
          component: Chapters,
          meta: {
            endpoint: 'home',
          }
        },
        {
          name: 'pages',
          path: '/info',
          component: Pages,
          meta: {
            endpoint: 'home',
          }
        }
      ]
    },
    {
      name: 'favorites',
      path: '/favorites',
      component: Favorites,
      meta: {
        endpoint: 'favorites',
      }
    },
    {
      name: 'info',
      path: '/info/:slug',
      component: Page,
      meta: {
        endpoint: 'page',
      }
    },
    {
      name: '404',
      path: '/404',
      component: NotFound,
    },
    {
      name: 'search',
      path: '/search',
      component: Search,
      meta: {
        endpoint: 'search',
      }
    },
    {
      name: 'chapter',
      path: '/:slug',
      component: Chapter,
      meta: {
        endpoint: 'chapter',
      }
    },
    {
      name: 'recipe',
      path: '/:chapter/:slug',
      component: Recipe,
      redirect: '/:chapter/:slug/',
      children: [
        {
          name: 'intro',
          path: '',
          component: RecipeBlurb,
          meta: {
            endpoint: 'recipe',
          }
        },
        {
          name: 'ingredients',
          path: 'ingredients',
          component: RecipeIngredients,
          meta: {
            endpoint: 'recipe',
          }
        },
        {
          name: 'steps',
          path: 'steps',
          component: RecipeInstructions,
          meta: {
            endpoint: 'recipe',
          }
        }
      ]
    }
  ]

  return routes
}
