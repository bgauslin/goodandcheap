<template lang="pug">
  div.preloader
</template>

<script>
import Spinner from 'spin'
export default {

  data () {
    return {
      spinnerOptions: {
        lines: 12,
        length: 8,
        width: 3,
        radius: 8
      }
    }
  },

  mounted () {
    this.attachSpinner()
  },

  methods: {
    attachSpinner () {
      let spinner = new Spinner(this.spinnerOptions).spin()
      this.$el.appendChild(spinner.el)
    }
  }
}
</script>

<style lang="stylus">
.preloader
  position fixed
  top 0
  left 0
  right 0
  height 100vh

  .spinner
    top 50%
    left 50%

</style>
