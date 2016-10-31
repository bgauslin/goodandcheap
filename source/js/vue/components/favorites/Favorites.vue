<template lang="pug">
  div.favorites
    h2 {{ favoritesCount }}
    div
      ol.previews
        recipe-preview(
          v-for="(recipe, index) in favorites",
          :item="recipe",
          :index="index",
          :showChapter="true",
          favoriteButton="remove"
        )
</template>


<script>
import RecipePreview from '../recipes/Preview.vue'

export default {

  components: { RecipePreview },

  data () {
    return {
      favorites: this.$store.state.favorites
    }
  },

  computed: {
    favoritesCount () {
      var text
      let count = this.$store.getters.favoritesCount
      if (count <= 0 ) {
        text = 'No Favorites :('
      } else if (count === 1) {
        text = '1 Favorite'
      } else {
        text = count + ' Favorites'
      }
      return text
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.favorites
  .previews
    @media(min-width breakpoint-medium)
      margin 0 margins-medium

      @media(min-width breakpoint-medium)
        previews-grid()

  .preview
    @media(min-width breakpoint-medium)
      preview-grid()
    @media(min-width breakpoint-large)
      preview-grid-large()

  h2
    margin 1em 0
    text-align center
    sans-heavy()
    small-caps(14)

</style>
