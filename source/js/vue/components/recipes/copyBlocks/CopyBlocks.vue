<template lang="pug">
  div
    template(v-for="block in data")
      blurb-with-heading(
        v-if="block.type === 'blurbWithHeading'",
        :heading="block.heading",
        :blurb="block.blurb"
      )
      div.blurb(
        v-if="block.type === 'blurb'",
        v-html="block.blurb",
      )
      list(
        v-if="block.type === 'list'",
        :list="block.list"
      )
</template>

<script>
// TODO: consolidate all copyBlocks components

import BlurbWithHeading from './BlurbWithHeading.vue'
import List from './List.vue'

export default {
  components: { 
    BlurbWithHeading,
    List,
  },

  props: [
    'data'
  ]
}
</script>
