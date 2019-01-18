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
     * ...
     * @param {!Object} item - ...
     * @return {boolean}
     */
    isInFavorites(item) {
      let ids = this.$store.getters.favoritesIds;
      let index = ids.indexOf(item.id);
      return (index !== -1);
    },

    /**
     * ...
     * @param {!Object} item - ...
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
@import '../../../../stylus/_config/'

.toggle-favorite
  display block
  padding .5rem
  position absolute
  text-align center
  width 3rem

  &::before
    height 2rem
    icon()
    line-height 2rem

.toggle-favorite
  &::before
    color MEDIUM_GREY
    content ICON_HEART_EMPTY

  &.saved
    &::before
      color RED
      content ICON_HEART

.no-touch
  .toggle-favorite
    &:hover
    &.saved:hover
      &::before
        color RED

</style>
