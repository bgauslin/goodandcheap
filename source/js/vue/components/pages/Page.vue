<template lang="pug">
  div.page
    preloader(v-if="!loaded")
    breadcrumbs(
      v-if="loaded",
      :parents="data.parents",
      :current="data.title"
    )
    div.copy(v-if="loaded")
      h1 {{ data.title }}
      section.page-section(v-for="block in data.content")
        h2(v-if="block.heading") {{ block.heading }}
        div(v-if="block.copy", v-html="block.copy")
        ul(v-if="block.list")
          li(v-for="item in block.list") {{ item }}
</template>

<script>
import Preloader from '../partials/Preloader.vue'
import Breadcrumbs from '../partials/Breadcrumbs.vue'

export default {
  components: { Preloader, Breadcrumbs },

  data () {
    return {
      loaded: false,
      data: null,
      dataUrl: this.$root.apiBaseUrl + 'page/' + this.$route.params.slug
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
    updateTitle(title) {
      this.$root.$emit('update-title', title)
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
    padding 1rem margins-base
    background white
    a
      text-decoration underline

    @media(min-width breakpoint-small)
      margin 0 auto
      padding 1rem margins-small

    @media(min-width breakpoint-medium)
      padding 2rem margins-medium

    @media(min-width breakpoint-large)
      margin 0 8rem
      padding 3rem 4rem

  h1
    margin .5em 0 1em
    serif-heavy()

  h2,h3,h4
    sans-heavy()
    text-transform uppercase
  h2
    small-caps(11)
  li
    sans()

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


// TODO: these styles to be determines...
body
  &.background
    background-repeat no-repeat
    background-position center center
    background-attachment fixed
    background-size cover

    .breadcrumbs
    .site-footer
      color white
      a
        text-decoration underline

        &:link
        &:visited
          color white

        &:hover
        &:visited:hover
          color brand-color





</style>
