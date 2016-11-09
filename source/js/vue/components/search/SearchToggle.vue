<template lang="pug">
  button.search-toggle(
    @click="toggle(open)",
    :class="{ open : open, closed : !open }"
  )
</template>

<script>
export default {

  props: ['open'],

  methods: {
    toggle (open) {
      open = !open
      this.$store.commit('setSearch', open)
    }
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.search-toggle
  margin 0
  padding 0

  align-self stretch

  width 2.75rem
  color white

  &:active
    color rgba(white, .7)

  &::before
    icon()
    font-size em(16)
    content '\e804' // search

  &.open
    &::before
      content '\e809' // cancel

.no-touch
  .search-toggle
    &:hover
    &:visited:hover
      color rgba(white, .7)

</style>
