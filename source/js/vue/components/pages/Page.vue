<template lang="pug">
  article.page
    preloader(v-if="loading")
    div.copy(v-if="!loading && page")
      h1 {{ page.title }}
      section.page-section(v-for="block in page.content")
        h2(v-if="block.heading") {{ block.heading }}
        div(v-if="block.copy", v-html="block.copy")
        ul(v-if="block.list")
          li(v-for="item in block.list") {{ item }}
</template>

<script>
import Preloader from '../partials/Preloader.vue'

export default {

  components: { Preloader },

  data () {
    return {
      loading: null,
      page: null
    }
  },

  created () {
    this.apiUrl = this.getApiUrl()
    this.fetchData(this.apiUrl)
  },

  watch: {
    '$route' (to, from) {
      this.apiUrl = this.getApiUrl()
      this.fetchData(this.apiUrl)
    }
  },

  methods: {
    getApiUrl () {
      return this.$root.apiBaseUrl + '/page/' + this.$route.params.slug
    },

    fetchData (url) {
      this.loading = true
      this.$http.get(url).then((response) => {
        this.page = response.data
        this.updatePageMeta(this.page.title, this.page.blurb)
        this.loading = false
      })
    },

    updatePageMeta (title, metaDescription) {
      this.$root.$emit('update-page-title', title)
      this.$root.$emit('update-meta-description', metaDescription)
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.page

  @media(min-width breakpoint-large)
    margin-bottom 3rem

  .copy
    padding 1rem
    background white

    @media(min-width breakpoint-small)
      margin 0 auto
      padding 1rem 2rem

    @media(min-width breakpoint-large)
      margin 0 8rem
      padding 3rem 4rem

  h1
    margin .5em 0 1em

  h2
  h3
  h4
    body-font-bold()
    text-transform uppercase

  h2
    small-caps(11)

  li
    body-font()

  a
    text-decoration underline

.page-section
  margin 1em 0 2em

  h2
    margin 0 0 1em

  p
    margin 0 0 1em

  ul
    margin 1em 0

  li
    display inline-block
    list-style none
    margin-right 1em

</style>
