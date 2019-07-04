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
import setup from '../../setup';

export default {
  props: {
    current: String,
    parent: {
      routeName: String,
      slug: String,
      title: String,
    },
  },

  mounted() {
    this.scrollBreadcrumbs();
  },

  methods: {
    /**
     * @description Moves the breadcrumbs list out of the viewport so that
     * they're only revealed when the user scrolls up slightly, depending on
     * media query breakpoint.
     */
    scrollBreadcrumbs() {
      const offset = this.$el.offsetHeight;

      if (setup.getBreakpointValue() === 'base') {
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
@import '../../../stylus/config/'

.breadcrumbs
  color var(--medium-grey)
  overflow-x scroll
  -webkit-overflow-scrolling touch
  small_caps(12)
  typeface('sans')
  white-space nowrap
  width 100%

  @media Breakpoint.SMALL
    margin var(--header-height) var(--margin) 0
    max-width PAGE_WIDTH_STACKED

  @media Breakpoint.MEDIUM
    margin var(--header-height) auto 0
    max-width none
    width PAGE_WIDTH_STACKED

  @media Breakpoint.LARGE
    margin-left var(--margin)
    margin-right var(--margin)
    width auto

  @media Breakpoint.XLARGE
    margin-left auto
    margin-right auto
    width var(--element-width)

.breadcrumbs__list
  display flex
  padding 0 var(--margin)

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
  link(var(--link), var(--link), var(--medium-grey), var(--dark-grey))

.breadcrumbs__label
  padding-right var(--margin)

</style>
