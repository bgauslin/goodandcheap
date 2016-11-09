<template lang="pug">
  div.site
    app-header(:parent="parent", :home="home")
    div.content
      preloader(v-if="!dataLoaded")
      transition(:name="transitionName", mode="out-in")
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
      transitionName: ''
    }
  },

  computed: {
    parent () {
      return this.$store.getters.getParent
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

      //this.setTransition(to, from, this.$route.params.direction)

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
      }  else {
        return true
      }
    },

    setTransition (to, from, direction) {
      this.transitionName = direction
      /*
      if (direction !== undefined) {
        this.transitionName = direction
      } else {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = (toDepth < fromDepth) ? 'back' : 'forward'
      }
      */
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

/*
.forward-enter
.forward-enter-active
  animation slideInRight .3s ease-out

.forward-leave
.forward-leave-active
  animation slideOutLeft .3s ease-out

.back-enter
.back-enter-active
  animation slideInLeft .3s ease-out

.back-leave
.back-leave-active
  animation slideOutRight .3s ease-out
*/

</style>
