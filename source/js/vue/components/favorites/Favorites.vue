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
@import '../../../../stylus/_config/'

@keyframes showFavorites
  0%
    opacity 0
    transform translateY(100%)
    visibility hidden
  75%
    opacity 0
    transform translateY(100%)
    visibility visible
  100%
    opacity 1
    transform translateY(0)

.favorites
  animation showFavorites 1s ease-out
  margin 0 auto

  &.empty
    animation none

  @media Breakpoint.MEDIUM
    width WIDTH_MEDIUM

  .preview
    transition all .5s ease

    @media Breakpoint.MEDIUM
      a
        border-left 1px solid BORDER_COLOR
        border-right 1px solid BORDER_COLOR

  h2
    margin 0
    padding 1.5rem 0
    font_sans_heavy()
    small_caps(14)
    text-align center

    @media Breakpoint.MEDIUM
      padding 2rem 0

// animations for 'remove-favorite'
.favorites-leave-active
  opacity 0
  position absolute
  transform translateX(-100%)

  @media Breakpoint.MEDIUM
    transform scale(.5)
    transform translateX(0)
    width WIDTH_MEDIUM

.favorites-move
  transition transform .3s

</style>
