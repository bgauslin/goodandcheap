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
        {
          label: 'Recipes',
          routeName: 'chapters'
        },
        {
          label: 'Info',
          routeName: 'pages'
        }
      ]
    }
  }
}
</script>
