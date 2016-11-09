<template lang="pug">
  header.header
    div.controls
      up-button(:parent="parent")
      h1(:class="{ 'search-enabled' : hasSearch }")
        router-link(
          to="/",
          title="Home",
          exact
        ) {{ heading }}
      search-bar
      favorites-counter
</template>

<script>
import UpButton from '../partials/UpButton.vue'
import SearchBar from '../search/SearchBar.vue'
import FavoritesCounter from '../favorites/FavoritesCounter.vue'

// TODO remove headroom.js (it's better without it)
import headroom from 'headroom.js'

export default {
  components: { UpButton, SearchBar, FavoritesCounter },

  props: ['parent'],

  data () {
    return {
      heading: 'Good And Cheap',
      headroomOptions: {
        offset: 0,
        tolerance: 5,
        classes: {
          initial: 'header',
          pinned: 'pin',
          unpinned: 'unpin',
          top : 'top',
          notTop : '-top',
          bottom : 'bottom',
          notBottom : '-bottom'
        }
      }
    }
  },

  computed: {
    hasSearch () {
      return this.$store.getters.getShowSearch
    }
  },

  mounted () {
    //this.makeHeadroom()
  },

  methods: {
    makeHeadroom () {
      let header = new headroom(this.$el, this.headroomOptions)
      header.init()
    }
  }

}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.header
  position-it(fixed, 0, 0, null, 0)

  z-index 999
  background rgba(brand-color, .97)
  box-shadow 0 0 5px 0 medium-grey

  // headroom classes
  transition transform .3s ease-out

  &.pin
    transform translateY(0%)

  &.unpin
    transform translateY(-100%)

  .controls
    position relative
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
    position-it(absolute, 0, 6rem, null, 6rem)
    z-index 999

    display flex
    justify-content center
    height header-height-base

    sans-heavy()
    small-caps(14)
    white-space nowrap

    &.search-enabled
      display none

    a
      display flex
      align-items center
      align-self stretch

      //padding 0 1rem
      link(white, white, rgba(white, .7))

      @media(min-width breakpoint-medium)
        height header-height-medium

      &:active
        //transition .3s ease
        transform scale(.9)

.no-touch
  .header
    h1
      a
        link-hover(rgba(white, .7))
        &.current
          cursor default
          color white
          &:active
            transform none

</style>
