<template lang="pug">
  nav.breadcrumbs
    ul
      li
        router-link(to="/", title="Home") Home
      li(v-if="parents", v-for="parent in parents")
        router-link(
          :to="{ name: parent.type, params: { slug: parent.slug } }",
          :title="parent.title"
        ) {{ parent.title }}
      li
        span {{ current }}
</template>

<script>
import getBreakpointValue from '../../../helpers/getBreakpointValue'

export default {

  props: ['parents', 'current'],

  created () {
    // TODO: call function on load
    window.addEventListener('onload', this.scrollViewport)
    window.addEventListener('resize', this.scrollViewport)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.scrollViewport)
  },

  methods: {
    scrollViewport () {
      if (getBreakpointValue() === 'base' || getBreakpointValue() === 'small') {
        var offset = this.$el.offsetHeight
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
    margin .5rem margins-small

  @media(min-width breakpoint-medium)
    margin .75rem margins-medium

  @media(min-width breakpoint-large)
    margin-right margins-large
    margin-left margins-large

  @media(min-width breakpoint-xlarge)
    margin-right auto
    margin-left auto
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
    padding .75rem 0
  a
    link(brand-color, brand-color, dark-grey)

.no-touch
  .breadcrumbs
    a
      link-hover(medium-grey)

</style>
