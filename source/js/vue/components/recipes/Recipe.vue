<template lang="pug">
  div
    preloader(v-if="loading")
    breadcrumbs(
      v-if="!loading && recipe",
      :parents="recipe.parents",
      :current="recipe.title"
    )
    div.recipe(v-if="!loading && recipe")
      div
        photos(
          :photos="recipe.photos",
          :budget="recipe.budget"
        )
        div.overview
          header
            h1 {{ recipe.title }}
            h2.tagline {{ recipe.tagline }}
            p.new(v-if="recipe.badge") New
          div.blurb(v-html="recipe.blurb")

          <!-- useTabs for debugging... -->
          ul.tabs(v-if="useTabs")
            li(v-for="tab in tabs")
              router-link(:to="tab.name", :title="tab.label") {{ tab.label }}
          router-view(:ingredients="recipe.ingredients", :instructions="recipe.instructions")

          ingredients(v-if="!useTabs", :ingredients="recipe.ingredients")
          instructions(v-if="!useTabs", :instructions="recipe.instructions")

        alpha-overlay
</template>


<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'
import Badge from './Badge.vue'
import Photos from './Photos.vue'
import Tabs from '../partials/Tabs.vue'
import AlphaOverlay from '../partials/AlphaOverlay.vue'

// remove Ingredients and Instructions once tbas are fully working...
import Ingredients from './Ingredients.vue'
import Instructions from './Instructions.vue'

export default {
  components: { Preloader, Breadcrumbs, Badge, Photos, Tabs, Ingredients, Instructions, AlphaOverlay },

  data () {
    return {
      loading: null,
      recipe: null,
      useTabs: false,
      tabs: [
        { label: 'About', name: 'about' },
        { label: 'Ingredients', name: 'ingredients' },
        { label: 'Steps', name: 'steps' }
      ]
    }
  },

  created () {
    this.fetchData(this.getApiUrl())
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
    margin 0 margins-large 3rem

    & > div
      position relative
      width 100%
      padding-bottom 50%
      overflow hidden

      .photos
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
    margin 0 auto 3rem
    width width-xlarge

  header
    margin 0 3rem 1rem 1rem
    padding-top 1rem

  h1
    serif-heavy()

  .tagline
    sans-heavy()
    small-caps(11)

  h3
    margin 0 0 1em
    sans-heavy()
    small-caps(11)

  .overview
    padding-bottom 2rem

  .blurb
    padding 0 1rem 2rem

    & > div
      serif()

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
