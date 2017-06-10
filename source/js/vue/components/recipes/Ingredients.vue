<template lang="pug">
  div.ingredients-list
    div.ingredients(
      v-for="(block, index) in ingredients"
    )
      h2(
        v-if="block.heading"
      ) {{ block.heading }}
        span.item-count {{ itemsLabel(block.items) }}
      checklist(
        :items="block.items",
        :listIndex="index",
        :parentId="parentId"
      )
</template>

<script>
import Checklist from './Checklist.vue'
export default {
  components: { Checklist },

  props: ['ingredients', 'parentId'],

  methods: {
    itemsLabel (count) {
      var number = count.length
      if (number > 1) {
        return number + ' Items'
      } else {
        return number + ' Item'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.ingredients-list
  margin 0 0 1rem

.ingredients
  margin 0

  h2
    margin 1rem 0 .5rem
    padding 0
    font_sans_heavy()
    small_caps()

  .item-count
    color LIGHT_GREY
    margin-left 1em
    font_sans()

</style>
