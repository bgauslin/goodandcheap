<template lang="pug">
  button.toggle-favorite(@click="toggle(id)", :class='{ isSaved : "saved" }')
</template>


<script>
export default {
  props: ['id'],

  data () {
    return {
      isSaved: false
    }
  },

  methods: {
    toggle (id) {
      this.isSaved = !this.isSaved
      console.log('toggled id = ' + id)
      //return
    }
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.toggle-favorite
  position absolute // NOTE see .recipe and .preview for TRBL
  display block
  width 3rem
  text-align center

  &::before
    height 2rem
    line-height 2rem
    icon()

.toggle-favorite
  &::before
    content '\e80b' // heart-empty
    color light-grey

  &.saved
    &::before
      content '\e80a' // heart (filled)
      color red


.no-touch
  .toggle-favorite
    &:hover,
    &.saved:hover
      &::before
        color red

</style>
