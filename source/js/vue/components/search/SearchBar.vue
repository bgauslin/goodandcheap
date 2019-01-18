<template lang="pug">
  div.search-bar
    form.search-form(
      action="/search",
    )
      input.search-input(
        :class="{ open : open, closed : !open }",
        :value="query",
        id="query",
        name="q",
        placeholder="Search",
        type="text",
        autofocus,
        aria-label="Your search keywords",
      )
    search-toggle(
      :open="open",
    )
</template>

<script>
import SearchToggle from './SearchToggle.vue';

export default {
  components: { SearchToggle },

  props: ['query'],

  computed: {
    /** @return {boolean} */
    open() {
      return this.$store.getters.getShowSearch;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.search-bar
  align-items center
  display flex
  height HEADER_HEIGHT_BASE
  position_it(absolute, 0, 2.5rem, null, MARGINS_BASE)

  @media BREAKPOINT_SMALL
    left 5.5rem
    right 3rem

  @media BREAKPOINT_MEDIUM
    height HEADER_HEIGHT_MEDIUM
    left 50%

  @media BREAKPOINT_LARGE
    left calc(50% + 6rem)

.search-form
  align-items center
  display flex
  height 100%
  position relative
  width 100%

.search-input
  appearance none
  border none
  border-radius 2px
  color black
  font-family monospace
  font-size 1em
  margin 0
  position_it(absolute, .5rem, 0, .5rem, null)
  transition all .2s ease

  @media BREAKPOINT_MEDIUM
    bottom px_to_rem(14)
    top px_to_rem(14)

.search-input:focus
  outline none

.search-input.closed
  padding px_to_rem(4) 0
  width 0
  z-index -1

.search-input.open
  padding px_to_rem(4)
  width 100%
  z-index 2

</style>
