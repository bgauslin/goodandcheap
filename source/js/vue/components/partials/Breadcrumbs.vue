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
  font_sans()
  overflow-x scroll
  -webkit-overflow-scrolling touch
  small_caps(12)
  white-space nowrap
  width 100%

  @media Breakpoint.SMALL
    margin '%s %s 0' % (Layout.HeaderHeight.BASE Layout.Margins.SMALL)
    max-width '%s' % Layout.Width.STACKED

  @media Breakpoint.MEDIUM
    margin '%s auto 0' % Layout.HeaderHeight.MEDIUM
    max-width none
    width '%s' % Layout.Width.STACKED

  @media Breakpoint.LARGE
    margin-left '%s' % Layout.Margins.LARGE
    margin-right '%s' % Layout.Margins.LARGE
    width auto

  @media Breakpoint.XLARGE
    margin-left auto
    margin-right auto
    width WIDTH_XLARGE

.breadcrumbs__list
  display flex
  padding '0 %s' % Layout.Margins.BASE

  @media Breakpoint.SMALL
    padding 0

.breadcrumbs__item
  list-style none
  margin 0 .5em 0 0

.breadcrumbs__item::after
  content '%s' % Icon.RIGHT_OPEN
  font-size 75%
  icon()
  margin-left 1em
  position relative
  top -1px

.breadcrumbs__item:last-child
  margin-right 1rem

.breadcrumbs__item:last-child::after
  display none

.breadcrumbs__link
.breadcrumbs__label
  display inline-block
  padding 1rem 0

.breadcrumbs__link
  link(Branding.PRIMARY, Branding.PRIMARY, Color.DARK_GREY)

.breadcrumbs__label
  padding-right '%s' % Layout.Margins.BASE

.no-touch .breadcrumbs__link
  link_hover(Color.MEDIUM_GREY)

</style>
