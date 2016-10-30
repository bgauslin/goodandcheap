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
    //this.isFavorite = this.isInFavorites(this.$store.state.favorites, this.favorite)
  },

  methods: {
    toggleFavorite (favorite) {
      if (this.isFavorite) {
        this.$store.commit('removeFavorite', favorite)
      } else {
        this.$store.commit('addFavorite', favorite)
      }
      this.isFavorite = !this.isFavorite
    },

    isInFavorites (store, favorite) {
      console.log('favorite.id = ' + favorite.id)
      // TODO get all ids from store
      let storeIds = []
      for (let i = 0; i <= store.length; i++) {
        console.log('i = ' + i)
        //storeIds[i] = store[i].id
      }
      //console.log('storeIds = ' + storeIds)
      //var index = store.indexOf(favorite)
      //console.log('index = ' + index)
      //return (index !== -1) ? true : false
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
