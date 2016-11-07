<template lang="pug">
  div.up-button(:class="{ hide: home }")
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
  props: ['parent', 'home']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.up-button
  position-it(absolute, 0, null, null, 0)
  width 3rem
  z-index 9999

  @media(min-width breakpoint-medium)
    width auto

  a
    display flex
    align-items center
    align-self stretch

    padding-left .75rem
    height header-height-base
    line-height 1

    link(white, white, rgba(white, .7))

    @media(min-width breakpoint-small)
      padding-left 0

    @media(min-width breakpoint-medium)
      height header-height-medium

    span
      display none
      sans()
      small-caps(13)
      white-space nowrap

      @media(min-width breakpoint-medium)
        display block

    &::before
      icon()
      font-size em(22)
      content '\e802' // angle-left
      margin-right .25em
      position relative
      top -.05em

  &.hide
    visibility hidden

.no-touch
  .up-button
    a
      link-hover(rgba(white, .7))

</style>
