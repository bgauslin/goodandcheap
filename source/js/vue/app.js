import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)

import routeConfig from './routes'

const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

import App from './components/App.vue'
import getApiDomain from '../helpers/getApiDomain'
const apiDomain = getApiDomain()

const app = new Vue({
  components: { App },

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
