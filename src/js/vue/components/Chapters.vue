<template lang="pug">
  .chapters
    ol.previews.previews--chapters
      preview(
        modifier="chapter"
        v-for="chapter in previews"
        :item="chapter"
        :key="chapter.slug"
        :to="{ name: 'chapter', params: { slug: chapter.slug } }"
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
  margin 0 auto
  max-width content-max-width
  width 100%

.previews--chapters
  @extends $previews-grid

.recipe-count--preview
  @extends $recipe-count
  display inline-block
  margin-top .2rem

</style>
