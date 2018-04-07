<template lang="pug">
  div.error404
    h1.error404__heading {{ heading }}
    p.error404__message {{ message }}
</template>

<script>
export default {
  data () {
    return {
      heading: 'Error 404',
      message: 'The page you requested cannot be found. :(',
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.error404
  align-items center
  display flex
  flex-direction column
  justify-content center
  position_it(absolute, 0, 1rem, 0, 1rem)
  z-index -1

.error404__heading
  margin 0 0 1rem
  font_sans_heavy()
  small_caps(14)

.error404__message
  font_serif()
  text-align center

</style>
