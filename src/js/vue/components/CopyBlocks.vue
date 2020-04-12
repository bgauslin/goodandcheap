<template lang="pug">
  div.recipe__copy
    template(
      v-for="block in content",
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
  props: {
    content: Array,
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.copy-block
  padding .5rem 0
  
.copy-block__heading
  small_caps()
  typeface('sans_bold')
  margin 0 0 .25em

.copy-block__text p
.blurb-list__item
  typeface('sans')

.copy-block__text p
  font-size em(14)

.blurb-list
  margin 0 0 1em

.blurb-list__item
  font-size em(14)
  list-style none
  margin 0 0 .5em

</style>