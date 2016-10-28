<template lang="pug">
  header.header
    div
      search-toggle
      h1
        router-link(to="/", title="Home", exact) {{ heading }}
      favorites-counter
      <!-- search-bar -->
</template>

<script>
import SearchToggle from '../search/SearchToggle.vue'
import FavoritesCounter from '../favorites/FavoritesCounter.vue'
import SearchBar from '../search/SearchBar.vue'

export default {
  components: { SearchToggle, FavoritesCounter, SearchBar },

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
    body-font-bold()
    small-caps(14)

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
