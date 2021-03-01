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
  background var(--background-1)
  flex 1 1
  line-height 1
  list-style none
  margin 0

.tabs__item:not(:last-child)
  border-right 1px solid var(--brand-color)

.tabs__link
  link(var(--brand-color), var(--brand-color), var(--text-1-color), var(--text-1-color))
  small_caps()
  typeface('sans_bold')
  display block
  padding .75em 1em
  text-align center

.tabs__link.current
  cursor default

.tabs__link.current
[no-touch] .tabs__link.current:hover
  background var(--brand-color)
  color var(--background-1)

</style>
