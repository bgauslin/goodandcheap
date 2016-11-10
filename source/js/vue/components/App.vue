<template lang="pug">
  div.site
    app-header(:parent="parent", :home="home")
    div.content
      preloader(v-if="!dataLoaded")
      transition(
        @before-enter="beforeEnter",
        @before-leave="beforeLeave",
        :enter-active-class="transitionEnter",
        :leave-active-class="transitionLeave",
        mode="out-in"
      )
        router-view(v-if="dataLoaded", :data="data", :key="data")
    app-footer
</template>

<script>
import AppHeader from './global/Header.vue'
import Breadcrumbs from './partials/Breadcrumbs.vue'
import AppFooter from './global/Footer.vue'
import Preloader from './partials/Preloader.vue'

import request from 'superagent'

export default {
  components: { AppHeader, Breadcrumbs, Preloader, AppFooter },

  data () {
    return {
      data: null,
      dataLoaded: null,
      endpoint: '',
      home: null,
      transitionEnter: null,
      transitionLeave: null
    }
  },

  computed: {
    parent () {
      return this.$store.getters.getParent
    },
    transitionName () {
      return this.$store.getters.getTransitionName
    }
  },

  created () {
    this.isHome()
    this.isSearch()

    this.endpoint = this.$route.meta.endpoint
    if (this.endpoint !== undefined) {
      this.fetchData(this.endpoint)
    }

    // NOTE routes with no data fetching
    if (this.$route.name === 'favorites' || this.$route.name === '404') {
      this.dataLoaded = true
    }
  },

  watch: {
    '$route' (to, from) {
      this.isHome()
      this.isSearch()

      this.endpoint = this.$route.meta.endpoint
      var fetch = this.doFetch(to, from)
      //console.log('fetch = ' + fetch)

      if (this.endpoint !== undefined && fetch !== false) {
        this.data = null
        this.dataLoaded = false
        this.fetchData(this.endpoint)
      }
    }
  },

  methods: {
    beforeEnter (el, done) {
      console.log('beforeEnter')

      switch (this.transitionName) {
        case 'forward':
          this.transitionEnter = 'slide-in-right'
          break
        case 'back':
          this.transitionEnter = 'slide-in-left'
          break
        default:
          this.transitionEnter = 'slide-in-up'
      }
      console.log('enter-class = ' + this.transitionEnter)
    },

    beforeLeave (el, done) {
      console.log('beforeLeave')

      switch (this.transitionName) {
        case 'forward':
          this.transitionLeave = 'slide-out-left'
          break
        case 'back':
          this.transitionLeave = 'slide-out-right'
          break
        default:
          this.transitionLeave = 'slide-out-down'
      }
      console.log('leave-class = ' + this.transitionLeave)
    },

    fetchData (endpoint) {
      //console.log('endpoint = ' + endpoint)
      var endpointUrl = this.$root.apiBaseUrl + endpoint
      var slug = this.$route.params.slug
      //console.log('slug = ' + slug)

      // NOTE append query for search
      if (window.location.search) {
        endpointUrl += window.location.search
      }

      // NOTE bugfix for going to 'info' from 'page'
      if (slug === null) { slug = undefined }
      if (slug !== undefined) { endpointUrl += '/' + slug }

      //console.log('endpointUrl = ' + endpointUrl)

      var that = this
      request
      .get(endpointUrl)
      .end(function(error, response) {
        if (error || !response.ok) {
          that.notFound()
        } else {
          that.data = response.body
          that.$store.commit('setParent', response.body.parent)
          that.updateTitle(response.body.title)
          that.dataLoaded = true
        }
      })
    },

    doFetch(to, from) {
      //console.log('to = ' + to.name)
      //console.log('from = ' + from.name)
      // TODO find a cleaner way to route all of this...
      if (to.name === 'intro') {
        if (from.name === 'steps' || from.name === 'ingredients') {
          return false
        }
      } else if (to.name === 'steps' || to.name === 'ingredients') {
        return false
      } else if (to.name === 'chapters' && from.name === 'pages') {
        return false
      } else if (to.name === 'pages' && from.name === 'chapters') {
        return false
      } else if (to.name === 'favorites') {
        return false
      } else {
        return true
      }
    },

    updateTitle (title) {
      if (title !== undefined) {
        document.title = title + ' · ' + this.$root.siteName
      } else {
        document.title = this.$root.siteName
      }
    },

    isHome () {
      var routeName = this.$route.name
      this.home = (routeName === 'chapters') ? true : false
    },

    isSearch () {
      var routeName = this.$route.name
      var setSearch = (routeName === 'search') ? true : false
      this.$store.commit('setSearch', setSearch)
    },

    notFound() {
      //console.log('404')
      window.location.replace('/404')
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.site
  display flex
  min-height 100vh
  flex-direction column

.content
  flex 1
  margin header-height-base 0 0

  @media(min-width breakpoint-medium)
    margin-top header-height-medium

.fade-in
  animation fadeIn 1s ease

.fade-out
  animation fadeOut 1s ease

.slide-in-right
  animation slideInRight .3s ease-out

.slide-out-left
  animation slideOutLeft .3s ease-out

.slide-out-right
  animation slideOutRight .3s ease-out

.slide-in-left
  animation slideInLeft .3s ease-out

.slide-in-up
  animation slideInUp .3s ease-out

.slide-out-down
  animation slideOutDown .3s ease-out

</style>
