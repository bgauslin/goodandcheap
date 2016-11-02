<template lang="pug">
  div.page(:style="'background-image:' + backgroundImageCss", :class="{ 'has-background' : hasBackgroundImage }")
    preloader(v-if="!loaded")
    div(v-if="loaded")
      breadcrumbs(
        :parents="data.parents",
        :current="data.title"
      )
      div.copy
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
import getBreakpointValue from '../../../helpers/getBreakpointValue'

export default {
  components: { Preloader, Breadcrumbs },

  data () {
    return {
      loaded: false,
      data: null,
      dataUrl: this.$root.apiBaseUrl + 'page/' + this.$route.params.slug,
      hasBackgroundImage: null,
      backgroundImageCss: null,
      backgroundImageOverlayCss: 'linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.25))'
    }
  },

  created () {
    this.fetchData(this.dataUrl)
    window.addEventListener('resize', this.setBackgroundImage)
  },

  updated () {
    this.setBackgroundImage()
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.setBackgroundImage)
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
    },
    setBackgroundImage() {
      if (getBreakpointValue() === 'large' || getBreakpointValue() === 'xlarge') {
        this.backgroundImageCss = this.backgroundImageOverlayCss + ',url(' + this.data.backgroundImage + ')'
        this.hasBackgroundImage = true
      } else {
        this.backgroundImageCss = 'none'
        this.hasBackgroundImage = false
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.page
  @media(min-width breakpoint-large)
    padding-bottom 4rem

    .breadcrumbs
      margin 0 auto
      max-width page-max-width

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
      padding 3rem 4rem
      width page-max-width

  h1
    margin .5em 0 1em
    serif-heavy()
  h2
  h3
  h4
    sans-heavy()
    text-transform uppercase
  h2
    small-caps(11)
  p
    serif()
  li
    sans()

&.has-background
  background-position center center
  background-repeat no-repeat
  background-size cover
  background-attachment scroll

  .breadcrumbs
    color rgba(white, .7)
    a
      link(white, white, rgba(white, .7))
    span
      color rgba(white, .7)


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

.no-touch
  .page
    &.has-background
      background-attachment fixed

      .breadcrumbs
        a
          link-hover(rgba(white, .7))

</style>
