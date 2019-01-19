<template lang="pug">
  div.alpha-overlay
</template>

<style lang="stylus">
@import '../../../../stylus/config/'

.alpha-overlay
  display none

  @media Breakpoint.LARGE
    background linear-gradient(to bottom, rgba(white, 0), white)
    display block
    height 5rem
    position_it(absolute, null, 0, 0, 0)
    width 50%

</style>
