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
  display flex
  justify-content center
  align-items center

  width header-height-base
  height header-height-base

  a
    link(white, white, rgba(white, .7))

    &::before
      icon()
      font-size em(22)
      content '\e802' // angle-left
      position relative
      left -.25rem

      @media(min-width breakpoint-small)
        left -1rem

  &.hide
    visibility hidden

.no-touch
  .up-button
    a
      link-hover(rgba(white, .7))

</style>
