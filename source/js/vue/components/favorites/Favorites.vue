<template lang="pug">
  div.favorites(:class="{ 'empty' : !hasFavorites }")
    h2 {{ favoritesCount }}
    div
      transition-group(
        name="favorites",
        tag="ol",
        class="previews"
      )
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
      favorites: this.$store.state.favorites.favorites.reverse(),
      hasFavorites: false
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
  },

  mounted () {
    this.setHasFavorites(this.favorites)
  },

  updated () {
    this.setHasFavorites(this.favorites)
  },

  methods: {
    setHasFavorites (favorites) {
      this.hasFavorites = (favorites.length > 0) ? true : false
    }
  }

}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

@keyframes showFavorites
  0%
    visibility hidden
    opacity 0
    transform translateY(100%)
  75%
    visibility visible
    opacity 0
    transform translateY(100%)
  100%
    transform translateY(0)
    opacity 1

.favorites
  margin 0 auto
  animation showFavorites 1s ease-out

  &.empty
    animation none
    /*
    h2
      position-it(absolute, 0, 0, 0, 0)
      z-index -1
      display flex
      justify-content center
      align-items center
    */

  @media(min-width breakpoint-medium)
    width width-medium

  .preview
    transition all .5s ease

    @media(min-width breakpoint-medium)
      a
        border-right 1px solid border-color
        border-left 1px solid border-color

  h2
    margin 0
    padding 1.5rem 0
    text-align center
    sans-heavy()
    small-caps(14)

    @media(min-width breakpoint-medium)
      padding 2rem 0


// remove-favorite animations
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
