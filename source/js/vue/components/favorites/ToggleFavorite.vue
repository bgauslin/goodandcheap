<template lang="pug">
  button.toggle-favorite(
    :class="{ saved: isFavorite }",
    @click="toggleFavorite(favorite)"
  )
</template>

<script>
export default {
  props: ['favorite'],

  data () {
    return {
      isFavorite: false
    }
  },

  created () {
    this.isFavorite = this.isInFavorites(this.favorite)
  },

  methods: {
    toggleFavorite (item) {
      if (this.isFavorite) {
        this.$store.commit('removeFavorite', item)
      } else {
        this.$store.commit('addFavorite', item)
      }
      this.isFavorite = !this.isFavorite
    },

    isInFavorites (item) {
      var ids = this.$store.getters.favoritesIds
      var index = ids.indexOf(item.id)
      return (index !== -1) ? true : false
    }
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/_config/'

.toggle-favorite
  display block
  padding .5rem
  position absolute
  text-align center
  width 3rem

  &::before
    height 2rem
    icon()
    line-height 2rem

.toggle-favorite
  &::before
    color LIGHT_GREY
    content ICON_HEART_EMPTY

  &.saved
    &::before
      color RED
      content ICON_HEART

.no-touch
  .toggle-favorite
    &:hover
    &.saved:hover
      &::before
        color RED

</style>
