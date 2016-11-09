<template lang="pug">
  div.search-bar
    form.search-form(action="/search")
      input.search-input(
        name="q",
        type="search",
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
      if (query) {
        this.query = query.replace('?q=', '').replace('%20', ' ')
      } else {
        this.query = ''
      }
      this.$store.commit('setQuery', this.query)
    }
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.search-bar
  position-it(absolute, 0, 3rem, null, .75rem)

  display flex
  align-items center

  height header-height-base

  @media(min-width breakpoint-medium)
    height header-height-medium

.search-form
  position relative
  width 100%
  height inherit

  display flex
  align-items center

.search-input
  position absolute
  right 0
  margin 0
  transition all .2s ease

  sans()
  font-size em(13)
  border none

  &.closed
    padding .25rem 0
    width 0

  &.open
    padding .25rem .5rem
    width 100%

  &:focus
    outline none

</style>
