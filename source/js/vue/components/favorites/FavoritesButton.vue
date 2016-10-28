<template lang="pug">
</template>



<style lang="stylus">
@import '../../../../stylus/config/'

.favorite-toggle
.remove-favorite
  position absolute // NOTE see .recipe and .preview for TRBL
  display block
  width 3rem
  text-align center

  &::before
    height 2rem
    line-height 2rem
    icon()

.favorite-toggle
  &::before
    content '\e80b' // heart-empty
    color light-grey

  &.saved
    &::before
      content '\e80a' // heart (filled)
      color red

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

  .favorite-toggle
    &:hover,
    &.saved:hover
      &::before
        color red





</style>
