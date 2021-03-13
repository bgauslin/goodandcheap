<template lang="pug">
  .home
    tabs(
      :tabs="tabs"
      modifier="home"
    )
    router-view(
      :previews="previews"
    )
    copyright.copyright--home
</template>

<script>
import Copyright from './Copyright.vue';
import Tabs from './Tabs.vue';

export default {
  components: {
    Copyright,
    Tabs,
  },

  props: {
    content: {
      chapters: Array,
      pages: Array,
    }
  },

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
      return (this.$route.name === 'chapters') ? this.content.chapters : this.content.pages;
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.home
  margin 0 auto
  width 100%

.tabs.tabs--home
  @media breakpoint.small
    margin 1rem auto
    width content-width-small

  @media breakpoint.medium
    margin 1.5rem auto

</style>