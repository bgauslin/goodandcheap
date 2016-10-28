<template lang="pug">
  header.header
    div
      h1
        router-link(to="/", title="Home", exact) {{ heading }}
      <!-- search-bar -->
</template>

<script>
import SearchBar from '../partials/SearchBar.vue'
export default {
  components: { SearchBar },

  data () {
    return {
      'heading': 'Good And Cheap'
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.header
  position fixed
  top 0
  right 0
  left 0
  z-index 9999
  background brand-color
  box-shadow 0 0 5px 0 medium-grey // horiz vert blur spread color

  & > div
    display flex
    justify-content center
    align-items center
    width 100%

    @media(min-width breakpoint-small)
      //margin 0 auto
      //width small

    @media(min-width breakpoint-large)
      //width large

  h1
    text-align center
    body-font-bold()
    small-caps(14)

    a
      //display inline-block
      //padding 0 2em
      height header-height
      line-height header-height

  a
    &:link,
    &:visited
      color white

    &:active
      color rgba(white, .7)


.no-touch
  .header
    a
      &:hover,
      &:visited:hover
        color rgba(white, .7)



</style>
