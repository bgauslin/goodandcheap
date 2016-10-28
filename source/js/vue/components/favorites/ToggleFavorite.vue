<template lang="pug">
  button.toggle-favorite(@click="toggleFavorite(id)", :class="{ saved: isFavorite }")
</template>


<script>
export default {
  props: ['id', 'favorites'],

  data () {
    return {
      isFavorite: false
    }
  },

  created () {
    //this.isFavorite = this.isInFavorites(this.favorites, this.id)
  },

  methods: {
    toggleFavorite (id) {
      if (this.isFavorite) {
        this.$root.$emit('remove-favorite', id)
      } else {
        this.$root.$emit('add-favorite', id)
      }
      this.isFavorite = !this.isFavorite
    },

    isInFavorites (a, obj) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
          return true
        }
      }
      return false
    }
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.toggle-favorite
  position absolute // NOTE see .recipe and .preview for TRBL
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
