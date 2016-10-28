<template lang="pug">
  div
    preloader(v-if="loading")
    breadcrumbs(v-if="!loading && recipe")
    article.recipe(v-if="!loading && recipe")
      <!-- section.cover -->
        <!-- _coverPhoto -->
        <!-- budget(:budget="budget") -->
      section.overview
        header
          h1 {{ recipe.title }}
          h2.tagline {{ recipe.tagline }}
          p.new(v-if="recipe.badge") New
        div
          div.blurb
            div(v-html="recipe.blurb")
            ingredients(:ingredients="recipe.ingredients")
            instructions(:instructions="recipe.instructions")
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'

import Badge from './Badge.vue'
import Budget from './Budget.vue'
import Ingredients from './Ingredients.vue'
import Instructions from './Instructions.vue'

export default {
  components: { Preloader, Breadcrumbs, Badge, Budget, Ingredients, Instructions },

  data () {
    return {
      loading: null,
      recipe: null
    }
  },

  created () {
    this.fetchData(this.getApiUrl())
  },

  watch: {
    '$route' (to, from) {
      this.fetchData(this.getApiUrl())
    }
  },

  methods: {
    getApiUrl () {
      return this.$root.apiBaseUrl + '/recipe/' + this.$route.params.slug
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
  header
    margin 0 3rem 1rem 1rem
    padding-top 1rem

    .kind
      margin-bottom .5rem

  .tabs
    margin 0 1rem 1rem
    width calc(100% - 2rem)

  h3
    margin 0 0 1em
    body-font-bold()
    small-caps(11)

  .overview
    position relative
    background white

  .blurb
    padding-top 0

  .favorite-toggle
    top .75rem
    right 0

  h4
    margin 0 0 1em


@media(min-width breakpoint-large)
  .recipe
    display flex
    flex-direction row

    .cover,
    .overview
      width 50%

    .cover
      order 2

    .overview
      order 1
      border-right 1px solid border-color

    .favorite-toggle
      top 0.5rem

    // NOTE for side-by-side layout
    &.contained
      position relative

      .cover
        overflow hidden

      .overview
        padding-bottom 3rem

      .overview-mask
        position absolute
        bottom 0
        left 0
        width 50%
        height 4rem
        background linear-gradient(to bottom, rgba(white, 0), white)

      .overview
        overflow-y scroll
        -webkit-overflow-scrolling touch
        border-right none

</style>
