<template lang="pug">
</template>



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
