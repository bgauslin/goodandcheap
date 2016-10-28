<template lang="pug">
  section.chapter
    preloader(v-if="loading")
    div.chapter-intro(v-if="!loading && chapter")
      cover(
        :title="chapter.title",
        :blurb="chapter.blurb",
        :image="chapter.photo",
        :count="chapter.recipeCount + ' Recipes'"
      )
    ol.recipe-list
      <!-- recipe-preview(v-for="recipe in chapter.recipes") -->
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Cover from '../partials/Cover.vue'

export default {

  components: { Preloader, Cover },

  data () {
    return {
      loading: null,
      chapter: null
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
      return this.$root.apiBaseUrl + '/chapter/' + this.$route.params.slug
    },

    fetchData (url) {
      this.loading = true
      this.$http.get(url).then((response) => {
        this.chapter = response.data
        this.loading = false
        this.updatePageMeta(this.chapter.title, null)
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
@import '../../../../stylus/config/'

.chapter
  &.contained
    .recipe-list
      border none

  @media(min-width breakpoint-large)
    display flex
    flex-direction row
    flex-wrap nowrap

    .recipe-list
      background white

    .chapter-intro
      width 50%
      border-right 1px solid border-color

    // NOTE see also .recipe.large
    &.contained
      .chapter-intro
        overflow hidden
      .recipe-list
        overflow-y scroll
        -webkit-overflow-scrolling touch

</style>
