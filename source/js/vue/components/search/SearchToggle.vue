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
  display block
  width 2rem
  text-align center
  color white

  &:active
    color rgba(white, .7)

  &::before
    icon()
    font-size em(16)
    content '\e804' // search

  &.open
    &::before
      content '\e809' // cancel

.no-touch
  .search-toggle
    &:hover
    &:visited:hover
      color rgba(white, .7)

</style>
