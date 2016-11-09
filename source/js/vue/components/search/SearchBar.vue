<template lang="pug">
  div.search-bar
    form.search-form(action="/search")
      input.search-input(
        name="q",
        type="text",
        :value="query",
        :class="{ open : open, closed : !open }",
        placeholder="Search",
        autofocus
      )
    search-toggle(:open="open")
</template>

<script>
import SearchToggle from './SearchToggle.vue'
export default {
  components: { SearchToggle },

  data () {
    return {
      query: ''
    }
  },

  created () {
    this.getQuery()
  },

  computed: {
    open () {
      return this.$store.getters.getShowSearch
    }
  },

  methods: {
    getQuery () {
      var query = window.location.search
      this.query = (query) ? query.replace('?q=', '').replace('%20', ' ') : null
      this.$store.commit('setQuery', this.query)
    },
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.search-bar
  position-it(absolute, 0, 3rem, null, margins-base)

  display flex
  align-items center

  height header-height-base

  @media(min-width breakpoint-small)
    right 3.5rem
    left 5.5rem

  @media(min-width breakpoint-medium)
    height header-height-medium

  @media(min-width breakpoint-large)
    left calc(50% + 6rem)

  @media(min-width breakpoint-xlarge)
    left calc(50% + 8rem)

.search-form
  position relative
  width 100%
  height 100%

  display flex
  align-items center

input[type="search"]
  appearance none
  border-radius 0

.search-input
  appearance none
  border-radius 0

  position-it(absolute, .5rem, 0, .5rem, null)

  margin 0
  transition all .2s ease

  sans()
  font-size em(13)
  border none

  @media(min-width breakpoint-medium)
    top .875rem
    bottom .875rem

  &.closed
    padding .25rem 0
    width 0
    z-index -1

  &.open
    padding .25rem
    width 100%
    z-index 2

  &:focus
    outline none

</style>
