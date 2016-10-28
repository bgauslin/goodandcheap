<template lang="pug">
  a.favorites-counter {{ favoritesCount }}
</template>

<script>
export default {

  data () {
    return {
      favorites: [],
      isVisible: true
    }
  },

  created () {
    this.fetchFavorites()

    let that = this // <-- this is kind of weird

    this.$root.$on('add-favorite', function(id) {
      that.addFavorite(id)
    })

    this.$root.$on('remove-favorite', function(id) {
      that.removeFavorite(id)
    })
  },

  computed: {
    favoritesCount () {
      return this.favorites.length
    }
  },

  methods: {
    fetchFavorites () {
      var store = localStorage.getItem('favorites')

      if (store === null) {
        this.setFavorites(this.favorites)
      } else {
        this.favorites = JSON.parse(localStorage.getItem('favorites'));
      }
    },

    setFavorites (favorites) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    },

    addFavorite (id) {
      this.favorites.push(id)
      this.setFavorites(this.favorites)
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

.favorites-counter
  display flex
  justify-content center
  align-items center
  align-self stretch
  width header-height-base
  line-height 1
  color white

  body-font()
  font-size em(11)
  color white

  &::after
    margin-left .25em
    icon()
    content '\e80b' // heart-empty
    font-size 1rem

  &.current::after
    content '\e80a' // heart

  &.updated
    animation bounce 500ms ease

</style>
