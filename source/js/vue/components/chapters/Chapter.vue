<template lang="pug">
  div
    preloader(v-if="!loaded")
    breadcrumbs(v-if="loaded", :current="data.title")
    div.chapter(v-if="loaded")
      div
        div.intro
          cover(
            :title="data.title",
            :blurb="data.blurb",
            :image="data.photo",
            :count="data.recipeCount + ' Recipes'"
          )
        ol.previews
          recipe-preview(
            v-for="(recipe, index) in data.recipes",
            :item="recipe",
            :index="index",
            :showChapter="false",
            favoriteButton="toggle"
          )
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'
import Cover from '../partials/Cover.vue'
import RecipePreview from '../recipes/Preview.vue'

export default {

  components: { Preloader, Breadcrumbs, Cover, RecipePreview },

  data () {
    return {
      loaded: false,
      data: null,
      dataUrl: this.$root.apiBaseUrl + 'chapter/' + this.$route.params.slug
    }
  },

  created () {
    this.fetchData(this.dataUrl)
  },

  methods: {
    fetchData (url) {
      this.$http.get(url).then((response) => {
        this.data = response.data
        this.loaded = true
        this.updateTitle(this.data.title)
      })
    },

    updateTitle (title) {
      this.$root.$emit('update-title', title)
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.chapter
  background white

  .intro
    overflow hidden

  @media(min-width breakpoint-medium)
    margin 0 margins-medium

  @media(min-width breakpoint-large)
    margin 0 margins-large

    & > div
      position relative
      width 100%
      padding-bottom 50%
      overflow hidden

      .intro
        position-it(absolute, 0, null, null, 0)
        width 50%

      .previews
        position-it(absolute, 0, 0, null, null)
        width 50%
        height 100%
        overflow-y scroll
        -webkit-overflow-scrolling touch

  @media(min-width breakpoint-xlarge)
    margin 0 auto
    width width-xlarge


</style>
