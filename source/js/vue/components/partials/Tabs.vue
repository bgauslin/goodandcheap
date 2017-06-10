<template lang="pug">
  ul.tabs
    li(
      v-for="tab in tabs"
    )
      router-link(
        v-if="tab.name",
        :to="{ name: tab.name }",
        :title="tab.label",
        exact
      ) {{ tab.label }}
</template>

<script>
export default {
  props: ['tabs']
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.tabs
  border 1px solid BRAND_COLOR
  display flex
  flex-direction row
  justify-content space-between
  margin 1rem MARGINS_BASE
  overflow hidden
  font_sans()
  small_caps()

  @media(min-width BREAKPOINT_SMALL)
    margin 1rem auto
    width WIDTH_SMALL

  @media(min-width BREAKPOINT_MEDIUM)
    margin 1.5rem auto

  li
    align-self center
    border-right 1px solid BRAND_COLOR
    flex-grow 1
    line-height 1
    list-style none
    width 33%

    &:last-child
      border none

  a
    background WHITE
    display block
    padding .75em 0
    text-align center

    &:link
    &:visited
      color BRAND_COLOR

    &:active
      background rgba(BRAND_COLOR, .1)
      color BRAND_COLOR

    &.current
      background BRAND_COLOR
      color WHITE

.no-touch
  .tabs
    a
      &:hover
        background rgba(BRAND_COLOR, .1)
        color BRAND_COLOR

      &.current:hover
        background BRAND_COLOR
        color WHITE

</style>
