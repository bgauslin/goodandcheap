<template lang="pug">
  div.blurb(v-html="blurb")
</template>

<script>
export default {
  props: ['blurb']
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.blurb
  p
    font_serif()
    margin 0 0 1em

  a
    background rgba(BRAND_COLOR, .1)
    border-radius 2px
    padding .1em .4em

.no-touch
  .blurb
    a:hover
      background BRAND_COLOR
      color WHITE

</style>
