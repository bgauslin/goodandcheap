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
@import '../../../../stylus/_config/'

.search-toggle
  align-self stretch
  color WHITE
  margin 0
  padding 0
  width 2.75rem

  &:active
    color rgba(WHITE, .7)

  &::before
    content ICON_SEARCH
    icon()
    font-size px_to_em(16)

  &.open
    &::before
      content ICON_CANCEL

.no-touch
  .search-toggle
    &:hover
    &:visited:hover
      color rgba(WHITE, .7)

</style>
