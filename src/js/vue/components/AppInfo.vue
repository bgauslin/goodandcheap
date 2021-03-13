<template lang="pug">
  .app-info
    button.app-info__toggle
    .app-info__panel
      p.copyright
        span.copyright__text Content © 2014–{{ currentYear }}
          a.copyright__link(
            href="http://www.leannebrown.com/"
            title="Visit LeanneBrown.com"
          ) Leanne Brown
        span.copyright__text Website © 2015–{{ currentYear }}
          a.copyright__link(
            href="http://gauslin.com/"
            title="Visit Gauslin.com"
          ) Ben Gauslin
      p.license
        a.license__link(
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          rel="license"
        )
          img.license__image(
            alt="Creative Commons License"
            src="/img/by-nc-sa-80x15.svg"
          )
</template>

<script>
export default {
  computed: {
    /** @return {string} */
    currentYear() {
      const fullYear = new Date().getFullYear();
      return fullYear.toString().substr(2, 2);
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.app-info
  typeface('sans')
  font-size em(12)
  grid-area info

.app-info__toggle
  typeface('sans')
  align-items center
  // background pink
  border-radius 50%
  color var(--header-color)
  display flex
  font-size em(12)
  grid-area info
  height controls-size
  justify-content center
  width controls-size

.app-info__toggle::after
  icon(icon-user)
  font-size rem(16)

.app-info__toggle:active
  transform scale(.9)
  transition .3s ease

.app-info__panel
  display none

.license
  margin: .5rem 0

.license__image
  width auto

.copyright__text
  display block

  @media breakpoint.small
    display inline

.copyright__text:not(:last-child)::after
  @media breakpoint.small
    content '·'
    display inline-block
    text-align center
    width 1.5rem

.copyright__link
  display inline-block
  padding .25rem 0 .25rem .5em

</style>
