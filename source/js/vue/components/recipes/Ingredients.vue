<template lang="pug">
  div.ingredients-list
    div.ingredients(v-for="block in ingredients")
      h2 {{ block.heading }}
        span.item-count {{ block.items.length }} {{ itemsLabel(block.items) }}
      ul
        li(v-for="item in block.items")
          a {{ item }}
</template>

<script>
export default {
  props: ['ingredients'],

  methods: {
    itemsLabel (count) {
      if (count.length > 1) {
        return 'Items'
      } else {
        return 'Item'
      }
    }

  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.ingredients-list
  margin 0 0 1rem

.ingredients
  margin 0

  h2
    margin 1rem 0
    padding 0
    sans-heavy()
    small-caps(12)

  ul
    margin 0 0 2em
    padding 0

  li
    margin 0 0 1em
    list-style none
    sans()
    font-size em(14)

  .item-count
    sans()
    margin-left 1em
    color light-grey

  a
    display block
    padding-left 2em
    link(dark-grey, dark-grey, brand-color)

    &::before
      display inline-block
      width 1.3em
      margin-left -1.3em
      icon()
      content '\e806' // circle-empty
      font-size em(22)
      color lighter-grey
      vertical-align baseline
      position relative
      top .15em

    &.saved
      &::before
        content '\e807' // ok-circled
        color green

.no-touch
  .ingredients
    a
      link-hover(brand-color)

</style>
