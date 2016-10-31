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
        photos(
          :photos="data.photos",
          :budget="data.budget"
        )
        div.overview
          header
            p.kind(v-if="data.kind !== 'Recipe'") {{ data.kind }}
            h1 {{ data.title }}
            h2.tagline {{ data.tagline }}
            badge(v-if="data.badge")

          <!-- copy-blocks(v-if="data.copyBlocks", v-for="block in data.copyBlocks", :block="block") -->
          template(v-if="data.copyBlocks", v-for="block in data.copyBlocks")
            blurb(v-if="block.type === 'blurb'", :blurb="block.blurb")
            list(v-if="block.type === 'list'", :list="block.list")
            blurb-with-heading(v-if="block.type === 'blurbWithHeading'", :heading="block.heading", :blurb="block.blurb")

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
import Photos from './Photos.vue'
import Blurb from './Blurb.vue'
import AlphaOverlay from '../partials/AlphaOverlay.vue'

import Variation from './Variation.vue'
import LinkedRecipe from './LinkedRecipe.vue'
import MiniRecipe from './MiniRecipe.vue'

import List from './List.vue'
import BlurbWithHeading from './BlurbWithHeading.vue'


export default {
  components: {
    Preloader,
    Breadcrumbs,
    Badge,
    Blurb,
    Photos,
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
