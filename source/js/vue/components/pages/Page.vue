<template lang="pug">
  div.page(
    :class="{ 'has-background' : hasBackgroundImage }",
    :style="'background-image:' + backgroundImageCss",
  )
    div.page__content
      h1.page__title {{ data.title }}
      section.page__section(
        v-for="block in data.content",
      )
        h2.page__heading(
          v-if="block.heading",
        ) {{ block.heading }}
        div.page__copy(
          v-if="block.copy",
          v-html="block.copy",
        )
        ul.page__list(
          v-if="block.list",
        )
          li.page__list__item(
            v-for="item in block.list",
          ) {{ item }}
</template>

<script>
import getBreakpointValue from '../../../helpers/getBreakpointValue';

export default {
  props: ['data'],

  data () {
    return {
      hasBackgroundImage: null,
      backgroundImageCss: null,
      backgroundImageOverlayCss: 'linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25))',
    }
  },

  created () {
    this.setBackgroundImage();
    window.addEventListener('resize', this.setBackgroundImage);
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.setBackgroundImage);
  },

  methods: {
    setBackgroundImage() {
      if (getBreakpointValue() === 'large' || getBreakpointValue() === 'xlarge') {
        this.backgroundImageCss = `${this.backgroundImageOverlayCss},url(${this.data.backgroundImage})`;
        this.hasBackgroundImage = true;
      } else {
        this.backgroundImageCss = 'none';
        this.hasBackgroundImage = false;
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.page
  @media(min-width BREAKPOINT_LARGE)
    padding 3rem 0

  &.has-background
    background-attachment scroll
    background-position center center
    background-repeat no-repeat
    background-size cover

.page__content
  background WHITE
  padding 1rem MARGINS_BASE

  @media(min-width BREAKPOINT_SMALL)
    margin 0 auto
    padding 1rem MARGINS_SMALL

  @media(min-width BREAKPOINT_MEDIUM)
    padding 2rem MARGINS_MEDIUM

  @media(min-width BREAKPOINT_LARGE)
    padding 3rem 4rem
    width PAGE_MAX_WIDTH

.page__title
  margin .5em 0 1em
  font_serif_heavy()

.page__section
  margin 1em 0 2em

.page__heading
  font_sans_heavy()
  margin 0 0 1em
  small_caps()
  text-transform uppercase

.page__copy
  p
    font_serif()
    margin 0 0 1em

  a
    background rgba(BRAND_COLOR, .1)
    border-radius 2px
    padding .1em .4em

.page__list
  margin 1em 0

.page__list__item
  display inline-block
  font_sans()
  list-style none
  margin-right 1em

.no-touch .page
  &.has-background
    background-attachment fixed

.no-touch .page__copy
  a:hover
    color WHITE
    background BRAND_COLOR

</style>
