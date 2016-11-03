<template lang="pug">
  div.chapter
    breadcrumbs(:current="data.title")
    div.chapter-content
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
import Breadcrumbs from '../partials/Breadcrumbs.vue'
import Cover from '../partials/Cover.vue'
import RecipePreview from '../recipes/Preview.vue'

export default {
  components: { Breadcrumbs, Cover, RecipePreview },
  props: ['data']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.chapter
  .chapter-content
    margin 0 auto
    background white

  .intro
    overflow hidden

  .previews
    animation slide-in-up .5s ease

  @media(min-width breakpoint-small)
    margin 0 margins-small

    .breadcrumbs
      margin 0 auto
      max-width stacked-width

    .chapter-content
      max-width stacked-width

  @media(min-width breakpoint-medium)
    margin 0 margins-medium

    .breadcrumbs
    .chapter-content
      width stacked-width
      max-width none

  @media(min-width breakpoint-large)
    margin 0 margins-large

    .breadcrumbs
      width auto

    .chapter-content
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
