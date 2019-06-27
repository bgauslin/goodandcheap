<template lang="pug">
  div
    tabs(
      :tabs="tabs",
      modifier="home",
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
        {
          label: 'Recipes',
          route: { name: 'chapters' },
        },
        {
          label: 'Info',
          route: { name: 'pages' }
        },
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

<style lang="stylus">
@import '../../../stylus/config/'

.tabs.tabs--home
  @media Breakpoint.SMALL
    margin 1rem auto
    width '%s' % ContentWidth.SMALL

  @media Breakpoint.MEDIUM
    margin 1.5rem auto

</style>