







<style lang="stylus">

.search-toggle
  position absolute
  top 0
  left 0
  width header-height
  height header-height
  line-height header-height
  text-align center
  color white

  &:active
    color rgba(white, .7)

  &::before
    icon()
    font-size em(16)
    content '\e804' // search

    position relative
    top -.1em

  &.open
    &::before
      content '\e809' // cancel

.no-touch
  .search-toggle
    &:hover,
    &:visited:hover
      color rgba(white, .7)

</style>
