<template lang="pug">
  div.back-button(
    v-if="parent",
  )
    router-link.back-button__link(
      :to="route()",
      :title="parent.title",
    )
      span.back-button__label {{ parent.title }}
</template>

<script>
export default {
  props: {
    parent: {
      routeName: String,
      slug: String,
      title: String,
    },
  },

  methods: {
    route() {
      if (this.parent.slug) {
        return {
          name: this.parent.routeName,
          params: { 
            slug: this.parent.slug
          }
        };
      } else {
        return {
          name: this.parent.routeName
        };
      }
    }
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.back-button
  position_it(absolute, 0, null, null, 0)
  width 3rem
  z-index 2

  @media Breakpoint.MEDIUM
    width auto

.back-button__link
  align-items center
  align-self stretch
  display flex
  height var(--header-height)
  line-height 1
  link(white, white, rgba(white, .7), rgba(white, .7))
  padding-left .75rem

  @media Breakpoint.SMALL
    padding-left 0

.back-button__link::before
  content '%s' % Icon.ANGLE_LEFT
  font-size px_to_em(22)
  icon()
  margin-right .25em
  position relative
  top -.05em

.back-button__link:active
  transform scale(.9)
  transition .3s ease

.back-button__label
  display none
  small_caps(12)
  typeface('sans')
  white-space nowrap

  @media Breakpoint.MEDIUM
    display block

</style>
