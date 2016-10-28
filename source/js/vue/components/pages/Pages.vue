<template lang="pug">
  div
    preloader(v-if="loading")
    div(v-if="!loading && pages")
      ol.page-list
        preview(
          v-for="page in pages",
          :item="page",
          route-name="info"
        )
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Preview from '../partials/Preview.vue'

export default {
  components: { Preloader, Preview },

  data () {
    return {
      loading: null,
      pages: []
    }
  },

  created () {
    this.fetchData(this.getApiUrl())
  },

  watch: {
    '$route' (to, from) {
      this.fetchData(this.getApiUrl())
    }
  },

  methods: {
    getApiUrl () {
      return this.$root.apiBaseUrl + '/pages'
    },

    fetchData (url) {
      this.loading = true
      this.$http.get(url).then((response) => {
        this.pages = response.data.data
        this.updatePageMeta('Info', null)
        this.loading = false
      })
    },

    updatePageMeta (title, metaDescription) {
      this.$root.$emit('update-page-title', title)
      this.$root.$emit('update-meta-description', metaDescription)
    }
  }
}
</script>

<style lang="stylus">
//@import '../../../../stylus/config/'

</style>
