<template lang="pug">
  ul.tabs
    li(v-for="tab in tabs")
      router-link(v-if="tab.name", :to="{ name: tab.name }", :title="tab.label", exact) {{ tab.label }}
</template>

<script>

export default {
  props: ['tabs']
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.tabs
  display flex
  flex-direction row
  justify-content space-between

  margin 1rem margins-base
  overflow hidden

  sans()
  small-caps(11)
  border 1px solid brand-color
  border-radius 4px

  @media(min-width breakpoint-small)
    margin 1rem auto
    width width-small

  @media(min-width breakpoint-medium)
    margin 1.5rem auto

  li
    flex-grow 1
    width 33%
    align-self center
    list-style none
    line-height 1
    border-right 1px solid brand-color

    &:last-child
      border none

    a
      display block
      padding .75em 0
      text-align center
      background white

      &:link
      &:visited
        color brand-color

      &.current
      &.current:hover
        color white
        background brand-color


</style>
