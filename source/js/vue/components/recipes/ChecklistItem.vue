<template lang="pug">
  li.item
    a(href="#", @click.prevent="toggleItem(index)", :class="{ 'saved' : checked }") {{ item }}
</template>

<script>
export default {
  props: ['item', 'index'],

  data () {
    return {
      checked: false
    }
  },

  methods: {
    toggleItem (index) {
      this.checked = !this.checked
      //console.log('ingredient toggled for ' + index)
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.item
  margin 0 0 1em

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
  .item
    a
      link-hover(brand-color)

</style>
