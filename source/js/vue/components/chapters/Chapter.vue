<template lang="pug">
  div.chapter
    div.chapter__content
      div.chapter__intro
        basic-cover(
          :blurb="data.blurb",
          :count="data.recipeCount + ' Recipes'",
          :image="data.photo",
          :title="data.title",
        )
      ol.chapter__previews
        recipe-preview(
          v-for="(recipe, index) in data.recipes",
          :index="index",
          :item="recipe",
          :showBadge="true",
          :showChapter="false",
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
  @media (min-width BREAKPOINT_SMALL)
    margin 1.5rem MARGINS_SMALL 0

  @media (min-width BREAKPOINT_MEDIUM)
    margin 2.25rem MARGINS_MEDIUM 0

  @media (min-width BREAKPOINT_LARGE)
    margin 3rem MARGINS_LARGE 0

  @media (min-width BREAKPOINT_XLARGE)
    margin 3rem auto 0
    width WIDTH_XLARGE

.chapter__content
  background WHITE
  margin 0 auto
  
  @media (min-width BREAKPOINT_SMALL)
    max-width STACKED_WIDTH

  @media (min-width BREAKPOINT_MEDIUM)
    max-width none
    width STACKED_WIDTH

  @media (min-width BREAKPOINT_LARGE)
    overflow hidden
    padding-bottom 50%
    position relative
    width 100%

.chapter__previews
  @media (min-width BREAKPOINT_LARGE)
    height 100%
    overflow-y scroll
    -webkit-overflow-scrolling touch
    position_it(absolute, 0, 0, null, null)
    width 50%

.chapter__intro
  overflow hidden

  @media (min-width BREAKPOINT_LARGE)
    position_it(absolute, 0, null, null, 0)
    width 50%

</style>
