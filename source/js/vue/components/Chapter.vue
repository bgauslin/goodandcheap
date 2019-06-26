<template lang="pug">
  div.chapter
    div.chapter__content
      div.chapter__intro
        cover(
          modifier="chapter",
          :blurb="data.blurb",
          :count="data.recipeCount + ' Recipes'",
          :image="data.photo",
          :title="data.title",
        )
      ol.previews.previews--chapter
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
import Cover from './Cover.vue';
import RecipePreview from './RecipePreview.vue';

export default {
  components: {
    Cover,
    RecipePreview,
  },

  props: ['data'],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.chapter
  @media Breakpoint.SMALL
    margin 1.5rem var(--margin) 0

  @media Breakpoint.MEDIUM
    margin-top 2.25rem

  @media Breakpoint.LARGE
    margin-top 3rem

  @media Breakpoint.XLARGE
    margin 3rem auto 0
    width '%s' % ContentWidth.XLARGE

.chapter__content
  background white
  margin 0 auto
  
  @media Breakpoint.SMALL
    max-width PAGE_WIDTH_STACKED

  @media Breakpoint.MEDIUM
    max-width none
    width PAGE_WIDTH_STACKED

  @media Breakpoint.LARGE
    overflow hidden
    padding-bottom 50%
    position relative
    width 100%

.previews--chapter
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
