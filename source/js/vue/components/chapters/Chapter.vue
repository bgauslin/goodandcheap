<template lang="pug">
  div
    preloader(v-if="loading")
    breadcrumbs(v-if="!loading && chapter", :current="chapter.title")
    div.chapter(v-if="!loading && chapter")
      div
        div.intro
          cover(
            :title="chapter.title",
            :blurb="chapter.blurb",
            :image="chapter.photo",
            :count="chapter.recipeCount + ' Recipes'"
          )
        ol.previews
          recipe-preview(
            v-for="(recipe, index) in chapter.recipes",
            :item="recipe",
            route-name="recipe",
            :toggle-favorite="true",
            :index="index"
          )
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'
import Cover from '../partials/Cover.vue'
import RecipePreview from '../recipes/Preview.vue'
import getBreakpointValue from '../../../helpers/getBreakpointValue'
import imagesLoaded from 'imagesloaded'

export default {

  components: { Preloader, Breadcrumbs, Cover, RecipePreview },

  data () {
    return {
      loading: null,
      chapter: null
    }
  },

  created () {
    this.fetchData(this.getApiUrl())
  },

  methods: {
    getApiUrl () {
      return this.$root.apiBaseUrl + 'chapter/' + this.$route.params.slug
    },

    fetchData (url) {
      this.loading = true
      this.$http.get(url).then((response) => {
        this.chapter = response.data
        this.updatePageTitle(this.chapter.title)
        this.loading = false
      })
    },

    updatePageTitle (title) {
      this.$root.$emit('update-page-title', title)
    },

    loadImages () {
      let that = this
      imagesLoaded(this.$el, that, function(instance) {
        console.log('imagesloaded')
        //that.loading = false
      })
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
    margin 0 margins-large 3rem

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
    margin 0 auto 3rem
    width width-xlarge


</style>
