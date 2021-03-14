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
      path(d="M12,21 L20,13 A2,2 45 0,0 14,6 L12,8 L10,6 A4,4 -45 0,0 4,13 Z")
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
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  typeface('sans')
  align-items center
  border-radius 50%
  display flex
  font-size em(12)
  grid-area favorites
  height controls-size
  justify-content center
  position relative
  width controls-size

.favorites-counter.updated
  animation bounce .3s ease-out

.favorites-counter:active
  transform scale(.9)
  transition .3s ease

.favorites-counter.current
  color var(--header-color)
  pointer-events none

[no-touch] .favorites-counter.current:hover
  color var(--header-color)

.favorites-counter__count
  color inherit
  right controls-size - rem(8)
  position absolute
  text-align right

// TODO(#45): SVG icon styles.
.favorites-counter__icon
  height rem(24)
  width rem(24)

.favorites-counter__icon > path
  fill var(--header-color)
  stroke var(--header-color)
  stroke-width 1.5

</style>
