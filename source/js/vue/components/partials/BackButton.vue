<template lang="pug">
  a.back-button(@click="goBack", href="#", title="Back", :class="{ hide: isHome }")
</template>

<script>
export default {

  data () {
    return {
      isHome: false
    }
  },

  mounted () {
    this.onHome()
  },

  watch: {
    '$route' (to, from) {
      this.onHome()
    }
  },

  methods: {
    goBack () {
      window.history.back()
    },
    onHome () {
      var where = this.$route.path
      console.log('where = ' + where)
      this.isHome = (where === '/') ? true : false
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.back-button
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
