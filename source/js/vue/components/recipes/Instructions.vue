<template lang="pug">
  div.instructions
    div(v-for="block in instructions")
      h2(v-if="block.heading") {{ block.heading }}
        span.item-count {{ itemsLabel(block.steps) }}
      h2(v-else) {{ itemsLabel(block.steps) }}
      ol
        li(v-for="step in block.steps") {{ step }}
</template>


<script>
export default {
  props: ['instructions'],

  methods: {
    itemsLabel (count) {
      var number = count.length
      if (number > 1) {
        return number + ' Steps'
      } else {
        return number + ' Step'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.instructions
  margin 0 0 1rem

  h2
    margin 1rem 0
    padding 0
    sans-heavy()
    small-caps(12)

  ol
    margin 0
    padding 0 0 0 1.1rem
    sans()
    font-size em(15)

    li
      margin 0 0 1em
      padding-left .5em
      list-style decimal outside


</style>
