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
//@import '../../../../stylus/config/'

.copyright
  a
    &::before
      content: ' '


</style>
