<template lang="pug">
  .error404
    h1.error404__heading {{ heading }}
    p.error404__message {{ message }}
</template>

<script>
export default {
  data() {
    return {
      heading: 'Error 404',
      message: 'The page you requested cannot be found. :(',
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.error404
  align-items center
  bottom 0
  display flex
  flex-direction column
  justify-content center
  left 1rem
  position absolute
  right 1rem
  top 0
  z-index -1

.error404__heading
  small_caps(14)
  typeface('sans_bold')
  margin 0 0 1rem

.error404__message
  typeface('serif')
  text-align center

</style>
