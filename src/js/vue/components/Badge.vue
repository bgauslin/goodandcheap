<template lang="pug">
  p.badge New
</template>

<style lang="stylus">
@import '../../../stylus/config/';

.badge
  small_caps()
  typeface('sans')
  background var(--badge-color)
  border-radius 2px
  color black
  display inline-block
  padding .2em .75em

</style>
