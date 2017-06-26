<template lang="pug">
  div
    template(v-for="block in data")
      blurb-with-heading(
        v-if="block.type === 'blurbWithHeading'",
        :heading="block.heading",
        :blurb="block.blurb"
      )
      blurb(
        v-if="block.type === 'blurb'",
        :blurb="block.blurb"
      )
      list(
        v-if="block.type === 'list'",
        :list="block.list"
      )
</template>

<script>
import Blurb from '../Blurb.vue'
import BlurbWithHeading from './BlurbWithHeading.vue'
import List from './List.vue'

export default {
  components: { Blurb, BlurbWithHeading, List },
  props: ['data']
}
</script>
