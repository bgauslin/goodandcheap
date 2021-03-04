<template lang="pug">
  footer.footer(
    v-once,
  )
    .footer__content
      copyright
      p.license
        a.license__link(
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/",
          rel="license noopener",
          target="_blank",
        )
          img.license__image(
            alt="Creative Commons License",
            src="/img/by-nc-sa-80x15.svg",
          )
</template>

<script>
import Copyright from './Copyright.vue';

export default {
  components: { Copyright },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.footer
  typeface('sans')
  color var(--text-2-color)
  font-size em(12)
  grid-row 3
  padding 0 0 env(safe-area-inset-bottom)
  text-align center

.footer__content
  margin 0 auto
  padding .75rem

  @media breakpoint.medium
    padding 1.5rem

.license
  margin: .5rem 0

.license__image
  width auto

</style>
