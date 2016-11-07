<template lang="pug">
  li.preview
    router-link(
        :to="{ name: routeName, params: { slug: item.slug } }",
        :title="item.title"
      )
      thumb(
        :image="item.thumb",
        :title="item.title"
      )
      div.summary
        h3 {{ item.title }}
        p.recipe-count(v-if="item.recipeCount") {{ item.recipeCount }} Recipes
</template>

<script>
import Thumb from './Thumb.vue'

export default {
  components: { Thumb },

  props: ['item', 'routeName'],

  computed: {
    itemCount () {
      return this.index + 1
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.preview
  preview()

  .recipe-count
    sans-heavy()
    small-caps()
    display inline-block
    margin-top .2rem

.no-touch
  .preview
    preview-no-touch()

</style>
