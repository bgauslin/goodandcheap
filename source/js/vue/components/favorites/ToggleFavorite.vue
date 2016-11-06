<template lang="pug">
  button.toggle-favorite(@click="toggleFavorite(favorite)", :class="{ saved: isFavorite }")
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
@import '../../../../stylus/config/'

.toggle-favorite
  position absolute
  display block
  width 3rem
  padding .5rem
  text-align center

  &::before
    height 2rem
    line-height 2rem
    icon()

.toggle-favorite
  &::before
    content '\e80b' // heart-empty
    color light-grey

  &.saved
    &::before
      content '\e80a' // heart (filled)
      color red


.no-touch
  .toggle-favorite
    &:hover,
    &.saved:hover
      &::before
        color red

</style>
