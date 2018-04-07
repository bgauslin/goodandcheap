<template lang="pug">
  nav.breadcrumbs
    ul
      li
        router-link(
          :to="{ name: 'chapters' }",
          title="Recipes",
        ) Recipes
      li(
        v-if="parent",
      )
        router-link(
          :to="{ name: parent.routeName, params: { slug: parent.slug } }",
          :title="parent.title",
        ) {{ parent.title }}
      li
        span {{ current }}
</template>

<script>
import getBreakpointValue from '../../../helpers/getBreakpointValue';
export default {
  props: [
    'current',
    'parent',
  ],

  mounted () {
    this.scrollBreadcrumbs();
  },

  methods: {
    scrollBreadcrumbs () {
      const offset = this.$el.offsetHeight;

      if (getBreakpointValue() === 'base') {
        setTimeout(() => {
          window.scrollTo(0, offset)
        }, 0);
      } else {
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 0);
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

// TODO: BEM-ify selectors
.breadcrumbs
  color LIGHT_GREY
  overflow-x scroll
  -webkit-overflow-scrolling touch
  font_sans()
  small_caps(12)
  white-space nowrap
  width 100%

  @media (min-width BREAKPOINT_SMALL)
    margin HEADER_HEIGHT_BASE MARGINS_SMALL 0
    max-width STACKED_WIDTH

  @media (min-width BREAKPOINT_MEDIUM)
    margin HEADER_HEIGHT_MEDIUM auto 0
    max-width none
    width STACKED_WIDTH

  @media (min-width BREAKPOINT_LARGE)
    margin-left MARGINS_LARGE
    margin-right MARGINS_LARGE
    width auto

  @media (min-width BREAKPOINT_XLARGE)
    margin-left auto
    margin-right auto
    width WIDTH_XLARGE

  ul
    display flex
    padding 0 MARGINS_BASE

    @media (min-width BREAKPOINT_SMALL)
      padding 0

  li
    list-style none
    margin 0 .5em 0 0

    &::after
      content ICON_RIGHT_OPEN
      font-size 75%
      icon()
      margin-left 1em
      position relative
      top -1px

    &:last-child
      margin-right 1rem

      &::after
        display none

  a
  span
    display inline-block
    padding 1rem 0

  a
    link(BRAND_COLOR, BRAND_COLOR, DARK_GREY)

  span
    padding-right MARGINS_BASE

.no-touch
  .breadcrumbs
    a
      link_hover(MEDIUM_GREY)

</style>
