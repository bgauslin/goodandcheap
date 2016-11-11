<template lang="pug">
  div.error404
    h1 {{ title }}
    p {{ message }}
</template>

<script>
export default {
  data () {
    return {
      title: 'Error 404',
      message: 'The page you requested cannot be found. :('
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.error404
  position-it(absolute, 0, 1rem, 0, 1rem)
  z-index -1
  display flex
  flex-direction column
  justify-content center
  align-items center

  h1
    margin 0 0 1rem
    sans-heavy()
    small-caps(14)

  p
    serif()
    text-align center

</style>
