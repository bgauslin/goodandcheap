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
  position fixed
  top 0
  right 0
  left 0
  z-index 9999
  background brand-color
  box-shadow 0 0 5px 0 medium-grey

  & > div
    display flex
    justify-content space-between
    align-items center

    @media(min-width breakpoint-small)
      margin 0 margins-small

    @media(min-width breakpoint-medium)
      margin 0 margins-medium

    @media(min-width breakpoint-large)
      margin 0 margins-large

    @media(min-width breakpoint-xlarge)
      margin 0 auto
      width width-xlarge

  h1
    text-align center
    body-font-bold()
    small-caps(14)

    a
      height header-height
      line-height header-height

  a
    link(white, white, rgba(white, .7))


.no-touch
  .header
    a
      link-hover(rgba(white, .7))

</style>
