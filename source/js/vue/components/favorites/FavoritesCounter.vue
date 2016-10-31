<template lang="pug">
  router-link.favorites-counter(to="/favorites", title="Favorites", exact) {{ favoritesCount }}
</template>

<script>
export default {

  computed: {
    favoritesCount () {
      var count = this.$store.getters.favoritesCount
      if (count > 0) {
        return count
      }
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

  sans()
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
