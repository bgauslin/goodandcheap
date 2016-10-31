<template lang="pug">
  div
    blurb(
      v-if="block.type === 'blurb'",
      :blurb="block.blurb"
    )
    list(
      v-if="block.type === 'list'",
      :list="block.list"
    )
    blurb-with-heading(
      v-if="block.type === 'blurbWithHeading'",
      :heading="block.heading",
      :blurb="block.blurb"
    )
</template>


<script>
import Blurb from './Blurb.vue'
import List from './List.vue'
import BlurbWithHeading from './BlurbWithHeading.vue'

export default {
  props: ['block'],
  components: { Blurb, List, BlurbWithHeading }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.copy-block
  padding .5rem 0

  h4
    margin-bottom .25em
  p
    sans()

</style>
