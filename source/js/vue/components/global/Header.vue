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

  data() {
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
    /** @return {boolean} */
    allowFavorites() {
      return this.$store.getters.allowFavorites;
    },

    /** @return {boolean} */
    hasSearch() {
      return this.$store.getters.getShowSearch;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.header
  background rgba(BRAND_COLOR, .97)
  box-shadow 0 0 5px 0 '%s' % Color.MEDIUM_GREY
  position_it(fixed, 0, 0, null, 0)
  z-index 999

.header__controls
  height '%s' % HeaderHeight.BASE
  position relative

  @media Breakpoint.SMALL
    margin '0 %s' % Margins.SMALL

  @media Breakpoint.MEDIUM
    height '%s' % HeaderHeight.MEDIUM
    margin '0 %s' % Margins.MEDIUM

  @media Breakpoint.LARGE
    margin '0 %s' % Margins.LARGE

  @media Breakpoint.XLARGE
    margin 0 auto
    width WIDTH_XLARGE

.site-name
  display flex
  font_sans_heavy()
  height '%s' % HeaderHeight.BASE
  justify-content center
  position_it(absolute, 0, 0, null, 0)
  small_caps(14)
  white-space nowrap

// TODO: refactor constant
@media BREAKPOINT_SEARCH_ENABLED
  .site-name.search-enabled
    display none

.site-name__link
  align-items center
  align-self stretch
  display flex
  link(white, white, rgba(white, .7))
  position relative
  z-index 2

  @media Breakpoint.MEDIUM
    height '%s' % HeaderHeight.MEDIUM

.site-name__link:active
  transform scale(.9)
  transition .3s ease

.no-touch .site-name__link
  link_hover(rgba(white, .7))

.no-touch .site-name__link.current
  color white
  cursor default

.no-touch .site-name__link.current:active
  transform none

</style>
