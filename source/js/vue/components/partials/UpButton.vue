<template lang="pug">
  div.up-button(:class="{ hide: home }")
    router-link(
      v-if="parent && parent.slug",
      :to="{ name: parent.routeName, params: { slug: parent.slug, direction: 'back' } }",
      :title="parent.title"
    )
    router-link(
      v-if="parent && !parent.slug",
      :to="{ name: parent.routeName, direction: 'back' }",
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
  width header-height-base

  a
    display flex
    justify-content center
    align-items center
    align-self stretch

    line-height 1

    @media(min-width breakpoint-small)
      margin-left -1rem

    link(white, white, rgba(white, .7))

    &::before
      icon()
      font-size em(22)
      content '\e802' // angle-left
      margin-left -.5rem

      @media(min-width breakpoint-small)
        margin-left 0

  &.hide
    visibility hidden

.no-touch
  .up-button
    a
      link-hover(rgba(white, .7))

</style>
