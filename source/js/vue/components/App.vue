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
      var apiPath = this.$route.meta.apiPath

      if (apiPath) {
        var dataUrl = this.$root.apiBaseUrl + apiPath
        var dataSlug = this.$route.params.slug

        if (dataSlug !== undefined) {
          dataUrl = dataUrl + '/' + dataSlug
        }

        this.$http.get(dataUrl).then((response) => {
          this.dataLoaded = false
          this.data = response.data
          //this.updateTitle(null)
          this.dataLoaded = true
        })
      }
    },

    updateTitle (title) {
      if (title !== null) {
        document.title = title + ' · ' + this.siteName
      } else {
        document.title = this.siteName
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
