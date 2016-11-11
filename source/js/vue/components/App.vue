<template lang="pug">
  div.site
    app-header(:parent="parent", :home="home")
    div.content
      preloader(v-if="!dataLoaded")
      transition(
        @before-enter="beforeEnter",
        @after-enter="afterEnter",
        @before-leave="beforeLeave",
        @after-leave="afterLeave",
        mode="out-in"
      )
        router-view(
          v-if="dataLoaded",
          :data="data",
          :key="data"
        )
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
    direction () {
      return this.$store.getters.getDirection
    }
  },

  created () {
    this.isHome()
    this.isSearch()

    this.endpoint = this.$route.meta.endpoint
    if (this.endpoint !== undefined) {
      this.fetchData(this.endpoint)
    }
    // set dataLoaded flag for routes with no data fetching
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

      if (this.endpoint !== undefined && fetch !== false) {
        this.data = null
        this.dataLoaded = false
        this.fetchData(this.endpoint)
      }
    }
  },

  methods: {
    beforeEnter (el) {
      switch (this.direction) {
        case 'forward':
          this.transitionEnter = 'slide-in-right'
          break
        case 'back':
          this.transitionEnter = 'slide-in-left'
          break
        default:
          this.transitionEnter = 'slide-in-up'
      }
      el.classList.add(this.transitionEnter)

      // reset scroll position for iOS
      setTimeout(function() {
        window.scrollTo(0, 1)
      }, 0)
    },

    afterEnter (el) {
      el.classList.remove(this.transitionEnter)
    },

    beforeLeave (el) {
      switch (this.direction) {
        case 'forward':
          this.transitionLeave = 'slide-out-left'
          break
        case 'back':
          this.transitionLeave = 'slide-out-right'
          break
        default:
          this.transitionLeave = 'slide-out-down'
      }
      el.classList.add(this.transitionLeave)
    },

    afterLeave (el) {
      el.classList.remove(this.transitionLeave)
    },

    fetchData (endpoint) {
      var endpointUrl = this.$root.apiBaseUrl + endpoint
      var slug = this.$route.params.slug

      // append query for search
      if (window.location.search) {
        endpointUrl += window.location.search
      }

      // set slug to undefined when going from 'page' to 'info'
      if (slug === null) {
        slug = undefined
      }

      if (slug !== undefined) {
        endpointUrl += '/' + slug
      }

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
      if (to.name === 'intro') {
        if (from.name === 'steps' || from.name === 'ingredients') {
          return false
        }
      } else if (to.name === 'steps' || to.name === 'ingredients') {
        return false
      } else if (from.name === 'pages' && to.name === 'chapters') {
        return false
      } else if (from.name === 'chapters' && to.name === 'pages') {
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
  overflow hidden

  @media(min-width breakpoint-medium)
    margin-top header-height-medium

.slide-in-right
  animation slideInRight .3s ease-out

.slide-in-left
  animation slideInLeft .3s ease-out

.slide-in-up
  animation slideInUp .3s ease-out

.slide-out-right
  animation slideOutRight .3s ease-out

.slide-out-left
  animation slideOutLeft .3s ease-out

.slide-out-down
  animation slideOutDown .3s ease-out

</style>
