<template lang="pug">
  div.up-button(v-if="parent !== null")
    router-link(
      v-if="parent && parent.slug",
      :to="{ name: parent.routeName, params: { slug: parent.slug } }",
      :title="parent.title"
    )
      span {{ parent.title }}
    router-link(
      v-if="parent && !parent.slug",
      :to="{ name: parent.routeName }",
      :title="parent.title",
      exact
    )
      span {{ parent.title }}
</template>

<script>
export default {
  props: ['parent']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.up-button
  position_it(absolute, 0, null, null, 0)
  width 3rem
  z-index 2

  @media(min-width BREAKPOINT_MEDIUM)
    width auto

  a
    align-items center
    align-self stretch
    display flex
    height HEADER_HEIGHT_BASE
    line-height 1
    link(WHITE, WHITE, rgba(WHITE, .7))
    padding-left .75rem

    @media(min-width BREAKPOINT_SMALL)
      padding-left 0

    @media(min-width BREAKPOINT_MEDIUM)
      height HEADER_HEIGHT_MEDIUM

    span
      display none
      sans()
      small_caps(12)
      white-space nowrap

      @media(min-width BREAKPOINT_MEDIUM)
        display block

    &::before
      content ICON_ANGLE_LEFT
      font-size px_to_em(22)
      icon()
      margin-right .25em
      position relative
      top -.05em

    &:active
      transform scale(.9)
      transition .3s ease

.no-touch
  .up-button
    a
      link_hover(rgba(WHITE, .7))

</style>
