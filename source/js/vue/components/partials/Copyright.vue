<template lang="pug">
  p.copyright
    span.copyright__text Content © 2014–{{ currentYear }}
      a.copyright__link(
        href="http://www.leannebrown.com/",
        target="_blank",
        title="Visit LeanneBrown.com",
      ) Leanne Brown
    span.copyright__text Website © 2015–{{ currentYear }}
      a.copyright__link(
        href="http://gauslin.com/",
        target="_blank",
        title="Visit Gauslin.com",
      ) Ben Gauslin
</template>

<script>
export default {
  computed: {
    currentYear () {
      const fullYear = new Date().getFullYear();
      const shortYear = fullYear.toString().substr(2,2);
      return shortYear;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.copyright
  font-size px_to_em(13)

.copyright__text
  display block

  @media(min-width BREAKPOINT_SMALL)
    display inline

    &:not(:last-child)::after
      content '·'
      display inline-block
      text-align center
      width 1.5rem

.copyright__link
  display inline-block
  padding .25rem 0 .25rem .5em

</style>
