<template lang="pug">
  nav.breadcrumbs
    ul
      li
        a(href="/") Home
      li
        a(href="#") {{ crumb }}
      li {{ current }}
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

  @media(min-width breakpoint-large)
    width auto

    &.info
      margin-left 8rem


  ul
    margin 0 1rem

  li
    display inline-block
    margin 0 .5em 0 0
    list-style none

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
    display inline-block
    padding .75rem 0

    &:link
    &:visited
      color brand-color

    &:active
      color dark-grey

.no-touch
  .breadcrumbs
    a
      &:hover
      &:visited:hover
        color medium-grey

</style>
