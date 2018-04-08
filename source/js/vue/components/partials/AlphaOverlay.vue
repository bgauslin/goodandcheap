<template lang="pug">
  div.alpha-overlay
</template>

<style lang="stylus">
@import '../../../../stylus/_config/'

.alpha-overlay
  display none

  @media BREAKPOINT_LARGE
    background linear-gradient(to bottom, rgba(WHITE, 0), WHITE)
    display block
    height 5rem
    position_it(absolute, null, 0, 0, 0)
    width 50%

</style>
