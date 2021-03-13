<template lang="pug">
  nav.header
    .header__frame
      back-button(
        :parent="parent"
      )
      search-bar
      favorites-counter
</template>

<script>
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
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.header
  @extends $app-bar-parent
  elevation(2)
  background var(--brand-color)
  grid-area header
  position sticky
  top 0

.header__frame
  @extends $app-bar-child
  align-items center
  display grid
  grid-template-areas 'back . favorites'
  grid-template-columns minmax(0, auto) 1fr controls-size

</style>
