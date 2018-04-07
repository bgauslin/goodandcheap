<template lang="pug">
  ul.tabs
    li.tabs__item(
      v-for="tab in tabs",
    )
      router-link(
        class="tabs__link",
        v-if="tab.name",
        :to="{ name: tab.name }",
        :title="tab.label",
        exact
      ) {{ tab.label }}
</template>

<script>
export default {
  props: ['tabs'],
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.tabs
  margin 1rem MARGINS_BASE
  tabs()

  @media (min-width BREAKPOINT_SMALL)
    margin 1rem auto
    width WIDTH_SMALL

  @media (min-width BREAKPOINT_MEDIUM)
    margin 1.5rem auto

.tabs__item
  flex 0 0 50%
  tabs_item()

.tabs__link
  tabs_link()

.no-touch .tabs__link
  tabs_link__no_touch()

</style>
