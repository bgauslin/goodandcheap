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
  @media(min-width breakpoint-large)
    padding 3rem 0

  .copy
    padding 1rem margins-base
    background white
    animation slideInUp .5s ease

    a
      background rgba(brand-color, .1)
      padding .1em .4em
      border-radius 2px

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
    small-caps()
  p
    serif()
  li
    sans()

&.has-background
  background-position center center
  background-repeat no-repeat
  background-size cover
  background-attachment scroll

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
      color white
      background brand-color


</style>
