<template lang="pug">
  div.favorites
    h2 {{ favoritesCount }}
    div
      ol.previews
        recipe-preview(
          v-for="(recipe, index) in favorites",
          :item="recipe",
          route-name="recipe",
          :remove-favorite="true",
          :index="index"
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
      let count = this.$store.state.favorites.length
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
  @media(min-width breakpoint-medium)
    margin 0 margins-medium

  .previews
    //animation slideInUp .3s ease

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

  .no-favorites
    margin-top 2rem
    text-align center
    sans()

    p
      margin 0 0 1em

  .recipe-list
    width 100%

    @media(min-width breakpoint-small)
      margin 0 auto 2rem

</style>
