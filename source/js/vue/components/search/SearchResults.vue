<template lang="pug">
  div.search-results
    h2
      span.count {{ resultsCount }} for
      span.query {{ query }}
    div
      ol.previews
        recipe-preview(
          v-for="(recipe, index) in data.data",
          :item="recipe",
          :index="index",
          :key="recipe",
          :showChapter="true",
          :showBadge="false",
          favoriteButton="toggle"
        )
</template>

<script>
import RecipePreview from '../recipes/Preview.vue'
export default {

  components: { RecipePreview },

  props: ['data'],

  data () {
    return {
      query: this.$route.params.query
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
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.search-results
  margin 0 auto

  @media(min-width breakpoint-medium)
    width width-medium

  .previews
    animation slideInUp .3s ease-out

  .preview
    transition all .5s ease

    @media(min-width breakpoint-medium)
      a
        border-right 1px solid border-color
        border-left 1px solid border-color

  h2
    margin 1em 0
    text-align center
    small-caps(14)
    .count
      sans()
    .query
      sans-heavy()
      &::before
        content ' '

</style>
