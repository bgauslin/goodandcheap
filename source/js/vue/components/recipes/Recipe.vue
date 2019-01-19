<template lang="pug">
  div.recipe
    div.recipe__content
      recipe-cover(
        :budget="data.budget",
        :image="data.photo",
        :title="data.title",
      )
      div.recipe__overview
        header.recipe__header
          p.recipe__kind(
            v-if="data.kind !== 'Recipe'",
          ) {{ data.kind }}

          h1.recipe__title {{ data.title }}
          
          h2.recipe__tagline(
            v-if="data.tagline",
          ) {{ data.tagline }}
          
          badge(
            v-if="data.badge",
          )

        toggle-favorite(
          v-if="allowFavorites",
          :favorite="data",
        )

        ul.recipe__tabs(
          v-if="data.ingredients || data.instructions",
        )
          li.recipe__tabs__item(
            v-if="data.blurb || data.recipeBlocks || data.copyBlocks",
          )
            router-link(
              class="recipe__tabs__link",
              :to="{ name: 'recipe', params: { chapter: data.parent.slug, slug: data.slug } }",
              exact
            ) Intro

          li.recipe__tabs__item(
            v-if="data.ingredients",
          )
            router-link(
              class="recipe__tabs__link",
              :to="{ name: 'ingredients', params: { chapter: data.parent.slug, slug: data.slug } }",
            ) Ingredients

          li.recipe__tabs__item(
            v-if="data.instructions",
          )
            router-link(
              class="recipe__tabs__link",
              :to="{ name: 'steps', params: { chapter: data.parent.slug, slug: data.slug } }",
            ) Steps

        router-view(
          :blurb="data.blurb",
          :copyBlocks="data.copyBlocks",
          :ingredients="data.ingredients",
          :instructions="data.instructions",
          :recipeBlocks="data.recipeBlocks",
          :parentId="data.id",
        )

      alpha-overlay
</template>

<script>
import AlphaOverlay from '../partials/AlphaOverlay.vue';
import Badge from './Badge.vue';
import getBreakpointValue from '../../../modules/getBreakpointValue';
import RecipeCover from './RecipeCover.vue';
import ToggleFavorite from '../favorites/ToggleFavorite.vue';

export default {
  components: {
    AlphaOverlay,
    Badge,
    RecipeCover,
    ToggleFavorite,
  },

  props: ['data'],

  created() {
    window.addEventListener('resize', this.minHeight);
  },

  mounted() {
    this.addVisited(this.data.id);
    this.minHeight();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.minHeight);
  },

  computed: {
    /** @return {boolean} */
    allowFavorites() {
      return this.$store.getters.allowFavorites;
    },
  },

  methods: {
    /**
     * ...
     * @param {string} id - ...
     */
    addVisited(id) {
      this.$store.commit('addVisited', id);
    },

    /** @description ... */
    minHeight() {
      const overview = this.$el.querySelector('.recipe__overview');
      const overviewWidthPx = overview.offsetWidth;
      const overviewWidth = overviewWidthPx / 16 + 'em';

      if (getBreakpointValue() !== 'large' || getBreakpointValue() !== 'xlarge') {
        overview.style.minHeight = overviewWidth;
      } else {
        overview.style.minHeight = 'none';
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.recipe
  @media Breakpoint.SMALL
    margin 1.5rem MARGINS_SMALL 0

  @media Breakpoint.MEDIUM
    margin 2.25rem MARGINS_MEDIUM 0

  @media Breakpoint.LARGE
    margin 3rem MARGINS_LARGE 0

  @media Breakpoint.XLARGE
    margin 3rem auto 0
    width WIDTH_XLARGE

.recipe__content
  background white
  margin 0 auto

  @media Breakpoint.SMALL
    max-width STACKED_WIDTH

  @media Breakpoint.MEDIUM
    max-width none
    width STACKED_WIDTH

  @media Breakpoint.LARGE
    overflow hidden
    padding-bottom 50%
    position relative
    width 100%

.recipe__overview
  padding 1rem 1rem 2rem
  position relative

  @media Breakpoint.LARGE
    height 100%
    padding 1.5rem 1.5rem 4rem
    -webkit-overflow-scrolling touch
    overflow-y scroll
    position_it(absolute, 0, null, null, 0)
    width 50%

.recipe__overview h3
  font_sans_heavy()
  margin 0 0 1em
  small_caps()

.recipe__header
  margin 0 2rem 1rem 0

.recipe__kind
  font_sans_heavy()
  margin-bottom .5rem
  small_caps()

.recipe__title
  font_serif_heavy()

.recipe__tagline
  display inline-block
  font_sans_heavy()
  margin-right 0.5rem
  small_caps()

.recipe__tabs
  margin 0 0 1.5rem
  tabs()

  @media Breakpoint.SMALL
    margin 0 0 2rem

.recipe__tabs__item
  tabs_item()

.recipe__tabs__link
  tabs_link()

.no-touch .recipe__tabs__link
  tabs_link__no_touch()

</style>
