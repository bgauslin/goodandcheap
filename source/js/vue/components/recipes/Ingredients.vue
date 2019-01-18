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
     * ...
     * @param {!number} count - ...
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
@import '../../../../stylus/_config/'

.ingredients
  margin 0 0 1rem

.ingredients__list
  margin 0

.ingredients__heading
  margin 1rem 0 .5rem
  padding 0
  font_sans_heavy()
  small_caps()

.ingredients__count
  color MEDIUM_GREY
  margin-left 1em
  font_sans()

</style>
