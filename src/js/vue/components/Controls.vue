<template lang="pug">
  nav.controls
    .controls__frame
      back-button(
        :parent="parent"
      )
      favorites-counter
</template>

<script>
import BackButton from './BackButton.vue';
import FavoritesCounter from './FavoritesCounter.vue';

export default {
  components: {
    BackButton,
    FavoritesCounter,
  },

  // TODO(app): String or Object here is weird. Update this.
  props: {
    parent: [String, Object],
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.controls
  @extends $app-bar-parent
  background black
  bottom 0
  grid-area controls
  left 0
  position fixed
  right 0

.controls__frame
  @extends $app-bar-child
  align-items center
  display grid
  grid-template-areas 'back info favorites'
  grid-template-columns 1fr auto 1fr

</style>
