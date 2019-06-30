<template lang="pug">
  button.toggle-favorite(
    @click="toggleFavorite(favorite)",
    :class="{ saved: isFavorite }",
    :aria-label="toggleLabel",
  )
</template>

<script>
export default {
  props: ['favorite'],

  data() {
    return {
      isFavorite: false,
    }
  },

  created() {
    this.isFavorite = this.isInFavorites(this.favorite);
  },

  computed: {
    /** @return {string} */
    toggleLabel() {
      return (this.isFavorite) ? 'Remove recipe from Favorites' : 'Add recipe to Favorites';
    },
  },

  methods: {
    /**
     * Whether the recipe is in user's favorites list.
     * @param {!Object} item - The recipe.
     * @return {boolean}
     */
    isInFavorites(item) {
      let ids = this.$store.getters.favoritesIds;
      let index = ids.indexOf(item.id);
      return (index !== -1);
    },

    /**
     * Adds or removes recipe from user's favorites list.
     * @param {!Object} item - The recipe.
     */
    toggleFavorite(item) {
      if (this.isFavorite) {
        this.$store.commit('removeFavorite', item);
      } else {
        this.$store.commit('addFavorite', item);
      }
      this.isFavorite = !this.isFavorite;
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
  height 2rem
  icon()
  line-height 2rem

.toggle-favorite::before
  color var(--medium-grey)
  content '%s' % Icon.HEART_EMPTY

.toggle-favorite.saved::before
  color var(--brand-color)
  content '%s' % Icon.HEART

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
