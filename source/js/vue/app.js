import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)

import favorites from './store/favorites'
import ingredients from './store/ingredients'
import parent from './store/parent'
import search from './store/search'
import direction from './store/direction'

const store = new Vuex.Store({
  modules: {
    favorites: favorites,
    ingredients: ingredients,
    parent: parent,
    search: search,
    direction: direction
  }
})

import routeConfig from './routes'
const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current'
})

import transitions from './transitions'
transitions(router)

import getApiDomain from '../helpers/getApiDomain'
const apiDomain = getApiDomain()

import App from './components/App.vue'
const app = new Vue({
  components: { App },
  store,
  router,
  data: {
    siteName: document.title,
    apiBaseUrl: apiDomain + '/v1/'
  }

}).$mount('#app')
