<template lang="pug">
  div.site
    app-header(:parent="parent", :home="home")
    div.content
      preloader(v-if="!dataLoaded")
      router-view(v-if="dataLoaded", :data="data")
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
      apiUrl: null,
      home: null
    }
  },

  computed: {
    parent () {
      return this.$store.getters.getParent
    }
  },

  created () {
    this.isHome()

    this.apiUrl = this.$route.meta.apiUrl
    if (this.apiUrl !== undefined) {
      this.fetchData(this.apiUrl)
    }
  },

  watch: {
    '$route' (to, from) {
      this.isHome()

      this.apiUrl = this.$route.meta.apiUrl
      if (this.apiUrl !== undefined) {
        this.data = null
        this.dataLoaded = false
        this.fetchData(this.apiUrl)
      }
    }
  },

  methods: {
    fetchData (apiUrl) {
      var dataUrl = this.$root.apiBaseUrl + apiUrl
      if (this.$route.params.slug !== undefined) {
         dataUrl += '/' + this.$route.params.slug
      }
      this.$http.get(dataUrl).then((response) => {
        this.data = response.data
        this.$store.commit('setParent', response.data.parent)
        this.updateTitle(response.data.title)
        this.dataLoaded = true
      })
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

</style>
