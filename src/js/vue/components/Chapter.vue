<template lang="pug">
  .chapter
    .chapter__content
      .chapter__intro
        cover(
          :blurb="content.blurb"
          :count="content.recipeCount + ' Recipes'"
          :image="content.photo"
          :title="content.title"
          displayTitle="yes"
          modifier="chapter"
        )
      .previews.previews--chapter
        ol
          recipe-preview(
            v-for="(recipe, index) in content.recipes"
            :index="index"
            :item="recipe"
            :key="recipe.slug"
            :showBadge="true"
            :showChapter="false"
            favoriteButton="toggle"
          )
        copyright.copyright--chapter
</template>

<script>
import Copyright from './Copyright.vue';
import Cover from './Cover.vue';
import RecipePreview from './RecipePreview.vue';

export default {
  components: {
    Copyright,
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
  @extends $content-layout-parent

.chapter__content
  @extends $content-layout-child

.chapter__intro
  overflow hidden

  @media breakpoint.large
    position absolute
    width 50%

.previews--chapter
  @media breakpoint.large
    display flex
    flex-direction column
    height 100%
    overflow-y scroll
    -webkit-overflow-scrolling touch
    position absolute
    right 0
    top 0
    width 50%

</style>
