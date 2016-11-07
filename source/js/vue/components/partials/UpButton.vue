<template lang="pug">
  div.up-button(:class="{ hide: home }")
    router-link(
      v-if="parent && parent.slug",
      :to="{ name: parent.routeName, params: { slug: parent.slug, direction: 'back' } }",
      :title="parent.title"
    )
    router-link(
      v-if="parent && !parent.slug",
      :to="{ name: parent.routeName, params: { direction: 'back' } }",
      :title="parent.title",
      exact
    )
</template>

<script>
export default {
  props: ['parent', 'home']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.up-button
  position-it(absolute, 0, null, null, 0)

  a
    display flex
    align-items center
    align-self stretch

    width 3rem
    padding-left .75rem
    height header-height-base

    @media(min-width breakpoint-small)
      padding-left 0

    @media(min-width breakpoint-medium)
      height header-height-medium

    link(white, white, rgba(white, .7))

    &::before
      icon()
      font-size em(22)
      content '\e802' // angle-left

  &.hide
    visibility hidden

.no-touch
  .up-button
    a
      link-hover(rgba(white, .7))

</style>
