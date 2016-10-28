<template lang="pug">
  p.badge {{ label }}
</template>

<script>
export default {
  props: ['label']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.badge
  display inline-block
  padding .2em .75em
  body-font()
  small-caps(11)
  color white
  background orange
  border-radius 2px

</style>
