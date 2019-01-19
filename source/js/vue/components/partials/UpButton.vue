<template lang="pug">
  div.up-button(
    v-if="parent !== null",
  )
    router-link(
      v-if="parent && parent.slug",
      :to="{ name: parent.routeName, params: { slug: parent.slug } }",
      :title="parent.title",
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
  props: ['parent'],
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.up-button
  position_it(absolute, 0, null, null, 0)
  width 3rem
  z-index 2

  @media Breakpoint.MEDIUM
    width auto

.up-button a
  align-items center
  align-self stretch
  display flex
  height '%s' % HeaderHeight.BASE
  line-height 1
  link(white, white, rgba(white, .7))
  padding-left .75rem

  @media Breakpoint.SMALL
    padding-left 0

  @media Breakpoint.MEDIUM
    height '%s' % HeaderHeight.MEDIUM

.up-button span
  display none
  font_sans()
  small_caps(12)
  white-space nowrap

  @media Breakpoint.MEDIUM
    display block

.up-button a::before
  content '%s' % Icon.ANGLE_LEFT
  font-size px_to_em(22)
  icon()
  margin-right .25em
  position relative
  top -.05em

.up-button a:active
  transform scale(.9)
  transition .3s ease

.no-touch .up-button a
  link_hover(rgba(white, .7))

</style>
