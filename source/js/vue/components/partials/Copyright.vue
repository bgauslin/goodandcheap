<template lang="pug">
  p.copyright
    span Content © 2014–{{ currentYear }}
      a(
        href="http://www.leannebrown.com/",
        target="_blank",
        title="Visit LeanneBrown.com",
      ) Leanne Brown
    span Website © 2015–{{ currentYear }}
      a(
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

  span
    display block

    a
      display inline-block
      padding .25rem 0 .25rem .5em

    @media(min-width BREAKPOINT_SMALL)
      display inline

      &:last-child
        &::before
          content '·'
          display inline-block
          text-align center
          width 1.5rem

</style>
