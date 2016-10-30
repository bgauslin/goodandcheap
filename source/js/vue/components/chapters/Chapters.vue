<template lang="pug">
  div.chapters
    preloader(v-if="!loaded")
    ol.previews(v-if="loaded")
      preview(
        v-for="chapter in data",
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
      loaded: false,
      data: null,
      dataUrl: this.$root.apiBaseUrl + 'chapters'
    }
  },

  created () {
    this.fetchData(this.dataUrl)
  },

  methods: {
    fetchData (url) {
      this.$http.get(url).then((response) => {
        this.data = response.data.data
        this.updateTitle(null)
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

.chapters
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
