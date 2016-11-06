<template lang="pug">
  div.favorites
    h2 {{ favoritesCount }}
    div
      transition-group(name="favorites", tag="ol", class="previews")
        recipe-preview(
          v-for="(recipe, index) in favorites",
          :item="recipe",
          :index="index",
          :key="recipe",
          :showChapter="true",
          :showBadge="false",
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
      var count = this.$store.getters.favoritesCount
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
  margin 0 auto

  @media(min-width breakpoint-medium)
    width width-medium

  .previews
    animation slideInUp .3s ease-out

  .preview
    transition all .5s ease

    @media(min-width breakpoint-medium)
      a
        border-right 1px solid border-color
        border-left 1px solid border-color

  h2
    margin 1em 0
    text-align center
    sans-heavy()
    small-caps(14)

.favorites-leave-active
  position absolute
  opacity 0
  transform translateX(-100%)

  @media(min-width breakpoint-medium)
    width width-medium
    transform translateX(0)
    transform scale(.5)

.favorites-move
  transition transform .3s

</style>
