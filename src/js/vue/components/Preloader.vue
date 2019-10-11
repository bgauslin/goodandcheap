<template lang="pug">
  div.preloader
</template>

<script>
import Spinner from 'spin';

export default {
  data() {
    return {
      spinnerOptions: {
        lines: 12,
        length: 8,
        width: 3,
        radius: 8,
      }
    }
  },

  mounted() {
    this.attachSpinner()
  },

  methods: {
    /** Attaches a preloader spinner to the DOM. */
    attachSpinner() {
      let spinner = new Spinner(this.spinnerOptions).spin();
      this.$el.appendChild(spinner.el);
    },
  },
}
</script>

<style lang="stylus">
.preloader
  height 100vh
  left 0
  position fixed
  right 0
  top 0

.preloader .spinner
  left 50%
  top 50%

</style>
