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
    sans_heavy()
    small_caps()

  p
    font-size px_to_em(14)
    sans()

</style>
