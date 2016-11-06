<template lang="pug">
  router-link.favorites-counter(
    :class="{ empty : !hasFavorites }",
    to="/favorites",
    title="Favorites",
    exact
  ) {{ favoritesCount }}
</template>

<script>
export default {

  // TODO logic and animation for 0 -> 1 and for 1 -> 0

  data () {
    return {
      hasFavorites: null
    }
  },

  mounted () {
    this.hasFavorites = this.showCounter()
    this.$el.addEventListener('animationend', this.animationDone, false)
  },

  updated () {
    this.hasFavorites = this.showCounter()
  },

  beforeDestroy: function () {
    this.$el.removeEventListener('animationend')
  },

  computed: {
    favoritesCount () {
      var count = this.$store.getters.favoritesCount
      if (count > 0) {
        return count
      }
    }
  },

  watch: {
    favoritesCount () {
      this.updateCount()
    }
  },

  methods: {
    showCounter() {
      var count = this.favoritesCount
      return (count > 0) ? true : false
    },
    updateCount () {
      console.log('updateCount called')
      var count = this.favoritesCount
      if (count > 0) {
        this.$el.classList.add('updated')
      }
    },
    animationDone() {
      this.$el.classList.remove('updated')
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

  &.updated
    animation bounce .3s ease-out

  &.empty
    visibility hidden

  &::after
    margin-left .25em
    icon()
    content '\e80b' // heart-empty
    font-size 1rem

  &.current::after
    content '\e80a' // heart




</style>
