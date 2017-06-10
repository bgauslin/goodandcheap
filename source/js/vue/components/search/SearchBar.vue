<template lang="pug">
  div.search-bar
    form.search-form(action="/search")
      input.search-input(
        name="q",
        type="text",
        :value="query",
        :class="{ open : open, closed : !open }",
        placeholder="Search"
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
    // NOTE borked in iOS Safari
    //document.addEventListener('click', this.closeIt)
  },

  updated () {
    // NOTE borked in iOS Safari
    //this.focusInput()
  },

  beforeDestroy: function () {
    //document.removeEventListener('click', this.closeIt)
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
    focusInput () {
      this.$el.querySelectorAll('.search-input')[0].focus()
    },
    closeIt () {
      let active = document.activeElement.tagName
      if (active !== 'INPUT') {
        this.$store.commit('setSearch', false)
      }
    }
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/_config/'

.search-bar
  align-items center
  display flex
  height HEADER_HEIGHT_BASE
  position_it(absolute, 0, 3rem, null, MARGINS_BASE)

  @media(min-width BREAKPOINT_SMALL)
    left 5.5rem
    right 3.5rem

  @media(min-width BREAKPOINT_MEDIUM)
    height HEADER_HEIGHT_MEDIUM

  @media(min-width BREAKPOINT_LARGE)
    left calc(50% + 6rem)

  @media(min-width BREAKPOINT_XLARGE)
    left calc(50% + 8rem)

.search-form
  align-items center
  display flex
  height 100%
  position relative
  width 100%

input[type="search"]
  appearance none
  border-radius 0

.search-input
  appearance none
  border none
  border-radius 0
  font-size px_to_em(13)
  margin 0
  position_it(absolute, .5rem, 0, .5rem, null)
  font_sans()
  transition all .2s ease

  @media(min-width BREAKPOINT_MEDIUM)
    bottom px_to_rem(14)
    top px_to_rem(14)

  &.closed
    padding px_to_rem(4) 0
    width 0
    z-index -1

  &.open
    padding px_to_rem(4)
    width 100%
    z-index 2

  &:focus
    outline none

</style>
