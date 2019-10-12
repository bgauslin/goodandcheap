<template lang="pug">
  header.header
    div.header__controls
      back-button(
        :parent="parent",
      )
      h1.site-name(
        :class="{ 'search-enabled' : showSearch }",
      )
        router-link(
          class="site-name__link",
          to="/",
          title="Home",
          exact
        ) {{ heading }}
      search-bar
      favorites-counter
</template>

<script>
import { mapGetters } from 'vuex';
import BackButton from './BackButton.vue';
import FavoritesCounter from './FavoritesCounter.vue';
import SearchBar from './SearchBar.vue';

export default {
  components: {
    BackButton,
    FavoritesCounter,
    SearchBar,
  },

  // TODO: String or Object here is weird. Update this.
  props: {
    parent: [String, Object],
  },

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
    ...mapGetters([
      'showSearch',
    ]),
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.header
  background rgba(BRAND_COLOR, .97)
  box-shadow 0 0 5px 0 var(--medium-grey)
  position sticky
  top 0
  z-index 1

.header__controls
  height var(--header-height)
  position relative

  @media Breakpoint.SMALL
    margin 0 var(--margin)

  @media Breakpoint.XLARGE
    margin 0 auto
    width '%s' % ContentWidth.XLARGE

.site-name
  display flex
  height var(--header-height)
  justify-content center
  left 0
  position absolute
  right 0
  small_caps(14)
  top 0
  typeface('sans_bold')
  white-space nowrap

@media Breakpoint.SEARCH_ENABLED
  .site-name.search-enabled
    display none

.site-name__link
  align-items center
  align-self stretch
  display flex
  // height var(--header-height)
  link(white, white, rgba(white, .7), rgba(white, .7))
  position relative
  z-index 2

.site-name__link:active
  transform scale(.9)
  transition .3s ease

[no-touch] .site-name__link.current
  color white
  cursor default

[no-touch] .site-name__link.current:active
  transform none

</style>
