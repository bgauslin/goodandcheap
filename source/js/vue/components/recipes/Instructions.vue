<template lang="pug">
  div.instructions
    div(
      v-for="block in instructions"
    )
      h2(
        v-if="block.heading"
      ) {{ block.heading }}
        span.steps-count {{ itemsLabel(block.steps) }}
      h2(
        v-else
      ) {{ itemsLabel(block.steps) }}
      ul(
        v-if="block.steps.length === 1"
      )
        li(
          v-for="step in block.steps"
        ) {{ step }}
      ol(
        v-else
      )
        li(
          v-for="step in block.steps"
        ) {{ step }}
</template>

<script>
export default {
  props: ['instructions'],

  methods: {
    itemsLabel (count) {
      var number = count.length
      if (number > 1) {
        return number + ' Steps'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.instructions
  margin 0 0 1rem

  h2
    margin 1rem 0
    padding 0
    font_sans_heavy()
    small_caps()

  .steps-count
    color LIGHT_GREY
    margin-left 1em
    font_sans()

  ul
  ol
    font-size px_to_em(15)
    margin 0
    font_sans()

  li
    margin 0 0 1em

  ol
    padding 0 0 0 1.3rem

  ul
    padding 0

    li
      list-style none

</style>
