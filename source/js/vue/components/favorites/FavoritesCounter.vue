<template lang="pug">
  transition
    router-link.favorites-counter(:class="{ empty : !hasFavorites }", to="/favorites", title="Favorites", exact) {{ favoritesCount }}
</template>

<script>
export default {

  data () {
    return {
      hasFavorites: null,
      updated: null
    }
  },

  watch: {
    favoritesCount () {
      this.updateCount()
    }
  },

  mounted () {
    this.hasFavorites = this.showCounter()
  },

  updated () {
    this.hasFavorites = this.showCounter()
  },

  computed: {
    favoritesCount () {
      var count = this.$store.getters.favoritesCount
      if (count > 0) {
        return count
      }
    }
  },

  methods: {
    showCounter() {
      var count = this.favoritesCount
      return (count > 0) ? true : false
    },
    updateCount () {
      // TODO apply transition/animation on update
      console.log('updateCount!')
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
  width 3.5rem
  line-height 1
  color white
  sans()
  font-size em(11)
  color white

  // TODO apply this animation on update
  //animation bounce .5s ease

  &.empty
    visibility hidden

  &::after
    margin-left .25em
    icon()
    content '\e80b' // heart-empty
    font-size 1rem

  &.current::after
    content '\e80a' // heart


.bounce-enter
.bounce-enter-active
  animation bounce .5s ease


</style>
