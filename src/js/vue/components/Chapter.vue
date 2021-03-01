<template lang="pug">
  div.chapter
    div.chapter__content
      div.chapter__intro
        cover(
          :blurb="content.blurb",
          :count="content.recipeCount + ' Recipes'",
          :image="content.photo",
          :title="content.title",
          displayTitle="yes",
          modifier="chapter",
        )
      ol.previews.previews--chapter
        recipe-preview(
          v-for="(recipe, index) in content.recipes",
          :index="index",
          :item="recipe",
          :key="recipe.slug",
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

  props: {
    content: {
      blurb: String,
      photo: Object,
      recipeCount: Number,
      recipes: Array,
      title: String,
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.chapter
  @media breakpoint.small
    margin 1.5rem var(--margin) 0

  @media breakpoint.medium
    margin-top 2.25rem

  @media breakpoint.large
    margin-top 3rem

  @media breakpoint.xlarge
    margin 3rem auto 0
    width content-width-xlarge

.chapter__content
  background white
  margin 0 auto
  
  @media breakpoint.small
    max-width PAGE_WIDTH_STACKED

  @media breakpoint.medium
    max-width none
    width PAGE_WIDTH_STACKED

  @media breakpoint.large
    overflow hidden
    padding-bottom 50%
    position relative
    width 100%

.previews--chapter
  @media breakpoint.large
    height 100%
    overflow-y scroll
    -webkit-overflow-scrolling touch
    position absolute
    right 0
    top 0
    width 50%

.chapter__intro
  overflow hidden

  @media breakpoint.large
    position absolute
    width 50%

</style>
