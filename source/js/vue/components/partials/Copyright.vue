<template lang="pug">
  p.copyright
    span.copyright__text Content © 2014–{{ currentYear }}
      a.copyright__link(
        href="http://www.leannebrown.com/",
        rel="noopener",
        target="_blank",
        title="Visit LeanneBrown.com",
      ) Leanne Brown
    span.copyright__text Website © 2015–{{ currentYear }}
      a.copyright__link(
        href="http://gauslin.com/",
        rel="noopener",
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

.copyright__text
  display block

  @media BREAKPOINT_SMALL
    display inline

.copyright__text:not(:last-child)::after
  @media BREAKPOINT_SMALL
    content '·'
    display inline-block
    text-align center
    width 1.5rem

.copyright__link
  display inline-block
  padding .25rem 0 .25rem .5em

</style>
