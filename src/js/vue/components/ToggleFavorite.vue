<template lang="pug">
  button.toggle-favorite(
    @click="toggleFavorite()"
    :class="{ 'saved' : isFavorite }"
    :aria-label="toggleLabel"
  )
    svg.toggle-favorite__icon(
      :class="{'saved' : isFavorite}"
      viewbox="0 0 24 24"
      aria-hidden="true"
    )
      path(d="M12,19 L19,12 A1,1 45 0,0 14,6 L12,8 L10,6 A1,1 -45 0,0 5,12 Z")
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  props: {
    favorite: Object,
  },

  computed: {
    ...mapGetters([
      'favoritesIds',
    ]),

    /** @return {boolean} */
    isFavorite() {
      return this.favoritesIds.includes(this.favorite.id);
    },

    /** @return {string} */
    toggleLabel() {
      return (this.isFavorite) ? 'Remove recipe from Favorites' : 'Add recipe to Favorites';
    },
  },

  methods: {
    ...mapMutations([
      'addFavorite',
      'removeFavorite',
    ]),

    /** Adds or removes a recipe from user's favorites list. */
    toggleFavorite() {
      if (this.isFavorite) {
        this.removeFavorite(this.favorite);
      } else {
        this.addFavorite(this.favorite);
      }
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.toggle-favorite
  align-items center
  // border-radius 50%
  // color var(--header-color)
  display flex
  font-size em(12)
  grid-area favorites
  height controls-size
  justify-content center
  position absolute
  width controls-size

// TODO(#45): SVG icon styles.
.toggle-favorite__icon
  height rem(24)
  width rem(24)

.toggle-favorite__icon > path
  fill none
  stroke var(--text-3-color)
  stroke-width 2

.toggle-favorite__icon.saved > path
  fill var(--brand-color)
  stroke var(--brand-color)

.recipe .toggle-favorite
  right -.75rem
  top .25rem

  @media breakpoint.large
    top .75rem

.preview--recipe .toggle-favorite
  right 0
  top 0

[no-touch] .toggle-favorite
  &:hover
  &.saved:hover
    color var(--brand-color)

</style>
