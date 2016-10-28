<template lang="pug">
</template>



<style lang="stylus">
@import '../../../../stylus/config/'

.remove-favorite
  position absolute // NOTE see .recipe and .preview for TRBL
  display block
  width 3rem
  text-align center

  &::before
    height 2rem
    line-height 2rem
    icon()

.remove-favorite
  &::before
    content '\e808' // cancel-circled
    color light-grey
    font-size em(20)

  &:active
    &::before
      color dark-red

.no-touch
  .remove-favorite
    &:hover
      &::before
        color dark-red

</style>
