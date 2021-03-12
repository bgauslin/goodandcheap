<template lang="pug">
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
