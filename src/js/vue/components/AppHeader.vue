<template lang="pug">
  nav.header
    .header__frame
      header-link
      //- search-bar
      favorites-counter
</template>

<script>
import HeaderLink from './HeaderLink.vue';
import FavoritesCounter from './FavoritesCounter.vue';
import SearchBar from './SearchBar.vue';

export default {
  components: {
    HeaderLink,
    FavoritesCounter,
    SearchBar,
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.header
  elevation(1)
  background var(--header-background)
  color var(--brand-color)
  grid-area header
  height var(--header-height)
  padding 0 env(safe-area-inset-right) 0 env(safe-area-inset-left)
  position sticky
  top 0
  z-index 2

  @supports (backdrop-filter backdrop-effect)
    backdrop-filter backdrop-effect
    background var(--header-backdrop-background)

.header__frame
  align-items center
  display grid
  grid-template-areas 'heading . favorites'
  grid-template-columns minmax(0, auto) 1fr controls-size
  height 100%
  margin 0 auto
  max-width content-max-width
  width 100%

</style>
