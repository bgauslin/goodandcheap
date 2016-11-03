<template lang="pug">
  div.site
    app-header
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
      currentPath: ''
    }
  },

  created () {
    this.apiUrl = this.$route.meta.apiUrl
    //console.log('created apiUrl = ' + this.apiUrl)
    this.$store.commit('savePath', this.$route.path)

    if (this.apiUrl !== undefined) {
      this.fetchData(this.apiUrl)
    }
  },

  watch: {
    '$route' (to, from) {
      this.apiUrl = this.$route.meta.apiUrl
      //console.log('watch apiUrl = ' + this.apiUrl)

      var currentPath = this.$route.path
      var lastPath = this.$store.getters.getLastPath

      if (this.apiUrl !== undefined && currentPath !== lastPath) {
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
      //console.log('dataUrl = ' + dataUrl)
      this.$http.get(dataUrl).then((response) => {
        this.data = response.data
        this.updateTitle(response.data.title)
        this.$store.commit('savePath', this.$route.path)
        this.dataLoaded = true
      })
    },

    updateTitle (title) {
      if (title !== undefined) {
        document.title = title + ' · ' + this.$root.siteName
      } else {
        document.title = this.$root.siteName
      }
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
