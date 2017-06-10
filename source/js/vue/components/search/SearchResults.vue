<template lang="pug">
  div.search-results
    h2
      span.count {{ resultsCount }} for
      span.query {{ query }}
    div
      ol.previews
        recipe-preview(
          favoriteButton="toggle",
          v-for="(recipe, index) in data.data",
          :index="index",
          :item="recipe",
          :key="recipe",
          :showBadge="false",
          :showChapter="true"
        )
</template>

<script>
import RecipePreview from '../recipes/Preview.vue'
export default {
  components: { RecipePreview },

  props: ['data'],

  data () {
    return {
      query: this.$store.getters.getQuery
    }
  },

  computed: {
    resultsCount () {
      var text
      var count = this.data.data.length
      if (count <= 0 ) {
        text = 'No Results'
      } else if (count === 1) {
        text = '1 Result'
      } else {
        text = count + ' Results'
      }
      return text
    }
  },

  mounted () {
    this.updateTitle()
  },

  methods: {
    updateTitle () {
      var title = 'Search Results'
      if (this.query) {
        title += ' for ' + this.query
      }
      document.title = title + ' · ' + this.$root.siteName
    }
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/_config/'

.search-results
  margin 0 auto

  @media(min-width BREAKPOINT_MEDIUM)
    width WIDTH_MEDIUM

  .preview
    transition all .5s ease

    @media(min-width BREAKPOINT_MEDIUM)
      a
        border-left 1px solid BORDER_COLOR
        border-right 1px solid BORDER_COLOR

  h2
    margin 0
    padding 1.5rem 0
    small_caps(14)
    text-align center

    @media(min-width BREAKPOINT_MEDIUM)
      padding 2rem 0

    .count
      font_sans()

    .query
      font_sans_heavy()

      &::before
        content ' '

</style>
