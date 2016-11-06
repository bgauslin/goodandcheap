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
import AppFooter from './global/Footer.vue'
import Preloader from './partials/Preloader.vue'

export default {
  components: { AppHeader, Preloader, AppFooter },

  data () {
    return {
      data: null,
      dataLoaded: null,
      endpoint: this.$route.meta.endpoint,
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

    this.endpoint = this.$route.meta.endpoint
    if (this.endpoint !== undefined) {
      this.fetchData(this.endpoint)
    }

    // NOTE load favorites on direct URL visit
    if (this.$route.name === 'favorites') {
      this.dataLoaded = true
    }
  },

  watch: {
    '$route' (to, from) {
      this.isHome()
      this.setTransition(to, from, this.$route.params.direction)
      this.endpoint = this.$route.meta.endpoint

      var reload = this.doFetch(to, from)

      if (this.endpoint !== undefined && reload !== false) {
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

      if (slug === null) { slug = undefined } // NOTE weird bugfix for going to 'info' from 'page'
      if (slug !== undefined) { endpointUrl += '/' + slug }

      this.$http.get(endpointUrl).then((response) => {
        this.data = response.data
        this.$store.commit('setParent', response.data.parent)
        this.updateTitle(response.data.title)
        this.dataLoaded = true
      })
    },

    doFetch(to, from) {
      //console.log('to = ' + to.name)
      //console.log('from = ' + from.name)

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
      var path = this.$route.path
      this.home = (path === '/') ? true : false
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
  margin-top header-height-base

  @media(min-width breakpoint-medium)
    margin-top header-height-medium


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


</style>
