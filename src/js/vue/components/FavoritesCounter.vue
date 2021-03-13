<template lang="pug">
  router-link.favorites-counter(
    :class="{ 'empty' : !hasFavorites }"
    :to="{ name: 'favorites' }"
    title="Favorites"
    exact
  ) {{ favoritesCountLabel }}

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    this.$el.addEventListener('animationend', this.animationDone, false);
  },

  beforeDestroy() {
    this.$el.removeEventListener('animationend');
  },

  watch: {
    favoritesCount() {
      this.updateCount();
    },
  },

  computed: {
    ...mapGetters([
      'favoritesCount',
    ]),

    /** @return {string} */
    favoritesCountLabel() {
      return this.favoritesCount > 0 ? this.favoritesCount : '';
    },

    /** @return {boolean} */
    hasFavorites() {
      return this.favoritesCount > 0;
    },
  },

  methods: {
    /** Removes CSS class after the icon's animation completes. */
    animationDone() {
      this.$el.classList.remove('updated');
    },

    /** Adds CSS class that triggers animation when user adds a new favorite. */
    updateCount() {
      if (this.favoritesCount > 0) {
        this.$el.classList.add('updated');
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.favorites-counter
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  typeface('sans')
  align-items center
  background pink
  border-radius 50%
  display flex
  font-size em(12)
  grid-area favorites
  height controls-size
  justify-content center
  justify-self end
  width controls-size

.favorites-counter.updated
  animation bounce .3s ease-out

.favorites-counter::after
  icon(icon-heart)
  font-size rem(16)

.favorites-counter.empty::after
  content icon-heart-empty

.favorites-counter:active
  transform scale(.9)
  transition .3s ease

.favorites-counter.current
  color var(--header-color)
  cursor default
  pointer-events none

[no-touch] .favorites-counter.current:hover
  color var(--header-color)

</style>
