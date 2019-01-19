<template lang="pug">
  nav.breadcrumbs
    ul.breadcrumbs__list
      li.breadcrumbs__item
        router-link(
          :to="{ name: 'chapters' }",
          title="Recipes",
        ) Recipes
      li.breadcrumbs__item(
        v-if="parent",
      )
        router-link(
          class="breadcrumbs__link",
          :to="{ name: parent.routeName, params: { slug: parent.slug } }",
          :title="parent.title",
        ) {{ parent.title }}
      li.breadcrumbs__item
        span.breadcrumbs__label {{ current }}
</template>

<script>
import getBreakpointValue from '../../../modules/getBreakpointValue';
export default {
  props: [
    'current',
    'parent',
  ],

  mounted() {
    this.scrollBreadcrumbs();
  },

  methods: {
    /**
     * @description Moves the breadcrumbs list out of the viewport so that
     * they're only revealed when the user scrolls up slightly.
     */
    scrollBreadcrumbs() {
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

.breadcrumbs
  color '%s' % Color.MEDIUM_GREY
  overflow-x scroll
  -webkit-overflow-scrolling touch
  font_sans()
  small_caps(12)
  white-space nowrap
  width 100%

  @media BREAKPOINT_SMALL
    margin HEADER_HEIGHT_BASE MARGINS_SMALL 0
    max-width STACKED_WIDTH

  @media BREAKPOINT_MEDIUM
    margin HEADER_HEIGHT_MEDIUM auto 0
    max-width none
    width STACKED_WIDTH

  @media BREAKPOINT_LARGE
    margin-left MARGINS_LARGE
    margin-right MARGINS_LARGE
    width auto

  @media BREAKPOINT_XLARGE
    margin-left auto
    margin-right auto
    width WIDTH_XLARGE

.breadcrumbs__list
  display flex
  padding 0 MARGINS_BASE

  @media BREAKPOINT_SMALL
    padding 0

.breadcrumbs__item
  list-style none
  margin 0 .5em 0 0

  &::after
    content '%s' % Icon.RIGHT_OPEN
    font-size 75%
    icon()
    margin-left 1em
    position relative
    top -1px

  &:last-child
    margin-right 1rem

    &::after
      display none

.breadcrumbs__link
.breadcrumbs__label
  display inline-block
  padding 1rem 0

.breadcrumbs__link
  link(BRAND_COLOR, BRAND_COLOR, Color.DARK_GREY)

.breadcrumbs__label
  padding-right MARGINS_BASE

.no-touch .breadcrumbs__link
  link_hover(Color.MEDIUM_GREY)

</style>
