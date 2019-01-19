<template lang="pug">
  div
    div.favorites(
      :class="{ 'empty' : !hasFavorites }"
    )
      h2 {{ favoritesCount }}
      div
        transition-group(
          class="previews",
          name="favorites",
          tag="ol",
        )
          recipe-preview(
            v-for="(recipe, index) in favorites",
            :index="index",
            :item="recipe",
            :key="recipe.slug",
            :showBadge="false",
            :showChapter="true",
            favoriteButton="remove",
          )
</template>

<script>
import RecipePreview from '../recipes/Preview.vue';

export default {
  components: { RecipePreview },

  data() {
    return {
      favorites: this.$store.state.favorites.favorites.reverse(),
      hasFavorites: false,
    }
  },

  mounted() {
    this.setHasFavorites(this.favorites);
    this.updateTitle('Favorites');
  },

  updated() {
    this.setHasFavorites(this.favorites);
  },

  computed: {
    /** @return {string} */
    favoritesCount() {
      let text;
      const count = this.$store.getters.favoritesCount;
      if (count <= 0) {
        text = 'No Favorites :(';
      } else if (count === 1) {
        text = '1 Favorite';
      } else {
        text = `${count} Favorites`;
      }
      return text;
    },
  },

  methods: {
    /** 
     * Sets a flag if user has any saved favorites.
     * @param {Array} favorites - User's favorite recipes.
     */
    setHasFavorites(favorites) {
      this.hasFavorites = (favorites.length > 0);
    },

    /** 
     * Updates the document title with the current page's title.
     * @param {string} title
     */
    updateTitle(title) {
      document.title = `${title} · ${this.$root.siteName}`;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.favorites
  animation showFavorites 1s ease-out
  margin 0 auto

  @media Breakpoint.MEDIUM
    width '%s' % ElementWidth.MEDIUM

.favorites.empty
  animation none

.favorites .preview
  transition all .5s ease

@media Breakpoint.MEDIUM
  .favorites .preview a
    border-left 1px solid '%s' % Branding.BORDER
    border-right 1px solid '%s' % Branding.BORDER

.favorites h2
  margin 0
  padding 1.5rem 0
  small_caps(14)
  typeface('sans_bold')
  text-align center

  @media Breakpoint.MEDIUM
    padding 2rem 0

.favorites-leave-active
  opacity 0
  position absolute
  transform translateX(-100%)

  @media Breakpoint.MEDIUM
    transform scale(.5)
    transform translateX(0)
    width '%s' % ElementWidth.MEDIUM

.favorites-move
  transition transform .3s

</style>
