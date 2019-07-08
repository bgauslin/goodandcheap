<template lang="pug">
  ul(
    :class="['tabs', 'tabs--' + modifier]",
  )
    li.tabs__item(
      v-for="tab in tabs",
    )
      router-link(
        class="tabs__link",
        :to="tab.route",
        :title="tab.label",
        exact
      ) {{ tab.label }}
</template>

<script>
export default {
  props: {
    modifier: String,
    tabs: Array,
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.tabs
  align-items center
  border 1px solid var(--brand-color)
  display flex
  margin 1rem var(--margin)
  overflow hidden

.tabs__item
  background white
  flex 1 1
  line-height 1
  list-style none
  margin 0

  &:not(:last-child)
    border-right 1px solid var(--brand-color)

.tabs__link
  display block
  link(var(--brand-color), var(--brand-color), var(--brand-color), var(--brand-color))
  link_background(white, white, rgba(BRAND_COLOR, .1), rgba(BRAND_COLOR, .1))
  padding .75em 1em
  small_caps()
  text-align center
  typeface('sans_bold')

.tabs__link.current
  background var(--brand-color)
  color white
  cursor default

[no-touch] .tabs__link.current:hover
  background var(--brand-color)
  color white

</style>
