<template lang="pug">
  p.badge New
</template>

<style lang="stylus">
@import '../../../stylus/config/';

.badge
  background var(--badge-color)
  border-radius 2px
  color white
  display inline-block
  padding .2em .75em
  small_caps()
  typeface('sans')

</style>
