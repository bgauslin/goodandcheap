<template lang="pug">
  .ingredients
    template(
      v-for="(block, index) in content"
    )
      h2.ingredients__heading(
        v-if="block.heading"
      ) {{ block.heading }}
        span.ingredients__count {{ itemsLabel(block.items) }}
      checklist(
        :items="block.items"
        :listIndex="index"
        :parentId="parentId"
      )
</template>

<script>
import Checklist from './Checklist.vue'
export default {
  components: {
    Checklist,
  },

  props: {
    content: Array,
    parentId: Number,
  },

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
  margin 0 var(--recipe-padding-x)

.ingredients__heading
  small_caps()
  typeface('sans_bold')
  margin 1rem 0 .5rem
  padding 0

.ingredients__count
  typeface('sans')
  color var(--text-2-color)
  margin-left 1em

</style>
