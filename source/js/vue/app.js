import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    parent: null
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
    setParent (state, parent) {
      state.parent = parent
    }
  },

  getters: {
    favoritesCount: state => {
      return state.favorites.length
    },
    favoritesIds: state => {
      return state.favorites.map(favorite => favorite.id)
    },
    getParent: state => {
      return state.parent
    }
  }
})

import routeConfig from './routes'

const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}

/*
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}
*/

const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  //scrollBehavior
})

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
