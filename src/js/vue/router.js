import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';

// TODO: Figure out why Pages component breaks Search results styling when
// the component is hot-loaded. 
import Pages from './components/Pages.vue';

const Chapters = () => import('./components/Chapters.vue');
const Chapter = () => import('./components/Chapter.vue');
const Favorites = () => import('./components/Favorites.vue');
const Home = () => import('./components/Home.vue');
const NotFound = () => import('./components/NotFound.vue');
// const Pages = () => import('./components/Pages.vue');
const Page = () => import('./components/Page.vue');
const Recipe = () => import('./components/Recipe.vue');
const RecipeBlurb = () => import('./components/RecipeBlurb.vue');
const RecipeIngredients = () => import('./components/RecipeIngredients.vue');
const RecipeInstructions = () => import('./components/RecipeInstructions.vue');
const Search = () => import('./components/SearchResults.vue');

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'current',
  routes: [
    {
      name: '404',
      path: '*',
      component: NotFound,
    },
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
        endpoint: 'info',
      }
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
      redirect: '/:chapter/:slug',
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
    },
  ]
});
