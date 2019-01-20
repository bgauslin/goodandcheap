<template lang="pug">
  div.instructions
    div(
      v-for="block in instructions",
    )
      h2.instructions__heading(
        v-if="block.heading",
      ) {{ block.heading }}
        span.instructions__steps {{ itemsLabel(block.steps) }}

      h2.instructions__heading(
        v-else
      ) {{ itemsLabel(block.steps) }}

      ul.instructions__list(
        v-if="block.steps.length === 1",
      )
        li.instructions__item(
          v-for="step in block.steps",
        ) {{ step }}

      ol.instructions__list(
        v-else
      )
        li.instructions__item(
          v-for="step in block.steps",
        ) {{ step }}
</template>

<script>
export default {
  props: ['instructions'],

  methods: {
    /**
     * ...
     * @param {!number} count - ...
     * @return {string}
     */
    itemsLabel(count) {
      const number = count.length;
      if (number > 1) {
        return `${number} Steps`;
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.instructions
  margin 0 0 1rem

.instructions__heading
  margin 1rem 0
  padding 0
  small_caps()
  typeface('sans_bold')

.instructions__steps
  color '%s' % Color.MEDIUM_GREY
  margin-left 1em
  typeface('sans')

.instructions__list
  font-size px_to_em(15)
  margin 0
  padding 0
  typeface('sans')

ol.instructions__list
  padding 0 0 0 1.3rem

ul .instructions__item
  list-style none

.instructions__item
  margin 0 0 1em

</style>
