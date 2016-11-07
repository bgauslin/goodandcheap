<template lang="pug">
  div.favorites-counter
    router-link(
      :class="{ empty : !hasFavorites }",
      :to="{ name: 'favorites' }",
      title="Favorites",
      exact
    ) {{ favoritesCount }}
</template>

<script>
export default {
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
  position-it(absolute, 0, 0, null, null)
  display flex
  justify-content flex-end

  width 4rem
  height header-height-base

  color white
  sans()
  font-size em(13)

  @media(min-width breakpoint-medium)
    height header-height-medium

  &.updated
    animation bounce .3s ease-out

  a
    display flex
    align-items center
    align-self stretch

    link(white, white, rgba(white, .7))

    &::after
      margin 0 1rem 0 .3em
      icon()
      content '\e80a' // heart
      font-size 1rem

    &.empty::after
      content '\e80b' // heart-empty

    &.current
      color white

.no-touch
  .favorites-counter
    a
      link-hover(rgba(white, .7))
      &.current:hover
        color white
        cursor default

</style>
