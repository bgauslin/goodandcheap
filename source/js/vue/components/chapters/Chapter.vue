<template lang="pug">
  div.chapter
    div.chapter-content
      div.intro
        basic-cover(
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
          :showBadge="true",
          favoriteButton="toggle"
        )
</template>

<script>
import BasicCover from '../partials/BasicCover.vue'
import RecipePreview from '../recipes/Preview.vue'

export default {
  components: { BasicCover, RecipePreview },
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
    //animation slideInUp .5s ease-out

  @media(min-width breakpoint-small)
    margin 1.5rem margins-small 0

    .chapter-content
      max-width stacked-width

  @media(min-width breakpoint-medium)
    margin 2.25rem margins-medium 0

    .chapter-content
      width stacked-width
      max-width none

  @media(min-width breakpoint-large)
    margin 3rem margins-large 0

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
    margin 3rem auto 0
    width width-xlarge

</style>
