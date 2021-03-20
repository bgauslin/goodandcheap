<template lang="pug">
  .alpha-overlay
</template>

<style lang="stylus">
@import '../../../stylus/config/'

.alpha-overlay
  display none

  @media breakpoint.large
    background var(--overflow-overlay-background)
    bottom 0
    display block
    height overlay-height
    left 0
    position absolute
    right 0
    width 50%

</style>
