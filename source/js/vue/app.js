import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import getApiDomain from '../helpers/getApiDomain'
import routeConfig from './routes'
import transitions from './transitions'

import direction from './store/direction'
import favorites from './store/favorites'
import ingredients from './store/ingredients'
import parent from './store/parent'
import search from './store/search'
import visited from './store/visited'

Vue.use(Vuex)
Vue.use(VueRouter)

const apiDomain = getApiDomain()

const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current'
})

transitions(router)

const store = new Vuex.Store({
  modules: {
    favorites: favorites,
    ingredients: ingredients,
    parent: parent,
    search: search,
    direction: direction,
    visited: visited
  }
})

const app = new Vue({
  components: { App },
  store,
  router,
  data: {
    siteName: document.title,
    apiBaseUrl: apiDomain + '/v1/'
  }

}).$mount('#app')
