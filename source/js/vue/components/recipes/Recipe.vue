<template lang="pug">
  div.recipe
    div.recipe-content
      recipe-cover(
        :budget="data.budget",
        :image="data.photo",
        :title="data.title",
      )
      div.overview
        header
          p.kind(
            v-if="data.kind !== 'Recipe'",
          ) {{ data.kind }}

          h1 {{ data.title }}
          
          h2.tagline(
            v-if="data.tagline",
          ) {{ data.tagline }}
          
          badge(
            v-if="data.badge",
          )

        toggle-favorite(
          :favorite="data",
        )

        ul.tabs(
          v-if="data.ingredients || data.instructions",
        )
          li(
            v-if="data.blurb || data.recipeBlocks || data.copyBlocks",
          )
            router-link(
              :to="{ name: 'recipe', params: { chapter: data.parent.slug, slug: data.slug } }",
              exact,
            ) Intro

          li(
            v-if="data.ingredients",
          )
            router-link(
              :to="{ name: 'ingredients', params: { chapter: data.parent.slug, slug: data.slug } }",
            ) Ingredients

          li(
            v-if="data.instructions",
          )
            router-link(
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
import getBreakpointValue from '../../../helpers/getBreakpointValue';
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

  created () {
    window.addEventListener('resize', this.minHeight);
  },

  mounted () {
    this.addVisited(this.data.id);
    this.minHeight();
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.minHeight);
  },

  methods: {
    minHeight () {
      const overview = this.$el.querySelector('.overview');
      const overviewWidthPx = overview.offsetWidth;
      const overviewWidth = overviewWidthPx / 16 + 'em';

      if (getBreakpointValue() !== 'large' || getBreakpointValue() !== 'xlarge') {
        overview.style.minHeight = overviewWidth;
      } else {
        overview.style.minHeight = 'none';
      }
    },

    addVisited (id) {
      this.$store.commit('addVisited', id);
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.recipe
  .recipe-content
    background WHITE
    margin 0 auto

  @media(min-width BREAKPOINT_SMALL)
    margin 1.5rem MARGINS_SMALL 0

    .recipe-content
      max-width STACKED_WIDTH

  @media(min-width BREAKPOINT_MEDIUM)
    margin 2.25rem MARGINS_MEDIUM 0

    .recipe-content
      max-width none
      width STACKED_WIDTH

  @media(min-width BREAKPOINT_LARGE)
    margin 3rem MARGINS_LARGE 0

    .recipe-content
      overflow hidden
      padding-bottom 50%
      position relative
      width 100%

      .recipe-cover
        position_it(absolute, 0, 0, null, null)
        width 50%

      .overview
        height 100%
        padding-bottom 4rem
        -webkit-overflow-scrolling touch
        overflow-y scroll
        position_it(absolute, 0, null, null, 0)
        width 50%

  @media(min-width BREAKPOINT_XLARGE)
    margin 3rem auto 0
    width WIDTH_XLARGE

  .overview
    padding 1rem 1rem 2rem
    position relative

    @media(min-width BREAKPOINT_LARGE)
      padding 1.5rem 1.5rem 3rem

  .tagline
    display inline-block
    margin-right 0.5rem
    font_sans_heavy()
    small_caps()

  .tabs
    margin 0 0 1.5rem
    width 100%

    @media(min-width BREAKPOINT_SMALL)
      margin 0 0 2rem

    li
      margin 0

  .kind
    margin-bottom .5rem
    font_sans_heavy()
    small_caps()

  header
    margin 0 2rem 1rem 0

  h1
    font_serif_heavy()

  .toggle-favorite
    right 0
    top .25rem

    @media(min-width BREAKPOINT_LARGE)
      right .5rem
      top .75rem

  h3
    margin 0 0 1em
    font_sans_heavy()
    small_caps()

  .copy-block
    padding .5rem 0

    h4
      margin-bottom .25em

    p
      font_sans()

</style>
