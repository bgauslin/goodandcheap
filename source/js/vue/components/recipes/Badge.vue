<template lang="pug">
  p.badge New
</template>

<style lang="stylus">
@import '../../../../stylus/config/';

.badge
  background '%s' % Color.ORANGE
  border-radius 2px
  color white
  display inline-block
  font_sans()
  padding .2em .75em
  small_caps()

</style>
