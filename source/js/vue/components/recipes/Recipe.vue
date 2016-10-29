<template lang="pug">
  div
    preloader(v-if="loading")
    breadcrumbs(
      v-if="!loading && recipe",
      :parents="recipe.parents",
      :current="recipe.title"
      )
    article.recipe(v-if="!loading && recipe")
      cover(
        :photos="recipe.photos",
        :budget="recipe.budget"
        )
      div.overview
        header
          h1 {{ recipe.title }}
          h2.tagline {{ recipe.tagline }}
          p.new(v-if="recipe.badge") New
        div.blurb
          div(v-html="recipe.blurb")
          ingredients(:ingredients="recipe.ingredients")
          instructions(:instructions="recipe.instructions")
      <!-- alpha-overlay(v-if="hasOverlay") -->
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'

import Badge from './Badge.vue'
import Cover from './Cover.vue'
import Ingredients from './Ingredients.vue'
import Instructions from './Instructions.vue'

import AlphaOverlay from '../partials/AlphaOverlay.vue'

import getBreakpointValue from '../../../helpers/getBreakpointValue'
import imagesLoaded from 'imagesloaded'

export default {
  components: { Preloader, Breadcrumbs, Badge, Cover, Ingredients, Instructions, AlphaOverlay },

  data () {
    return {
      loading: null,
      recipe: null,
      hasOverlay: false
    }
  },

  created () {
    this.fetchData(this.getApiUrl())
    window.addEventListener('resize', this.matchHeights)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.matchHeights)
  },

  watch: {
    '$route' (to, from) {
      this.fetchData(this.getApiUrl())
    }
  },

  methods: {
    getApiUrl () {
      return this.$root.apiBaseUrl + 'recipe/' + this.$route.params.slug
    },

    fetchData (url) {
      this.loading = true
      this.$http.get(url).then((response) => {
        this.recipe = response.data
        this.updatePageTitle(this.recipe.title)
        this.loading = false
      })
    },

    updatePageTitle (title) {
      this.$root.$emit('update-page-title', title)
    },

    loadImages () {
      let that = this
      imagesLoaded(this.$el, that, function(instance) {
        console.log('imagesloaded')
        that.loading = false
        that.matchHeights() // TODO: call function after cover is loaded...
      })
    },

    matchHeights () {
      console.log('matchHeights called!')

      var overview, cover, coverHeightPx, coverHeight

      overview = document.querySelector('.overview')
      cover = document.querySelector('.cover img')
      coverHeightPx = cover.offsetHeight
      coverHeight = coverHeightPx / 16 + 'em'

      console.log('coverHeightPx = ' + coverHeightPx)

      if (getBreakpointValue() === 'large' || getBreakpointValue() === 'xlarge') {
        overview.style.height = coverHeight
        this.hasOverlay = true
      } else {
        overview.style.height = 'auto'
        this.hasOverlay = false
      }
    }
  }
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.recipe
  background white

  @media(min-width breakpoint-medium)
    margin 0 margins-medium

  @media(min-width breakpoint-large)
    display flex
    margin 0 margins-large 3rem

    .cover
      width 50%
      order 2

    .overview
      width 50%
      order 1
      padding-bottom 3rem
      overflow-y scroll
      -webkit-overflow-scrolling touch

  @media(min-width breakpoint-xlarge)
    margin 0 auto 3rem
    width width-xlarge

  header
    margin 0 3rem 1rem 1rem
    padding-top 1rem

  h1
    serif-heavy()

  h3
    margin 0 0 1em
    sans-heavy()
    small-caps(11)

  .blurb
    padding-top 0

  .tabs
    margin 0 1rem 1rem
    width calc(100% - 2rem)

  .kind
    margin-bottom .5rem
    sans-heavy()
    small-caps(11)

  .favorite-toggle
    top .75rem
    right 0

  .mini-recipe
    @media(min-width breakpoint-small)
      figure
        width 8rem

</style>
