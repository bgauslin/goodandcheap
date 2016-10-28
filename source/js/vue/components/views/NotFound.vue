<template lang="pug">
</template>

<script>
export default {

  data () {
    return {
      title: 'Uh oh!',
      summary: 'That page cannot be found. :(',
      errorMessage: '404',
    }
  },

  // TODO: refactor created and methods, make DRY
  created () {
    this.updateTitle()
    this.updateMetaDescription()
  },

  methods: {
    updateTitle () {
      this.$root.$emit('update-title', this.title)
    },
    updateMetaDescription () {
      this.$root.$emit('update-meta-description', this.summary)
    }
  }
}
</script>

<style lang="stylus">
//@import '../../../../stylus/_config/'
</style>
