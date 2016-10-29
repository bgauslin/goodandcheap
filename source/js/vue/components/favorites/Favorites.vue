<template lang="pug">
  div.favorites
    preloader(v-if="loading")
    h2 {{ favoritesCount }} Favorites

    div(v-if="!debug")
      ol.previews(v-if="!loading && favorites")
        recipe-preview(
          v-for="(recipe, index) in favorites",
          :item="recipe",
          route-name="recipe",
          :remove-favorite="true",
          :index="index"
        )
</template>


<script>
import Preloader from '../partials/Preloader.vue'
import RecipePreview from '../recipes/Preview.vue'

export default {

  components: { Preloader, RecipePreview },

  data () {
    return {
      loading: false,
      favoritesStore: [],
      favorites: [],
      debug: false
    }
  },

  computed: {
    favoritesCount () {
      var count = this.favoritesStore.length
      if (count > 0) {
        return count
      }
    }
  },

  created () {
    this.fetchFavoritesStore()

    let that = this // <-- this is kind of weird
    this.$root.$on('remove-favorite', function(id) {
      that.removeFavorite(id)
    })
  },

  methods: {
    fetchFavoritesStore () {
      var store = localStorage.getItem('favorites')
      if (store !== null) {
        this.favoritesStore = JSON.parse(localStorage.getItem('favorites'))
        this.fetchData(this.favoritesStore)
      }
    },

    getApiUrl () {
      return this.$root.apiBaseUrl + 'favorites/'
    },

    fetchData (items) {
      this.loading = true
      for(var i = 0; i < items.length; i++) {
        var id = items[i]
        var url = this.getApiUrl() + id
        console.log(url)
        this.$http.get(url).then((response) => {
          this.favorites.push(response.data)
        })
      }
      this.loading = false
    },

    removeFavorite (id) {
      var i = this.favorites.indexOf(id)
      this.favorites.splice(i, 1)
      this.setFavorites(this.favorites)
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
    animation slideInUp .3s ease
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
