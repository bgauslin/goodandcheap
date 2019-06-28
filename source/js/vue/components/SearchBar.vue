<template lang="pug">
  div.search-bar
    form.search-form(
      action="/search",
    )
      input.search-input(
        :class="{ 'open' : isOpen, 'closed' : !isOpen }",
        :value="searchQuery",
        id="query",
        name="q",
        placeholder="Search",
        type="text",
        autofocus,
        aria-label="Your search keywords",
      )
    search-toggle
</template>

<script>
import SearchToggle from './SearchToggle.vue';

export default {
  components: { SearchToggle },

  computed: {
    /** @return {boolean} */
    isOpen() {
      return this.$store.getters.showSearch;
    },

    /** @return {string} */
    searchQuery() {
      let query = window.location.search;
      return (query) ? query.replace('?q=', '').replace('%20', ' ') : '';
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.search-bar
  align-items center
  display flex
  height var(--header-height)
  position_it(absolute, 0, 2.5rem, null, Margin.BASE)

  @media Breakpoint.SMALL
    left 5.5rem // TODO: var() ???
    right 3rem

  @media Breakpoint.MEDIUM
    left 50%

  @media Breakpoint.LARGE
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

  @media Breakpoint.MEDIUM
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
