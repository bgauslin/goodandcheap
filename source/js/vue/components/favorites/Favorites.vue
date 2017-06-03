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
    this.updateTitle('Favorites')
  },

  updated () {
    this.setHasFavorites(this.favorites)
  },

  methods: {
    setHasFavorites (favorites) {
      this.hasFavorites = (favorites.length > 0) ? true : false
    },
    updateTitle (title) {
      document.title = title + ' · ' + this.$root.siteName
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

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

  @media(min-width BREAKPOINT_MEDIUM)
    width WIDTH_MEDIUM

  .preview
    transition all .5s ease

    @media(min-width BREAKPOINT_MEDIUM)
      a
        border-left 1px solid BORDER_COLOR
        border-right 1px solid BORDER_COLOR

  h2
    margin 0
    padding 1.5rem 0
    sans_heavy()
    small_caps(14)
    text-align center

    @media(min-width BREAKPOINT_MEDIUM)
      padding 2rem 0

// remove-favorite animations
.favorites-leave-active
  opacity 0
  position absolute
  transform translateX(-100%)

  @media(min-width BREAKPOINT_MEDIUM)
    transform scale(.5)
    transform translateX(0)
    width WIDTH_MEDIUM

.favorites-move
  transition transform .3s

</style>
