<template lang="pug">
  .favorites
    h1.favorites__count {{ count }}
    .no-favorites(
      v-if="!hasFavorites"
    )
      h1.favorites__count No Favorites :(
    transition-group(
      class="previews"
      name="favorites"
      tag="ol"
    )
      recipe-preview(
        v-for="(recipe, index) in favorites"
        :index="index"
        :item="recipe"
        :key="recipe.slug"
        :showBadge="false"
        :showChapter="true"
        favoriteButton="remove"
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
      let text = null;
      const count = this.favoritesCount;
      if (count > 0) {
        text = (count === 1) ? '1 Favorite' : `${count} Favorites`;
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
  height 100%
  margin 0 auto
  max-width stack-width
  position relative
  width 100%

.favorites .preview
  transition all .5s ease

.favorites__count
  small_caps(14)
  typeface('sans_bold')
  margin 0
  padding 1.5rem 0
  text-align center
  width 100%

  @media breakpoint.medium
    padding 2rem 0

.no-favorites
  display flex
  flex-direction column
  height 100%
  justify-content center
  position absolute
  top 0
  width 100%

.favorites-leave-active
  opacity 0
  position absolute
  transform translateX(-100%)

  @media breakpoint.medium
    transform scale(.5) translateX(0)

.favorites-move
  transition transform .3s

</style>
