<template lang="pug">
  div.alpha-overlay
</template>

<style lang="stylus">
@import '../../../stylus/config/'

.alpha-overlay
  display none

  @media Breakpoint.LARGE
    background linear-gradient(to bottom, rgba(white, 0), white)
    bottom 0
    display block
    height 5rem
    left 0
    position absolute
    right 0
    width 50%

</style>
