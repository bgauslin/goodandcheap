import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
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
    }
  },

  getters: {
    favoritesCount: state => {
      return state.favorites.length
    },

    favoritesIds: state => {
      return state.favorites.map(favorite => favorite.id)
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
    apiBaseUrl: apiDomain + '/v1/',
    siteName: document.title
  },

  created () {
    this.$root.$on('update-title', function(title) {
      this.updateTitle(title)
    })
  },

  methods: {
    updateTitle (title) {
      if (title !== null) {
        document.title = title + ' · ' + this.siteName
      } else {
        document.title = this.siteName
      }
    }
  }

}).$mount('#app')
