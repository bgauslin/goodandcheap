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
  font_sans_heavy()
  margin 1rem 0 .5rem
  padding 0
  small_caps()

.ingredients__count
  color '%s' % Color.MEDIUM_GREY
  font_sans()
  margin-left 1em

</style>
