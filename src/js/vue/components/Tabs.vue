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
  background var(--background-2)
  border-radius 8px
  display flex
  margin 1rem var(--margin)
  padding 4px

.tabs__item
  flex 1 1
  line-height 1
  list-style none
  margin 0

.tabs__link
  link(var(--text-1-color), var(--text-1-color), var(--text-2-color), var(--text-2-color))
  small_caps()
  typeface('sans_bold')
  border-radius 4px
  display block
  padding .75em 1em
  text-align center

.tabs__link.current
  cursor default
  elevation(1)

.tabs__link.current
[no-touch] .tabs__link.current:hover
  background var(--background-3, background-1)
  color var(--text-1-color)

</style>
