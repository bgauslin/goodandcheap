<template lang="pug">
  ul.checklist
    li(v-for="(item, index) in items")
      a(href="#", @click.prevent="toggleItem(index)") {{ item }}
</template>

<script>
export default {
  // TODO list item as separate component

  props: ['items'],

  data () {
    return {
      checked: []
    }
  },

  methods: {
    toggleItem (index) {
      console.log('ingredient toggled for ' + index)
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.checklist
  margin 0 0 2em
  padding 0

  li
    margin 0 0 1em
    list-style none
    sans()
    font-size em(14)

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
  .checklist
    a
      link-hover(brand-color)

</style>
