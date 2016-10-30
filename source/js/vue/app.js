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
    addFavorite (state, id) {
      state.favorites.push(id)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },

    removeFavorite (state, id) {
      var i = state.favorites.indexOf(id)
      state.favorites.splice(i, 1)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }
  }
})

import routeConfig from './routes'
const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  // TODO: set meta for different scroll behaviors...
  /*
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  */
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
    siteName: document.title,
    metaDescription: null
  },

  created () {
    this.$root.$on('update-page-title', function(title) {
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
