<template lang="pug">
  p.copyright
    | © 2014–{{ currentYear }}
    a(
      href="http://www.leannebrown.com/"
      title="Visit LeanneBrown.com"
      rel="noopener"
      target="_blank"
    ) Leanne Brown
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

.copyright
  small_caps(11)
  typeface('sans')
  color var(--text-2-color)

.copyright > a
  margin-left rem(4)

.copyright--page
  margin 1rem 0

  @media breakpoint.large
    margin-top 3rem

.copyright--home
.copyright--chapter
  margin auto auto 0
  padding rem(40)
  text-align center

.copyright--recipe
  margin 3rem 0 1rem

</style>
