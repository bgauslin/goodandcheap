<template lang="pug">
  div
    preloader(v-if="!loaded")
    breadcrumbs(
      v-if="loaded",
      :parents="data.parents",
      :current="data.title"
    )
    div.recipe(v-if="loaded")
      div
        cover(
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
            li
              router-link(:to="routeUrl + '/'", exact) Intro
            li(v-if="data.ingredients")
              router-link(:to="routeUrl + '/ingredients'") Ingredients
            li(v-if="data.instructions")
              router-link(:to="routeUrl + '/steps'") Steps
          router-view(
            :blurb="data.blurb",
            :ingredients="data.ingredients",
            :instructions="data.instructions"
          )

          template(v-if="data.copyBlocks", v-for="block in data.copyBlocks")
            blurb-with-heading(v-if="block.type === 'blurbWithHeading'", :heading="block.heading", :blurb="block.blurb")
            blurb(v-if="block.type === 'blurb'", :blurb="block.blurb")
            list(v-if="block.type === 'list'", :list="block.list")

          template(v-if="data.recipeBlocks", v-for="block in data.recipeBlocks")
            variation(v-if="block.type === 'variation'", :variation="block")
            linked-recipe(v-if="block.type === 'linkedRecipe'", :linkedRecipe="block")
            mini-recipe(v-if="block.type === 'miniRecipe'", :miniRecipe="block")

        alpha-overlay
</template>


<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'
import Badge from './Badge.vue'
import Cover from './Cover.vue'
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
    Preloader,
    Breadcrumbs,
    Badge,
    Cover,
    Blurb,
    ToggleFavorite,
    Variation,
    LinkedRecipe,
    MiniRecipe,
    List,
    BlurbWithHeading,
    AlphaOverlay
  },

  data () {
    return {
      loaded: false,
      data: null,
      dataUrl: this.$root.apiBaseUrl + 'recipe/' + this.$route.params.slug,
      routeUrl: '/recipe/' + this.$route.params.slug
    }
  },

  created () {
    this.fetchData(this.dataUrl)
    window.addEventListener('resize', this.minHeight)
  },

  updated () {
    this.minHeight()
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.minHeight)
  },

  methods: {
    fetchData (url) {
      this.$http.get(url).then((response) => {
        this.data = response.data
        this.updateTitle(this.data.title)
        this.loaded = true
      })
    },

    updateTitle (title) {
      this.$root.$emit('update-title', title)
    },

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
  & > div
    margin 0 auto
    background white

  @media(min-width breakpoint-small)
    margin 0 margins-small

    & > div
      max-width 35rem

  @media(min-width breakpoint-medium)
    margin 0 margins-medium

    & > div
      width 35rem
      max-width none

  @media(min-width breakpoint-large)
    margin 0 margins-large

    & > div
      position relative
      width 100%
      padding-bottom 50%
      overflow hidden

      .recipe-cover
        position-it(absolute, 0, 0, null, null)
        width 50%
        overflow hidden

      .overview
        position-it(absolute, 0, null, null, 0)
        width 50%
        height 100%
        padding-bottom 4rem
        overflow-y scroll
        -webkit-overflow-scrolling touch

  @media(min-width breakpoint-xlarge)
    margin 0 auto
    width width-xlarge


  .overview
    position relative
    padding 1rem 1rem 2rem
    @media(min-width breakpoint-large)
      padding 1.5rem 1.5rem 3rem


  .tagline
    sans-heavy()
    small-caps(11)

  .tabs
    margin 1rem 0
    width 100%
    li
      margin 0

  .kind
    margin-bottom .5rem
    sans-heavy()
    small-caps(11)

  header
    margin 0 2rem 1rem 0

  h1
    serif-heavy()

  .toggle-favorite
    top .75rem
    right 0

  h3
    margin 0 0 1em
    sans-heavy()
    small-caps(11)

  // TODO: coordinate list styles with tabs and ingredients
  li
    margin 0 0 1em
    list-style none
    sans()

  .copy-block
    padding .5rem 0

    h4
      margin-bottom .25em
    p
      sans()


</style>
