<template lang="pug">
  div
    template(
      v-for="block in data",
    )
      div.copy-block(
        v-if="block.type === 'blurbWithHeading'",
      )
        h4.copy-block__heading {{ block.heading }}
        div.copy-block__text(
          v-html="block.blurb",
        )

      div.blurb(
        v-if="block.type === 'blurb'",
        v-html="block.blurb",
      )

      ul.blurb-list(
        v-if="block.type === 'list'",
      )
        li.blurb-list__item(
          v-for="item in block.list",
        ) {{ item }}
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.copy-block
  padding .5rem 0
  
.copy-block__heading
  margin 0 0 .25em
  small_caps()
  typeface('sans_bold')

.copy-block__text p
  font-size px_to_em(14)
  typeface('sans')

.blurb-list
  margin 0 0 1em

.blurb-list__item
  font-size px_to_em(14)
  list-style none
  margin 0 0 .5em
  typeface('sans')

</style>