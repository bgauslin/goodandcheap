<template lang="pug">
  div.instructions
    div(v-for="block in instructions")
      h2(v-if="block.heading") {{ block.heading }}
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
  margin 0 0 1rem

  h2
    padding .5em 0
    sans-heavy()
    //small-caps()

  ol
    margin 0
    padding 0 0 0 1rem
    sans()
    font-size em(14)

    li
      margin 0 0 1em
      list-style decimal outside


</style>
