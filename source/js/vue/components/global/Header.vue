<template lang="pug">
  header.header
    div.header__controls
      up-button(
        :parent="parent",
      )
      h1.site-name(
        :class="{ 'search-enabled' : hasSearch }",
      )
        router-link(
          class="site-name__link",
          to="/",
          title="Home",
          exact
        ) {{ heading }}
      search-bar(
        :query="query",
      )
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

  props: [
    'parent',
    'query',
  ],

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
          notBottom : '-bottom',
        }
      }
    }
  },

  computed: {
    allowFavorites () {
      return this.$store.getters.allowFavorites;
    },

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

.header__controls
  height HEADER_HEIGHT_BASE
  position relative

  @media BREAKPOINT_SMALL
    margin 0 MARGINS_SMALL

  @media BREAKPOINT_MEDIUM
    height HEADER_HEIGHT_MEDIUM
    margin 0 MARGINS_MEDIUM

  @media BREAKPOINT_LARGE
    margin 0 MARGINS_LARGE

  @media BREAKPOINT_XLARGE
    margin 0 auto
    width WIDTH_XLARGE

.site-name
  display flex
  font_sans_heavy()
  height HEADER_HEIGHT_BASE
  justify-content center
  position_it(absolute, 0, 0, null, 0)
  small_caps(14)
  white-space nowrap

  @media (max-width BREAKPOINT_MEDIUM_UNITS)
    &.search-enabled
      display none

.site-name__link
  align-items center
  align-self stretch
  display flex
  link(WHITE, WHITE, rgba(WHITE, .7))
  position relative
  z-index 2

  @media BREAKPOINT_MEDIUM
    height HEADER_HEIGHT_MEDIUM

  &:active
    transform scale(.9)
    transition .3s ease

.no-touch .site-name__link
  link_hover(rgba(WHITE, .7))

  &.current
    color WHITE
    cursor default

    &:active
      transform none

</style>
