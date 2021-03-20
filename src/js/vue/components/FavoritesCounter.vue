<template lang="pug">
  router-link.favorites-counter(
    :class="{ 'empty' : !hasFavorites }"
    :to="{ name: 'favorites' }"
    title="Favorites"
    exact
  )
    svg.favorites-counter__icon(
      viewbox="0 0 24 24"
      aria-hidden="true"
    )
      path(d="M12,19 L19,12 A1,1 45 0,0 14,6 L12,8 L10,6 A1,1 -45 0,0 5,12 Z")
    span.favorites-counter__count {{ favoritesCountLabel }}
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
  link(var(--brand-color), var(--brand-color), var(--text-1-color), var(--brand-color))
  typeface('sans')
  align-items center
  border-radius 50%
  display flex
  font-size em(12)
  grid-area favorites
  height controls-size
  justify-content center
  position relative
  transition transform transition
  width controls-size

.favorites-counter.current
  pointer-events none

.favorites-counter.updated
  animation bounce .3s ease-out

.favorites-counter__count
  color inherit
  right controls-size - rem(8)
  position absolute
  text-align right

.favorites-counter__icon
  height rem(24)
  width rem(24)

.favorites-counter__icon > path
  fill none
  stroke currentColor
  stroke-width 1.5

.favorites-counter.current path
  fill var(--brand-color)

</style>
