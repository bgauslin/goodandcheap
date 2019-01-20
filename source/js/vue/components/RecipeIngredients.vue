<template lang="pug">
  div.ingredients
    div.ingredients__list(
      v-for="(block, index) in ingredients",
    )
      h2.ingredients__heading(
        v-if="block.heading",
      ) {{ block.heading }}
        span.ingredients__count {{ itemsLabel(block.items) }}
      checklist(
        :items="block.items",
        :listIndex="index",
        :parentId="parentId",
      )
</template>

<script>
import Checklist from './Checklist.vue'
export default {
  components: {
    Checklist,
  },

  props: [
    'ingredients',
    'parentId',
  ],

  methods: {
    /**
     * Renders a label as singular or plural depending on the number of
     * ingredients in the recipe.
     * @param {!number} count
     * @return {string}
     */
    itemsLabel(count) {
      const number = count.length;
      let label = 'Item';

      if (number > 1) {
        label += 's';
      }

      return `${number} ${label}`;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.ingredients
  margin 0 0 1rem

.ingredients__list
  margin 0

.ingredients__heading
  margin 1rem 0 .5rem
  padding 0
  small_caps()
  typeface('sans_bold')

.ingredients__count
  color '%s' % Color.MEDIUM_GREY
  margin-left 1em
  typeface('sans')

</style>
