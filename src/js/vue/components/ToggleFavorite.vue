<template lang="pug">
  button.toggle-favorite(
    @click="toggleFavorite()",
    :class="{ 'saved' : isFavorite }",
    :aria-label="toggleLabel",
  )
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
  display block
  padding .5rem
  position absolute
  text-align center
  width 3rem

.toggle-favorite::before
  icon()
  height 2rem
  line-height 2rem

.toggle-favorite::before
  color var(--medium-grey)
  content icon-heart-empty

.toggle-favorite.saved::before
  color var(--brand-color)
  content icon-heart

.recipe .toggle-favorite
  right 0
  top .25rem

  @media Breakpoint.LARGE
    right .5rem
    top .75rem

.preview--recipe .toggle-favorite
  right 0
  top 0

[no-touch] .toggle-favorite
  &:hover
  &.saved:hover
    &::before
      color var(--brand-color)

</style>
