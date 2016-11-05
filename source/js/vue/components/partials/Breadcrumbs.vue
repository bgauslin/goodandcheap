<template lang="pug">
  nav.breadcrumbs
    ul
      li
        router-link(to="/", title="Home") Home
      li(v-if="parent")
        router-link(
          :to="{ name: parent.routeName, params: { slug: parent.slug } }",
          :title="parent.title"
        ) {{ parent.title }}
      li
        span {{ current }}
</template>

<script>
import getBreakpointValue from '../../../helpers/getBreakpointValue'

export default {

  props: ['parent', 'current'],

  mounted () {
    this.scrollBreadcrumbs()
  },

  methods: {
    scrollBreadcrumbs () {
      var offset = this.$el.offsetHeight

      if (getBreakpointValue() === 'base') {
        setTimeout(function() {
          window.scrollTo(0, offset)
        }, 0)
      } else {
        setTimeout(function() {
          window.scrollTo(0, 0)
        }, 0)
      }
    }
  }
}

</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.breadcrumbs
  width 100%
  white-space nowrap
  overflow-x scroll
  -webkit-overflow-scrolling touch
  sans()
  small-caps(12)
  color light-grey

  @media(min-width breakpoint-small)
    margin 0 margins-small

  @media(min-width breakpoint-medium)
    margin 0 margins-medium

  @media(min-width breakpoint-large)
    margin 0 margins-large

  @media(min-width breakpoint-xlarge)
    margin 0 auto
    width width-xlarge

  ul
    display flex
    padding 0 margins-base

    @media(min-width breakpoint-small)
      padding 0

  li
    list-style none
    margin 0 .5em 0 0

    &::after
      icon()
      content '\e801' // right-open
      font-size 75%
      position relative
      top -1px
      margin-left 1em

    &:last-child
      margin-right 1rem

      &::after
        display none

  a
  span
    display inline-block
    padding 1rem 0
  a
    link(brand-color, brand-color, dark-grey)
  span
    padding-right margins-base


.no-touch
  .breadcrumbs
    a
      link-hover(medium-grey)

</style>
