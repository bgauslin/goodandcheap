import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  state: {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    ingredients: JSON.parse(localStorage.getItem('ingredients')) || [],
    parent: null,
    query: null,
    showSearch: false,
    transitionName: null
  },

  mutations: {
    addFavorite (state, item) {
      state.favorites.push(item)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    removeFavorite (state, item) {
      var i = state.favorites.indexOf(item)
      state.favorites.splice(i, 1)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    addIngredient (state, id) {
      state.ingredients.push(id)
      localStorage.setItem('ingredients', JSON.stringify(state.ingredients))
    },
    removeIngredient (state, id) {
      var i = state.ingredients.indexOf(id)
      state.ingredients.splice(i, 1)
      localStorage.setItem('ingredients', JSON.stringify(state.ingredients))
    },
    setParent (state, parent) {
      state.parent = parent
    },
    setQuery (state, query) {
      state.query = query
    },
    setSearch (state, flag) {
      state.showSearch = flag
    },
    setTransitionName (state, name) {
      state.transitionName = name
    }
  },

  getters: {
    favoritesCount: state => {
      return state.favorites.length
    },
    favoritesIds: state => {
      return state.favorites.map(favorite => favorite.id)
    },
    ingredientsIds: state => {
      return state.ingredients
    },
    getParent: state => {
      return state.parent
    },
    getQuery: state => {
      return state.query
    },
    getShowSearch: state => {
      return state.showSearch
    },
    getTransitionName: state => {
      return state.transitionName
    }
  }
})

const scrollBehavior = (to, from, savedPosition) => {
  if (to.matched.some(m => m.meta.stayInPlace)) {
    if (savedPosition) {
      return savedPosition
    }
  } else {
    return {
      x: 0,
      y: 0
    }
  }
}

import routeConfig from './routes'
const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  scrollBehavior
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
