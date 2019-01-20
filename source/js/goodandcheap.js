import setup from './setup';
import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './vue/components/App.vue';
import routeConfig from './vue/routes';
import direction from './vue/store/direction';
import favorites from './vue/store/favorites';
import ingredients from './vue/store/ingredients';
import parent from './vue/store/parent';
import search from './vue/store/search';
import visited from './vue/store/visited';
import transitions from './vue/transitions';

/** Set up Vue and global utilities. */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;
setup.init();

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
    apiBaseUrl: setup.apiBaseURL(),
  },
  router,
  store,
}).$mount('#app');
