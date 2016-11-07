<template lang="pug">
  div.blurb(v-html="blurb")
</template>

<script>
export default {
  props: ['blurb']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.blurb
  p
    margin 0 0 1em
    serif()

  a
    background rgba(brand-color, .1)
    padding .1em .4em
    border-radius 2px


.no-touch
  .blurb
    a:hover
      color white
      background brand-color

</style>
