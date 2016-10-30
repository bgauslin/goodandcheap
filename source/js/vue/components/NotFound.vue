<template lang="pug">
  div
    h1 {{ title }}
    div
      h2 {{ errorMessage }}
      p {{ summary }}
</template>

<script>
export default {

  data () {
    return {
      title: 'Uh oh!',
      summary: 'The page you requested cannot be found. :(',
      errorMessage: 'Error 404',
    }
  },

  // TODO: refactor created and methods, make DRY
  created () {
    this.updateTitle()
  },

  methods: {
    updateTitle () {
      this.$root.$emit('update-title', this.title)
    }
  }
}
</script>

<style lang="stylus">
//@import '../../../stylus/config/'
</style>
