<template lang="pug">
  div.chapters
    preloader(v-if="loading")
    ol.previews(v-if="!loading && chapters")
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
        this.updatePageTitle('Recipes')
        this.loading = false
      })
    },

    updatePageTitle (title) {
      this.$root.$emit('update-page-title', title)
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
      display flex
      flex-direction row
      flex-wrap wrap

    .preview
      margin -1px 0 0 -1px
      border 1px solid border-color
      width calc(50% + 1px)

    @media(min-width breakpoint-large)
      .preview
        width calc((1/3 * 100%) + 1px)

</style>
