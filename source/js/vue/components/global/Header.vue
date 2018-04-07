<template lang="pug">
  header.header
    div.controls
      up-button(
        :parent="parent",
      )
      h1(
        :class="{ 'search-enabled' : hasSearch }",
      )
        router-link(
          to="/",
          title="Home",
          exact
        ) {{ heading }}
      search-bar
      favorites-counter(
        v-if="allowFavorites",
      )
</template>

<script>
import FavoritesCounter from '../favorites/FavoritesCounter.vue';
import SearchBar from '../search/SearchBar.vue';
import UpButton from '../partials/UpButton.vue';

export default {
  components: {
    FavoritesCounter,
    SearchBar,
    UpButton,
  },

  props: ['parent'],

  data () {
    return {
      allowFavorites: false,
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
          notBottom : '-bottom',
        }
      }
    }
  },

  computed: {
    hasSearch () {
      return this.$store.getters.getShowSearch;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.header
  background rgba(BRAND_COLOR, .97)
  box-shadow 0 0 5px 0 MEDIUM_GREY
  position_it(fixed, 0, 0, null, 0)
  z-index 999

  .controls
    height HEADER_HEIGHT_BASE
    position relative

    @media(min-width BREAKPOINT_SMALL)
      margin 0 MARGINS_SMALL

    @media(min-width BREAKPOINT_MEDIUM)
      height HEADER_HEIGHT_MEDIUM
      margin 0 MARGINS_MEDIUM

    @media(min-width BREAKPOINT_LARGE)
      margin 0 MARGINS_LARGE

    @media(min-width BREAKPOINT_XLARGE)
      margin 0 auto
      width WIDTH_XLARGE

  h1
    display flex
    height HEADER_HEIGHT_BASE
    justify-content center
    position_it(absolute, 0, 0, null, 0)
    font_sans_heavy()
    small_caps(14)
    white-space nowrap

    @media(max-width BREAKPOINT_LARGE)
      &.search-enabled
        display none

    a
      align-items center
      align-self stretch
      display flex
      link(WHITE, WHITE, rgba(WHITE, .7))
      position relative
      z-index 2

      @media(min-width BREAKPOINT_MEDIUM)
        height HEADER_HEIGHT_MEDIUM

      &:active
        transform scale(.9)
        transition .3s ease

.no-touch
  .header
    h1
      a
        link_hover(rgba(WHITE, .7))

        &.current
          color WHITE
          cursor default

          &:active
            transform none

</style>
