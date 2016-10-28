<template lang="pug">
  nav.breadcrumbs
    ul
      li
        a(href="/") Home
      li
        a(href="#") {{ crumb }}
      li
        span {{ current }}
</template>

<script>
export default {
  data () {
    return {
      crumb: 'Crumb',
      current: 'Current'
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
  body-font()
  small-caps(12)
  color light-grey

  @media(min-width breakpoint-small)
    margin 0 margins-small
    //width auto

  @media(min-width breakpoint-medium)
    margin 0 margins-medium

  @media(min-width breakpoint-large)
    margin 0 margins-large

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
