<template lang="pug">
  div
    div.copy-block(
      v-if="data.type === 'blurbWithHeading'",
    )
      h4.copy-block__heading {{ data.heading }}
      div.copy-block__text(
        v-html="data.blurb",
      )

    div.blurb(
      v-if="data.type === 'blurb'",
      v-html="data.blurb",
    )

    ul.blurb-list(
      v-if="data.type === 'list'",
    )
      li.blurb-list__item(
        v-for="item in data.list",
      ) {{ item }}

</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.copy-block
  padding .5rem 0
  
.copy-block__heading
  font_sans_heavy()
  margin 0 0 .25em
  small_caps()

.copy-block__text
  p
    font_sans()
    font-size px_to_em(14)

.blurb-list
  margin 0 0 1em

.blurb-list__item
  font_sans()
  font-size px_to_em(14)
  list-style none
  margin 0 0 .5em

</style>