<template lang="pug">
  div.chapters
    ol.previews.previews--chapters
      preview(
        modifier="chapter",
        v-for="chapter in previews",
        :item="chapter",
        :to="{ name: 'chapter', params: { slug: chapter.slug } }",
      )
        p.recipe-count.recipe-count--preview {{ chapter.recipeCount }} Recipes
</template>

<script>
import Preview from './Preview.vue';

export default {
  components: { Preview },
  props: ['previews'],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.chapters
  @media Breakpoint.MEDIUM
    margin 0 var(--margin)

  @media Breakpoint.XLARGE
    margin 0 auto
    width '%s' % ContentWidth.XLARGE

.previews--chapters
  @media Breakpoint.MEDIUM
    display flex
    flex-wrap wrap

.preview--chapter
  margin -1px 0 0 -1px

  @media Breakpoint.MEDIUM
    preview_width()

  @media Breakpoint.LARGE
    preview_width('large')

@media Breakpoint.MEDIUM
  .preview__link--chapter
    border 1px solid var(--border-color)

.recipe-count--preview
  display inline-block
  margin-top .2rem

</style>
