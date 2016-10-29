<template lang="pug">
  div.search-bar
    form.search-form(action="")
      input.search(
        type="search",
        name="q",
        placeholder="Search",
        value="",
      )
      button.go Go
</template>

<script>
export default {
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.search-bar
  padding 0 1rem 1rem

  &.closed
    display none

  &.open
    display block

  @media (min-width breakpoint-small)
    margin-right auto
    margin-left auto
    width small

.search-form
  display flex
  width 100%

.search
.go
  border none

  &:first-child
    border-radius 4px 0 0 4px

  &:last-child
    border-radius 0 4px 4px 0

.search
  flex 1
  margin 0
  padding .3em
  sans()
  font-size em(13)

  &:focus
    outline none

  &:not(:first-child)
    border-left 0

  &:not(:last-child)
    border-right 0

.go
  padding .3em 1em
  sans()
  small-caps(13)
  color white
  background mix(black, brand-color, 25%)


</style>
