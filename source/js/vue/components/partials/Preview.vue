<template lang="pug">
  li.preview
    router-link(
        :to="{ name: routeName, params: { slug: item.slug } }",
        :title="item.title",
      )
      thumb(
        :image="item.thumb",
        :title="item.title",
      )
      div.preview__summary
        h3 {{ item.title }}
        p.preview__recipe-count(
          v-if="item.recipeCount",
        ) {{ item.recipeCount }} Recipes
</template>

<script>
import Thumb from './Thumb.vue';

export default {
  components: { Thumb },

  props: [
    'item',
    'routeName',
  ],

  computed: {
    /** @return {number} */
    itemCount() {
      return this.index + 1;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.preview
  preview()

.preview__recipe-count
  display inline-block
  font_sans_heavy()
  margin-top .2rem
  small_caps()

.no-touch .preview
  preview_no_touch()

</style>
