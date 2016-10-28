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
  body-font()
  small-caps(10)
  text-align center
  color light-grey

  & > div
    margin 0 auto
    padding 1rem

.copyright
  span
    display block
    padding .5rem 0

    @media(min-width breakpoint-large)
      display inline

      &:last-child
        &::before
          content ' · '


.license
  padding 1rem 0 .5rem
  img
    width auto


</style>
