<template lang="pug">
  div
    preloader(v-if="loading")
    div(v-if="!loading && chapters")
      ol.chapter-list
        preview(
          v-for="chapter in chapters",
          :item="chapter",
          route-name="chapter"
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
      chapters: null,
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
      return this.$root.apiBaseUrl + 'chapters'
    },

    fetchData (url) {
      this.loading = true
      this.$http.get(url).then((response) => {
        this.chapters = response.data.data
        this.updatePageMeta('Recipes', null)
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
//@import '../../../../stylus/_config/'

</style>
