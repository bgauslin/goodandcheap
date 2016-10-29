<template lang="pug">
  div
    preloader(v-if="loading")
    breadcrumbs(v-if="!loading && chapter", :current="chapter.title")
    div.chapter(v-if="!loading && chapter")
      div.intro
        cover(
          :title="chapter.title",
          :blurb="chapter.blurb",
          :image="chapter.photo",
          :count="chapter.recipeCount + ' Recipes'"
        )
      ol.previews
        recipe-preview(
          v-for="(recipe, index) in chapter.recipes",
          :item="recipe",
          route-name="recipe",
          :toggle-favorite="true",
          :index="index"
        )
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'
import Cover from '../partials/Cover.vue'
import RecipePreview from '../recipes/Preview.vue'
import getBreakpointValue from '../../../helpers/getBreakpointValue'
import imagesLoaded from 'imagesloaded'

export default {

  components: { Preloader, Breadcrumbs, Cover, RecipePreview },

  data () {
    return {
      loading: null,
      chapter: null
    }
  },

  created () {
    this.fetchData(this.getApiUrl())
    window.addEventListener('resize', this.matchHeights)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.matchHeights)
  },

  mounted () {
    //this.loadImages()
    //this.matchHeights()
  },

  watch: {
    '$route' (to, from) {
      this.fetchData(this.getApiUrl())
    }
  },

  methods: {
    getApiUrl () {
      return this.$root.apiBaseUrl + 'chapter/' + this.$route.params.slug
    },

    fetchData (url) {
      this.loading = true
      this.$http.get(url).then((response) => {
        this.chapter = response.data
        this.updatePageTitle(this.chapter.title)
        this.loadImages()
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

      var previews, cover, coverHeightPx, coverHeight

      previews = document.querySelector('.previews')
      cover = document.querySelector('.cover img')
      coverHeightPx = cover.offsetHeight
      coverHeight = coverHeightPx / 16 + 'em'

      console.log('coverHeightPx = ' + coverHeightPx)

      if (getBreakpointValue() === 'large' || getBreakpointValue() === 'xlarge') {
        previews.style.height = coverHeight
      } else {
        previews.style.height = 'auto'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.chapter
  background white

  @media(min-width breakpoint-medium)
    margin 0 margins-medium

  @media(min-width breakpoint-large)
    display flex
    margin 0 margins-large 3rem

    .intro
      width 50%

    .previews
      width 50%
      overflow-y scroll
      -webkit-overflow-scrolling touch

  @media(min-width breakpoint-xlarge)
    margin 0 auto 3rem
    width width-xlarge


</style>
