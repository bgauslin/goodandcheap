<template lang="pug">
  div
    div.copy-block(
      v-if="data.type === 'blurbWithHeading'",
    )
      h4 {{ data.heading }}
      div(
        v-html="data.blurb",
      )

    div.blurb(
      v-if="data.type === 'blurb'",
      v-html="data.blurb",
    )

    ul.blurb-list(
      v-if="data.type === 'list'",
    )
      li(
        v-for="item in data.list",
      ) {{ item }}

</template>

<script>
export default {
  props: ['data']
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

.blurb-list
  margin 0 0 1em

  li
    font_sans()
    font-size px_to_em(14)
    list-style none
    margin 0 0 .5em

</style>