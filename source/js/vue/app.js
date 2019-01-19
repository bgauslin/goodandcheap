import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import routeConfig from './routes';
import direction from './store/direction';
import favorites from './store/favorites';
import ingredients from './store/ingredients';
import parent from './store/parent';
import search from './store/search';
import visited from './store/visited';
import transitions from './transitions';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

/** @const {string} */
const API_VERSION_PATH = '/v2/';

/**
 * Gets JSON API's base URL based on server environment.
 * @return {string}
 */
const apiBaseURL = () => {
  const hostnameParts = window.location.hostname.split('.');
  const tld = hostnameParts[hostnameParts.length - 1];
  return (tld === 'website') ? 'https://api.goodandcheap.website' : 'http://api.goodandcheap.test';
}

/**
 * Initialize data store with all modules.
 * @instance
 */
const store = new Vuex.Store({
  modules: {
    direction: direction,
    favorites: favorites,
    ingredients: ingredients,
    parent: parent,
    search: search,
    visited: visited,
  }
});

/**
 * Initialize the router.
 * @instance
 */
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'current',
  routes: routeConfig(),
});

/** Bind transitions and router. */
transitions(router);

/**
 * Initialize app, pass it the store and router, and mount it to the DOM.
 * @instance
 */
const app = new Vue({
  components: { App },
  data: {
    siteName: document.title,
    apiBaseUrl: `${apiBaseURL()}${API_VERSION_PATH}`,
  },
  router,
  store,
}).$mount('#app');
