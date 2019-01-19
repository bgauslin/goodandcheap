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
  @media Breakpoint.SMALL
    margin '1.5rem %s 0' % Layout.Margin.SMALL

  @media Breakpoint.MEDIUM
    margin '2.25rem %s 0' % Layout.Margin.MEDIUM

  @media Breakpoint.LARGE
    margin '3rem %s 0' % Layout.Margin.LARGE

  @media Breakpoint.XLARGE
    margin 3rem auto 0
    width WIDTH_XLARGE

.chapter__content
  background white
  margin 0 auto
  
  @media Breakpoint.SMALL
    max-width '%s' % Layout.Width.STACKED

  @media Breakpoint.MEDIUM
    max-width none
    width '%s' % Layout.Width.STACKED

  @media Breakpoint.LARGE
    overflow hidden
    padding-bottom 50%
    position relative
    width 100%

.chapter__previews
  @media Breakpoint.LARGE
    height 100%
    overflow-y scroll
    -webkit-overflow-scrolling touch
    position_it(absolute, 0, 0, null, null)
    width 50%

.chapter__intro
  overflow hidden

  @media Breakpoint.LARGE
    position_it(absolute, 0, null, null, 0)
    width 50%

</style>
