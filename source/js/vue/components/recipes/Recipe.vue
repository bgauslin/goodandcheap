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
          h2.tagline {{ data.tagline }}
          badge(v-if="data.badge")

        toggle-favorite(:favorite="data")

        ul.tabs(v-if="data.ingredients || data.instructions")
          li(v-if="data.blurb")
            router-link(
              :to="{ name: 'recipe', params: { slug: data.slug, isTab: true } }",
              exact
            ) Intro
          li(v-if="data.ingredients")
            router-link(
              :to="{ name: 'ingredients', params: { slug: data.slug, isTab: true } }"
            ) Ingredients
          li(v-if="data.instructions")
            router-link(
              :to="{ name: 'steps', params: { slug: data.slug, isTab: true } }"
            ) Steps

        router-view(
          :blurb="data.blurb",
          :ingredients="data.ingredients",
          :instructions="data.instructions"
        )

        template(
          v-if="data.copyBlocks",
          v-for="block in data.copyBlocks"
        )
          blurb-with-heading(
            v-if="block.type === 'blurbWithHeading'",
            :heading="block.heading",
            :blurb="block.blurb"
          )
          blurb(
            v-if="block.type === 'blurb'",
            :blurb="block.blurb"
          )
          list(
            v-if="block.type === 'list'",
            :list="block.list"
          )

        template(
          v-if="data.recipeBlocks",
          v-for="block in data.recipeBlocks"
        )
          variation(
            v-if="block.type === 'variation'",
            :variation="block"
          )
          linked-recipe(
            v-if="block.type === 'linkedRecipe'",
            :linkedRecipe="block"
          )
          mini-recipe(
            v-if="block.type === 'miniRecipe'",
            :miniRecipe="block"
          )
      alpha-overlay
</template>


<script>
import Badge from './Badge.vue'
import RecipeCover from './RecipeCover.vue'
import Blurb from './Blurb.vue'
import ToggleFavorite from '../favorites/ToggleFavorite.vue'
import Variation from './Variation.vue'
import LinkedRecipe from './LinkedRecipe.vue'
import MiniRecipe from './MiniRecipe.vue'
import List from './List.vue'
import BlurbWithHeading from './BlurbWithHeading.vue'
import AlphaOverlay from '../partials/AlphaOverlay.vue'

import getBreakpointValue from '../../../helpers/getBreakpointValue'

export default {
  components: {
    Badge,
    RecipeCover,
    Blurb,
    ToggleFavorite,
    Variation,
    LinkedRecipe,
    MiniRecipe,
    List,
    BlurbWithHeading,
    AlphaOverlay
  },

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
    margin 1rem 0
    width 100%
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
    top .75rem
    right 0

    @media(min-width breakpoint-large)
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
