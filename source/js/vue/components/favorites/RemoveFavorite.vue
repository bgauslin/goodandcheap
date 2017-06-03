<template lang="pug">
  button.remove-favorite(@click="removeItem(favorite)")
</template>

<script>
export default {
  props: ['favorite'],

  methods: {
    removeItem (favorite) {
      this.$store.commit('removeFavorite', favorite)
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.remove-favorite
  display block
  padding .5rem
  position absolute // NOTE see .recipe and .preview for TRBL
  text-align center
  width 3rem

  &::before
    height 2rem
    icon()
    line-height 2rem

.remove-favorite
  &::before
    color LIGHT_GREY
    content ICON_CANCEL_CIRCLED
    font-size px_to_em(20)

  &:active
    &::before
      color DARK_RED

.no-touch
  .remove-favorite
    &:hover
      &::before
        color DARK_RED

</style>
