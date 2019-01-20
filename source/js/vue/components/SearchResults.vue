<template lang="pug">
  div.search-results
    h2.search-results__heading
      span.search-results__count {{ resultsCount }} for
      span.search-results__query {{ query }}
    div
      ol.previews
        recipe-preview(
          v-for="(recipe, index) in data.data",
          :index="index",
          :item="recipe",
          :key="recipe.slug",
          :showBadge="false",
          :showChapter="true",
          favoriteButton="toggle",
        )
</template>

<script>
import RecipePreview from './RecipePreview.vue';

export default {
  components: { RecipePreview },

  props: [
    'data',
    'query',
  ],

  mounted() {
    this.updateTitle();
  },

  computed: {
    /** @return {string} */
    resultsCount() {
      const count = this.data.data.length;
      let text;

      if (count <= 0 ) {
        text = 'No Results';
      } else if (count === 1) {
        text = '1 Result';
      } else {
        text = `${count} Results`;
      }

      return text;
    },
  },

  methods: {
    /** @description Updates the document title with the user's search query. */
    updateTitle() {
      let pageTitle;
      if (this.query) {
        pageTitle = `Search Results for ${this.query}`;
      }
      document.title = `${pageTitle} · ${this.$root.siteName}`;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.search-results
  margin 0 auto

  @media Breakpoint.MEDIUM
    width '%s' % ElementWidth.MEDIUM

.search-results .preview
  transition all .5s ease

@media Breakpoint.MEDIUM
  .search-results .preview a
    border-left 1px solid '%s' % Branding.BORDER
    border-right 1px solid '%s' % Branding.BORDER

.search-results__heading
  margin 0
  padding 1.5rem 0
  small_caps(14)
  text-align center

  @media Breakpoint.MEDIUM
    padding 2rem 0

.search-results__count
  typeface('sans')

.search-results__query
  typeface('sans_bold')

  &::before
    content ' '

</style>
