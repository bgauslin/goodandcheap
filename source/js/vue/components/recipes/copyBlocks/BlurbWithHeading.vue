<template lang="pug">
  div.copy-block
    h4 {{ heading }}
    div(v-html="blurb")
</template>


<script>
export default {
  props: ['heading', 'blurb']
}
</script>


<style lang="stylus">
@import '../../../../../stylus/config/'

.copy-block
  padding .5rem 0

  h4
    margin 0 0 .25em
    sans-heavy()
    small-caps()
  p
    sans()
    font-size em(14)

</style>
