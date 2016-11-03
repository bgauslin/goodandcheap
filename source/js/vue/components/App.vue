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
      dataLoaded: null
    }
  },

  created () {
    this.fetchData()
  },

  watch: {
    '$route' (to, from, next) {
      this.fetchData()
    }
  },

  methods: {
    fetchData () {
      var apiUrl = this.$route.meta.apiUrl

      if (apiUrl) {
        var dataUrl = this.$root.apiBaseUrl + apiUrl
        if (this.$route.params.slug !== undefined) {
           dataUrl += '/' + this.$route.params.slug
         }
        this.$http.get(dataUrl).then((response) => {
          this.dataLoaded = false
          this.data = response.data
          this.updateTitle(response.data.title)
          this.dataLoaded = true
        })
      }
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
