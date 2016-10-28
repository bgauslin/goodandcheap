<template lang="pug">
</template>



<style lang="stylus">
@import '../../../../stylus/config/'

.favorites-counter
  position absolute
  top 0
  right 0
  body-font()
  font-size em(11)

  a
    display inline-block
    height header-height
    line-height header-height
    padding 0 1rem

    &::after
      margin-left .25em
      icon()
      content '\e80b' // heart-empty
      font-size 1rem

    &.current::after
      content '\e80a' // heart

  &.updated
    animation bounce 500ms ease



</style>
