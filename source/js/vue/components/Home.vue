<template lang="pug">
  div
    tabs(
      :tabs="tabs",
    )
    router-view(
      :chapters="data.chapters",
      :pages="data.pages",
    )
</template>

<script>
import Tabs from './partials/Tabs.vue';

export default {
  components: { Tabs },

  props: ['data'],

  data () {
    return {
      tabs: [
        { label: 'Recipes', name: 'chapters' },
        { label: 'Info', name: 'pages' },
      ]
    }
  },
}
</script>
