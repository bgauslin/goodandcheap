<template lang="pug">
  header.header
    div
      up-button
      h1
        router-link(to="/", title="Home", exact) {{ heading }}
      favorites-counter
</template>

<script>
import UpButton from '../partials/UpButton.vue'
import SearchToggle from '../search/SearchToggle.vue'
import SearchBar from '../search/SearchBar.vue'
import FavoritesCounter from '../favorites/FavoritesCounter.vue'

export default {
  components: { UpButton, SearchToggle, SearchBar, FavoritesCounter },

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
  position-it(fixed, 0, 0, null, 0)

  z-index 9999
  background brand-color
  box-shadow 0 0 5px 0 medium-grey

  & > div
    display flex
    justify-content space-between
    align-items center
    height header-height-base

    @media(min-width breakpoint-small)
      margin 0 margins-small

    @media(min-width breakpoint-medium)
      margin 0 margins-medium
      height header-height-medium

    @media(min-width breakpoint-large)
      margin 0 margins-large

    @media(min-width breakpoint-xlarge)
      margin 0 auto
      width width-xlarge

  h1
    display flex
    align-self stretch
    sans-heavy()
    small-caps(14)

    @media(min-width breakpoint-small)
      margin-left 1rem

  a
    display flex
    align-items center
    align-self stretch
    padding 0 1.5rem
    link(white, white, rgba(white, .7))

.no-touch
  .header
    a
      link-hover(rgba(white, .7))

      &.current
        cursor default
        color white

</style>
