<template lang="pug">
  div
    preloader(v-if="loading")
    breadcrumbs(v-if="!loading && chapter")
    div.chapter(v-if="!loading && chapter")
      div.intro
        cover(
          :title="chapter.title",
          :blurb="chapter.blurb",
          :image="chapter.photo",
          :count="chapter.recipeCount + ' Recipes'"
        )
      ol.previews
        preview(
          v-for="(recipe, index) in chapter.recipes",
          :item="recipe",
          route-name="recipe",
          :showCount="true",
          :index="index"
        )
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'
import Cover from '../partials/Cover.vue'
import Preview from '../partials/Preview.vue'
import getBreakpointValue from '../../../helpers/getBreakpointValue'

export default {

  components: { Preloader, Breadcrumbs, Cover, Preview },

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

  mounted () {
    // TODO: wait for cover image to load before calling this.matchHeights
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
      return this.$root.apiBaseUrl + '/chapter/' + this.$route.params.slug
    },

    fetchData (url) {
      this.loading = true
      this.$http.get(url).then((response) => {
        this.chapter = response.data
        this.updatePageTitle(this.chapter.title)
        this.loading = false
      })
    },

    updatePageTitle (title, metaDescription) {
      this.$root.$emit('update-page-title', title)
    },

    matchHeights () {
      var previews, cover, coverHeightPx, coverHeight

      previews = document.querySelector('.previews')
      cover = document.querySelector('.cover img')
      coverHeightPx = cover.offsetHeight
      coverHeight = coverHeightPx / 16 + 'em'

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
      border-right 1px solid border-color

    .previews
      width 50%

      // TODO: set fixed height equal to .intro height
      overflow-y scroll
      -webkit-overflow-scrolling touch

  @media(min-width breakpoint-xlarge)
    margin 0 auto 3rem
    width width-xlarge


</style>
