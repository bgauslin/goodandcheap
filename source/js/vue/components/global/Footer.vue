<template lang="pug">
  footer.footer(v-once)
    div
      copyright
      p.license
        a(rel="license", href="http://creativecommons.org/licenses/by-nc-sa/4.0/", target="_blank")
          img(src="/ui/img/by-nc-sa-80x15.svg", alt="Creative Commons License")
</template>

<script>
import Copyright from '../partials/Copyright.vue'

export default {
  components: { Copyright }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.footer
  color LIGHT_GREY
  sans()
  small_caps()
  text-align center

  & > div
    margin 0 auto
    padding .75rem

    @media(min-width BREAKPOINT_MEDIUM)
      padding 1.5rem

.license
  margin: .5rem 0

  img
    width auto


</style>
