<template lang="pug">
  footer.footer(v-once)
    div
      copyright
      p.license
        a(
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/",
          rel="license",
          target="_blank"
        )
          img(
            alt="Creative Commons License",
            src="/ui/img/by-nc-sa-80x15.svg"
          )
</template>

<script>
import Copyright from '../partials/Copyright.vue'

export default {
  components: { Copyright }
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.footer
  color LIGHT_GREY
  font_sans()
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
