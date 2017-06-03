<template lang="pug">
  p.copyright
    span Content © 2014–{{ currentYear }}
      a(href="http://www.leannebrown.com/" title="Visit LeanneBrown.com" target="_blank") Leanne Brown
    span Website © 2015–{{ currentYear }}
      a(href="http://gauslin.com/" title="Visit Gauslin.com" target="_blank") Ben Gauslin
</template>

<script>
export default {
  computed: {
    currentYear () {
      var fullYear = new Date().getFullYear()
      var shortYear = fullYear.toString().substr(2,2)
      return shortYear
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

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
