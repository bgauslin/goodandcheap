<template lang="pug">
  div
    tabs(
      :tabs="tabs",
    )
    router-view(
      :previews="previews",
    )
</template>

<script>
import Tabs from './Tabs.vue';

export default {
  components: { Tabs },

  props: ['data'],

  data() {
    return {
      tabs: [
        { label: 'Recipes', name: 'chapters' },
        { label: 'Info', name: 'pages' },
      ]
    }
  },

  computed: {
    previews() {
      return (this.$route.name === 'chapters') ? this.data.chapters : this.data.pages;
    }
  }
}
</script>
