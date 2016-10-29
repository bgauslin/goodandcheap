<template lang="pug">
  div.instructions
    div(v-for="block in instructions")
      h4(v-if="block.heading") {{ block.heading }}
        span.item-count(v-if="block.steps > 1") {{ block.steps }} Steps
      ol
        li(v-for="step in block.steps") {{ step }}
</template>


<script>
export default {
  props: ['instructions']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.instructions
  margin 0 1rem
  padding 1rem 0
  border-top 1px solid border-color

  h4
    padding .5em 0

  ol
  ul
    margin 0
    sans()
    font-size em(14)

  ol
    padding 0 0 0 1.3rem

  ul
    li
      list-style none

  li
    margin 0 0 1em

  &.tabbed
    padding-top 0
    border none

</style>
