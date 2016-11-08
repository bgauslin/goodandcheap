<template lang="pug">
  div.search-bar
    form.search-form(action="/search")
      input.search-input(
        name="q",
        type="search",
        :value="query",
        placeholder="Search"
      )
    search-toggle
</template>

<script>
import SearchToggle from './SearchToggle.vue'
export default {
  components: { SearchToggle },

  data () {
    return {
      showInput: false,
      query: this.$store.getters.getQuery
    }
  },

  created () {
    this.getQuery()
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
    },

    toggleInput() {
      // TODO catch state from search-toggle
    }
  }


}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.search-bar
  position-it(absolute, 0, 3rem, null, 3rem)
  display flex
  height header-height-base

  @media(min-width breakpoint-medium)
    height header-height-medium

.search-form
  display flex
  align-items center
  align-self stretch
  flex 1

.search-input
  flex 1
  margin 0
  padding .25rem .5rem
  sans()
  font-size em(13)
  border none

  &:focus
    outline none

</style>
