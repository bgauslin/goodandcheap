<template lang="pug">
  div.up-button(:class="{ hide: isHome }")
    router-link(
      v-if="parent && parent.slug",
      :to="{ name: parent.routeName, params: { slug: parent.slug } }",
      :title="parent.title"
    )
    router-link(
      v-if="parent && !parent.slug",
      :to="{ name: parent.routeName }",
      :title="parent.title",
      exact
    )
</template>

<script>
export default {

  props: ['parent'],


  // TODO move all of this up...
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
  width header-height-base

  a
    display flex
    justify-content center
    align-items center
    align-self stretch

    line-height 1

    @media(min-width breakpoint-small)
      margin-left -1rem

    link(white, white, rgba(white, .7))

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
  .up-button
    a
      link-hover(rgba(white, .7))

</style>
