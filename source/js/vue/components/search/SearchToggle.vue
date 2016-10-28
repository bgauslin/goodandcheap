<template lang="pug">
  button.search-toggle
</template>


<script>
export default {

}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.search-toggle
  display flex
  justify-content center
  align-items center
  align-self stretch

  width header-height-base
  line-height 1
  color white

  &:active
    color rgba(white, .7)

  &::before
    icon()
    font-size em(16)
    content '\e804' // search
    position relative
    top -.1em

  &.open
    &::before
      content '\e809' // cancel

.no-touch
  .search-toggle
    &:hover,
    &:visited:hover
      color rgba(white, .7)

</style>
