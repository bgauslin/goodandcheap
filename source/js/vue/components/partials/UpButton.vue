<template lang="pug">
  router-link.up-button(:to="{ parent }", title="Back", :class="{ hide: isHome }")
</template>

<script>
export default {

  data () {
    return {
      isHome: false,
      parent: null
    }
  },

  mounted () {
    this.onHome()
  },

  methods: {
    onHome () {
      var path = this.$route.path
      this.isHome = (path === '/') ? true : false
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.up-button
  display flex
  justify-content center
  align-items center
  align-self stretch

  width header-height-base
  line-height 1

  link(white, white, rgba(white, .7))

  @media(min-width breakpoint-small)
    margin-left -1rem

  &::before
    icon()
    font-size em(22)
    content '\e802' // angle-left
    margin-left -.5rem

    @media(min-width breakpoint-small)
      margin-left 0

  &.hide
    visibility hidden

.no-touch
  .back-button
    link-hover(rgba(white, .7))

</style>
