<template lang="pug">
  div.chapter
    div.chapter-content
      div.intro
        basic-cover(
          :title="data.title",
          :blurb="data.blurb",
          :image="data.photo",
          :count="data.recipeCount + ' Recipes'",
        )
      ol.previews
        recipe-preview(
          v-for="(recipe, index) in data.recipes",
          :item="recipe",
          :index="index",
          :showChapter="false",
          :showBadge="true",
          favoriteButton="toggle",
        )
</template>

<script>
import BasicCover from '../partials/BasicCover.vue';
import RecipePreview from '../recipes/Preview.vue';

export default {
  components: {
    BasicCover,
    RecipePreview,
  },

  props: ['data'],
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.chapter
  .chapter-content
    background WHITE
    margin 0 auto

  .intro
    overflow hidden

  @media(min-width BREAKPOINT_SMALL)
    margin 1.5rem MARGINS_SMALL 0

    .chapter-content
      max-width STACKED_WIDTH

  @media(min-width BREAKPOINT_MEDIUM)
    margin 2.25rem MARGINS_MEDIUM 0

    .chapter-content
      max-width none
      width STACKED_WIDTH

  @media(min-width BREAKPOINT_LARGE)
    margin 3rem MARGINS_LARGE 0

    .chapter-content
      overflow hidden
      padding-bottom 50%
      position relative
      width 100%

      .intro
        position_it(absolute, 0, null, null, 0)
        width 50%

      .previews
        height 100%
        overflow-y scroll
        -webkit-overflow-scrolling touch
        position_it(absolute, 0, 0, null, null)
        width 50%

  @media(min-width BREAKPOINT_XLARGE)
    margin 3rem auto 0
    width WIDTH_XLARGE

</style>
