<template lang="pug">
  div.ingredients-list
    div.ingredients(v-for="block in ingredients")
      h4 {{ block.heading }}
        span.item-count {{ block.items.length }} {{ itemsLabel(block.items) }}
      ul
        li(v-for="item in block.items") {{ item }}
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
  margin 0 1rem
  padding 1rem 0 0
  border-top 1px solid border-color

  &.tabbed
    padding-top 0
    border none

.ingredients
  margin 0

  h4
    padding .5em 0
  ul
    padding 0 0 1em
  li
    margin 0 0 1em
    list-style none
    body-font()
    font-size em(14)

.item-count
  body-font()
  margin-left 1em
  color light-grey

a.checklist
  display block
  padding-left 2em

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

  &:link,
  &:visited
    color dark-grey

  &:active
    color brand-color

  &.saved
    &::before
      content '\e807' // ok-circled
      color green

.no-touch
  a.checklist
    &:hover,
    &:visited:hover
      color brand-color

</style>
