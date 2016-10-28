<template lang="pug">
  div.instructions list(id="steps")
    h3 Steps
    div(v-for="steps in instructions.stpes")
      h4(v-if="heading") {{ heading }}
        span.item-count(v-if="steps > 1") {{ steps }} Step/s
      ol(v-if="steps")
      ul(v-else)
        li(v-for="step in steps") {{ step }}
</template>


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
    body-font()
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
