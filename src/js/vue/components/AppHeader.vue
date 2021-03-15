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
  elevation(2)
  background var(--brand-color)
  grid-area header
  height var(--header-height)
  padding 0 env(safe-area-inset-right) 0 env(safe-area-inset-left)
  position sticky
  top 0
  z-index 2

.header__frame
  align-items center
  display grid
  grid-template-areas 'heading . favorites'
  grid-template-columns minmax(0, auto) 1fr controls-size
  height 100%
  margin 0 auto
  width 100%

  @media breakpoint.small
    padding 0 var(--margin)

  @media breakpoint.large
    width 100%

  @media breakpoint.xlarge
    padding 0
    width content-width-xlarge

</style>
