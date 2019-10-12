<template lang="pug">
  div
    div.favorites(
      :class="{ 'empty' : !hasFavorites }"
    )
      h2 {{ count }}
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
import { mapGetters } from 'vuex';
import RecipePreview from './RecipePreview.vue';

export default {
  components: { RecipePreview },

  data() {
    return {
      favorites: this.$store.state.favorites.favorites.reverse(),
    }
  },

  mounted() {
    this.updateTitle('Favorites');
  },

  computed: {
    ...mapGetters([
      'favoritesCount',
      'hasFavorites',
    ]),

    /** @return {string} */
    count() {
      let text;
      const count = this.favoritesCount;
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
@import '../../../stylus/config/'

.favorites
  margin 0 auto

  @media Breakpoint.MEDIUM
    width '%s' % ContentWidth.MEDIUM

.favorites.empty
  animation none

.favorites .preview
  transition all .5s ease

@media Breakpoint.MEDIUM
  .favorites .preview__link--recipe
    border-left 1px solid var(--border-color)
    border-right 1px solid var(--border-color)

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
    transform scale(.5) translateX(0)
    width '%s' % ContentWidth.MEDIUM

.favorites-move
  transition transform .3s

</style>
