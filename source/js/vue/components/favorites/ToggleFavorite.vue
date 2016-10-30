<template lang="pug">
  button.toggle-favorite(@click="toggleFavorite(id)", :class="{ saved: isFavorite }")
</template>


<script>
export default {
  props: ['id'],

  data () {
    return {
      isFavorite: false,
    }
  },

  created () {
    this.isFavorite = this.isInFavorites(this.$store.state.favorites, this.id)
  },

  methods: {
    toggleFavorite (id) {
      if (this.isFavorite) {
        this.$store.commit('removeFavorite', id)
      } else {
        this.$store.commit('addFavorite', id)
      }
      this.isFavorite = !this.isFavorite
    },

    isInFavorites (arr, id) {
      var i = arr.indexOf(id)
      return (i !== -1) ? true : false
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
