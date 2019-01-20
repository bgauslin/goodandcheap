import attachFastClick from 'fastclick';
import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import googleAnalytics from './modules/googleAnalytics';
import noTouch from './modules/noTouch';
import App from './vue/components/App.vue';
import routeConfig from './vue/routes';
import direction from './vue/store/direction';
import favorites from './vue/store/favorites';
import ingredients from './vue/store/ingredients';
import parent from './vue/store/parent';
import search from './vue/store/search';
import visited from './vue/store/visited';
import transitions from './vue/transitions';

/** @const {string} */
const API_VERSION_PATH = '/v2/';

/** @const {Object} */
const gaData = {
  domain: 'goodandcheap.website',
  id: 'UA-626192-14'
}

/** Set up Vue. */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

/** Set up non-Vue modules. */
googleAnalytics(gaData);
attachFastClick(document.body);
noTouch();

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
