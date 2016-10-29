<template lang="pug">
  div.alpha-overlay(v-if="isVisible")
</template>


<script>
export default {
  props: ['isVisible']
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.alpha-overlay
  position-it(absolute, null, 0, 0, 0)
  //width 50%
  height 4rem
  background linear-gradient(to bottom, rgba(white, 0), white)

</style>
