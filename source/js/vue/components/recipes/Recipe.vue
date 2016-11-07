<template lang="pug">
  div.recipe
    div.recipe-content
      recipe-cover(
        :image="data.photo",
        :title="data.title",
        :budget="data.budget"
      )
      div.overview
        header
          p.kind(v-if="data.kind !== 'Recipe'") {{ data.kind }}
          h1 {{ data.title }}
          h2.tagline(v-if="data.tagline") {{ data.tagline }}
          badge(v-if="data.badge")
        toggle-favorite(:favorite="data")

        ul.tabs(v-if="data.ingredients || data.instructions")
          li(v-if="data.blurb || data.recipeBlocks || data.copyBlocks")
            router-link(
              :to="{ name: 'recipe', params: { chapter: data.parent.slug, slug: data.slug } }",
              exact
            ) Intro
          li(v-if="data.ingredients")
            router-link(
              :to="{ name: 'ingredients', params: { chapter: data.parent.slug, slug: data.slug } }"
            ) Ingredients
          li(v-if="data.instructions")
            router-link(
              :to="{ name: 'steps', params: { chapter: data.parent.slug, slug: data.slug } }"
            ) Steps

        router-view(
          :blurb="data.blurb",
          :ingredients="data.ingredients",
          :instructions="data.instructions"
        )

        recipe-blocks(v-if="data.kind === 'Ideas'", :data="data.recipeBlocks")
        copy-blocks(v-if="data.kind === 'Method'", :data="data.copyBlocks")

      alpha-overlay
</template>

<script>
import RecipeCover from './RecipeCover.vue'
import ToggleFavorite from '../favorites/ToggleFavorite.vue'
import Badge from './Badge.vue'
import AlphaOverlay from '../partials/AlphaOverlay.vue'
import CopyBlocks from './copyBlocks/CopyBlocks.vue'
import RecipeBlocks from './recipeBlocks/RecipeBlocks.vue'

import getBreakpointValue from '../../../helpers/getBreakpointValue'

export default {
  components: { RecipeCover, ToggleFavorite, Badge, AlphaOverlay, CopyBlocks, RecipeBlocks },

  props: ['data'],

  created () {
    window.addEventListener('resize', this.minHeight)
  },

  mounted () {
    this.minHeight()
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.minHeight)
  },

  methods: {
    minHeight () {
      var overview = this.$el.querySelector('.overview')
      var overviewWidthPx = overview.offsetWidth
      var overviewWidth = overviewWidthPx / 16 + 'em'

      if (getBreakpointValue() !== 'large' || getBreakpointValue() !== 'xlarge') {
        overview.style.minHeight = overviewWidth
      } else {
        overview.style.minHeight = 'none'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.recipe
  .recipe-content
    margin 0 auto
    background white

  @media(min-width breakpoint-small)
    margin 1.5rem margins-small 0

    .recipe-content
      max-width stacked-width

  @media(min-width breakpoint-medium)
    margin 2.25rem margins-medium 0

    .recipe-content
      width stacked-width
      max-width none

  @media(min-width breakpoint-large)
    margin 3rem margins-large 0

    .recipe-content
      position relative
      width 100%
      padding-bottom 50%
      overflow hidden

      .recipe-cover
        position-it(absolute, 0, 0, null, null)
        width 50%

      .overview
        position-it(absolute, 0, null, null, 0)
        width 50%
        height 100%
        padding-bottom 4rem
        overflow-y scroll
        -webkit-overflow-scrolling touch

  @media(min-width breakpoint-xlarge)
    margin 3rem auto 0
    width width-xlarge

  .overview
    position relative
    padding 1rem 1rem 2rem
    animation slideInUp .3s ease-out

    @media(min-width breakpoint-large)
      padding 1.5rem 1.5rem 3rem

  .tagline
    display inline-block
    margin-right 0.5rem
    sans-heavy()
    small-caps()

  .tabs
    margin 0 0 1.5rem
    width 100%

    @media(min-width breakpoint-small)
      margin 0 0 2rem

    li
      margin 0

  .kind
    margin-bottom .5rem
    sans-heavy()
    small-caps()

  header
    margin 0 2rem 1rem 0

  h1
    serif-heavy()

  .toggle-favorite
    top .25rem
    right 0

    @media(min-width breakpoint-large)
      top .75rem
      right .5rem

  h3
    margin 0 0 1em
    sans-heavy()
    small-caps()

  .copy-block
    padding .5rem 0

    h4
      margin-bottom .25em
    p
      sans()

</style>
