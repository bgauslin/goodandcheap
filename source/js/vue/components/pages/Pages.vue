<template lang="pug">
  div.pages
    preloader(v-if="!loaded")
    ol.previews(v-if="loaded")
      preview(
        v-for="page in data",
        :item="page",
        route-name="info"
      )
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Preview from '../partials/Preview.vue'

export default {
  components: { Preview, Preloader },

  data () {
    return {
      data: null,
      loaded: false,
      dataUrl: this.$root.apiBaseUrl + 'pages'
    }
  },

  created () {
    this.fetchData(this.dataUrl)
  },

  methods: {
    fetchData (url) {
      this.$http.get(url).then((response) => {
        this.data = response.data.data
        this.updateTitle('Info')
        this.loaded = true
      })
    },

    updateTitle(title) {
      this.$root.$emit('update-title', title)
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.pages
  @media(min-width breakpoint-medium)
    margin 0 margins-medium

  .previews
    animation slideInUp .3s ease
    @media(min-width breakpoint-medium)
      previews-grid()

  .preview
    @media(min-width breakpoint-medium)
      preview-grid()
    @media(min-width breakpoint-large)
      preview-grid-large()

</style>
