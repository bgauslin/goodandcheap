<template lang="pug">
  header.header
    .header__controls
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

  // TODO(app): String or Object here is weird. Update this.
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

// TODO(#39): Update header background with alpha and/or remove blur.
.header
  elevation(2)
  backdrop-filter backdrop-effect
  background var(--brand-color)
  padding 0 env(safe-area-inset-right) 0 env(safe-area-inset-left)
  position sticky
  top 0
  z-index 2

.header__controls
  height var(--header-height)
  position relative

  @media breakpoint.small
    margin 0 var(--margin)

  @media breakpoint.xlarge
    margin 0 auto
    width content-width-xlarge

.site-name
  small_caps(14)
  typeface('sans_bold')
  display flex
  height var(--header-height)
  justify-content center
  left 0
  position absolute
  right 0
  top 0
  white-space nowrap

@media breakpoint.medium
  .site-name.search-enabled
    display none

.site-name__link
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  align-items center
  align-self stretch
  display flex
  position relative
  z-index 2

.site-name__link:active
  transform scale(.9)
  transition .3s ease

[no-touch] .site-name__link.current
  color var(--header-color)
  cursor default

[no-touch] .site-name__link.current:active
  transform none

</style>
