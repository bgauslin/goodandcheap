<template lang="pug">
  div.chapters
    ol.previews.previews--chapters
      preview(
        modifier="chapter",
        v-for="chapter in previews",
        :item="chapter",
        :key="chapter.slug",
        :to="{ name: 'chapter', params: { slug: chapter.slug } }",
      )
        p.recipe-count.recipe-count--preview {{ chapter.recipeCount }} Recipes
</template>

<script>
import Preview from './Preview.vue';

export default {
  components: { Preview },

  props: {
    previews: Array,
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.chapters
  @media breakpoint.medium
    margin 0 var(--margin)

  @media breakpoint.xlarge
    margin 0 auto
    width content-width-xlarge

@media breakpoint.medium
  .previews--chapters
    display grid
    grid-template-columns repeat(var(--columns), 1fr)

.preview--chapter
  margin -1px 0 0 -1px

@media breakpoint.medium
  .preview__link--chapter
    border 1px solid var(--border-color)

.recipe-count--preview
  display inline-block
  margin-top .2rem

</style>
