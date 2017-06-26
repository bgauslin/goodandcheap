<template lang="pug">
  div.copy-block
    h4 {{ heading }}
    div(v-html="blurb")
</template>

<script>
export default {
  props: ['blurb', 'heading']
}
</script>

<style lang="stylus">
@import '../../../../../stylus/_config/'

.copy-block
  padding .5rem 0

  h4
    font_sans_heavy()
    margin 0 0 .25em
    small_caps()

  p
    font_sans()
    font-size px_to_em(14)

</style>
