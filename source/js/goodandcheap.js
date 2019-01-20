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

/** @enum {string} */
const Config = {
  API_DEV: 'http://api.goodandcheap.test',
  API_PROD: 'https://api.goodandcheap.website',
  API_VERSION: 'v2',
  DOMAIN: 'goodandcheap.website',
  GA_ID: 'UA-626192-14',
}

/** @const {Object} */
const gaData = {
  domain: Config.DOMAIN,
  id: Config.GA_ID,
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
  return (window.location.hostname !== Config.DOMAIN) ? Config.API_DEV : Config.API_PROD;
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
    apiBaseUrl: `${apiBaseURL()}/${Config.API_VERSION}/`,
  },
  router,
  store,
}).$mount('#app');
