<template lang="pug">
  div.page(:style="'background-image:' + backgroundImageCss", :class="{ 'has-background' : hasBackgroundImage }")
    div.copy
      h1 {{ data.title }}
      section.page-section(v-for="block in data.content")
        h2(v-if="block.heading") {{ block.heading }}
        div(v-if="block.copy", v-html="block.copy")
        ul(v-if="block.list")
          li(v-for="item in block.list") {{ item }}
</template>

<script>
import getBreakpointValue from '../../../helpers/getBreakpointValue'
export default {
  props: ['data'],

  data () {
    return {
      hasBackgroundImage: null,
      backgroundImageCss: null,
      backgroundImageOverlayCss: 'linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.25))'
    }
  },

  created () {
    this.setBackgroundImage()
    window.addEventListener('resize', this.setBackgroundImage)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.setBackgroundImage)
  },

  methods: {
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
  @media(min-width BREAKPOINT_LARGE)
    padding 3rem 0

  .copy
    background WHITE
    padding 1rem MARGINS_BASE

    a
      background rgba(BRAND_COLOR, .1)
      border-radius 2px
      padding .1em .4em

    @media(min-width BREAKPOINT_SMALL)
      margin 0 auto
      padding 1rem MARGINS_SMALL

    @media(min-width BREAKPOINT_MEDIUM)
      padding 2rem MARGINS_MEDIUM

    @media(min-width BREAKPOINT_LARGE)
      padding 3rem 4rem
      width PAGE_MAX_WIDTH

  h1
    margin .5em 0 1em
    serif_heavy()

  h2
  h3
  h4
    sans_heavy()
    text-transform uppercase

  h2
    small_caps()

  p
    serif()

  li
    sans()

&.has-background
  background-attachment scroll
  background-position center center
  background-repeat no-repeat
  background-size cover

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

    a:hover
      color WHITE
      background BRAND_COLOR


</style>
