<template lang="pug">
  div
    tabs(:tabs="tabs")
    router-view
</template>

<script>
import Tabs from '../partials/Tabs.vue'
export default {
  components: { Tabs },
  data () {
    return {
      tabs: [
        { label: 'Recipes', name: 'chapters' },
        { label: 'Info', name: 'pages' }
      ]
    }
  }
}
</script>
