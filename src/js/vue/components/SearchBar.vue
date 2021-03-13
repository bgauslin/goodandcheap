<template lang="pug">
  .search-bar
    form.search-form(
      action="/search"
    )
      input.search-input(
        :class="[ showSearch ? 'open' : 'closed' ]"
        :value="searchQuery"
        id="query"
        name="q"
        placeholder="Search"
        type="text"
        autofocus,
        aria-label="Your search keywords"
      )
    search-toggle
</template>

<script>
import { mapGetters } from 'vuex';
import SearchToggle from './SearchToggle.vue';

export default {
  components: { SearchToggle },

  computed: {
    ...mapGetters([
      'searchQuery',
      'showSearch',
    ]),
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.search-bar
  align-items center
  display flex
  height 100%
  justify-self end

.search-form
  align-items center
  display flex
  height 100%
  position relative

.search-input
  appearance none
  border none
  border-radius 2px
  bottom .5rem
  color black
  font-family monospace
  font-size 1em
  margin 0
  position absolute
  right 0
  top .5rem
  transition all .2s ease

  @media breakpoint.medium
    bottom rem(14)
    top rem(14)

.search-input:focus
  outline none

.search-input.closed
  padding rem(4) 0
  width 0
  z-index -1

.search-input.open
  padding rem(4)
  width 50vw
  z-index 2

</style>
