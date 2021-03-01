<template lang="pug">
  div.search-results
    h2.search-results__heading
      span.search-results__count {{ resultsCount }} for
      span.search-results__query {{ searchQuery }}
    div
      ol.previews
        recipe-preview(
          v-for="(recipe, index) in content.data",
          :index="index",
          :item="recipe",
          :key="recipe.slug",
          :showBadge="false",
          :showChapter="true",
          favoriteButton="toggle",
        )
</template>

<script>
import { mapGetters } from 'vuex';
import RecipePreview from './RecipePreview.vue';

export default {
  components: { RecipePreview },

  props: {
    content: Object,
  },

  mounted() {
    this.updateTitle();
  },

  computed: {
    ...mapGetters([
      'searchQuery',
    ]),

    /** @return {string} */
    resultsCount() {
      const count = this.content.data.length;
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
    /** Updates the document title with the user's search query. */
    updateTitle() {
      let pageTitle;
      if (this.searchQuery) {
        pageTitle = `Search Results for ${this.searchQuery}`;
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

  @media breakpoint.medium
    width '%s' % ContentWidth.MEDIUM

.search-results .preview
  transition all .5s ease

@media breakpoint.medium
  .search-results .preview__link--recipe
    border-left 1px solid var(--border-color)
    border-right 1px solid var(--border-color)

.search-results__heading
  small_caps(14)
  margin 0
  padding 1.5rem 0
  text-align center

  @media breakpoint.medium
    padding 2rem 0

.search-results__count
  typeface('sans')

.search-results__query
  typeface('sans_bold')

.search-results__query::before
  content ' '

</style>
