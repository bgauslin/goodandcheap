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
import setup from '../../setup';

export default {
  props: ['data'],

  data() {
    return {
      hasBackgroundImage: null,
      backgroundImageCss: null,
      backgroundImageOverlayCss: 'linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25))',
    }
  },

  created() {
    this.setBackgroundImage();
    window.addEventListener('resize', this.setBackgroundImage);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setBackgroundImage);
  },

  methods: {
    /**
     * @description Attaches a background image to an element via an inline 
     * 'style' tag based on media query breakpoint.
     */
    setBackgroundImage() {
      switch(setup.getBreakpointValue()) {
        case 'large':
        case 'xlarge':
          this.backgroundImageCss = `${this.backgroundImageOverlayCss},url(${this.data.backgroundImage})`;
          this.hasBackgroundImage = true;
          break;
        default:
          this.backgroundImageCss = 'none';
          this.hasBackgroundImage = false;
          break;
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.page
  @media Breakpoint.LARGE
    padding 3rem 0

.page.has-background
  background-attachment scroll
  background-position center center
  background-repeat no-repeat
  background-size cover

.page__content
  background white
  padding '1rem %s' % Layout.Margin.BASE

  @media Breakpoint.SMALL
    margin 0 auto
    padding '1rem %s' % Layout.Margin.SMALL

  @media Breakpoint.MEDIUM
    padding '2rem %s' % Layout.Margin.MEDIUM

  @media Breakpoint.LARGE
    padding 3rem 4rem
    width '%s' % Layout.Width.PAGE_MAX_WIDTH

.page__title
  margin .5em 0 1em
  typeface('serif_bold')

.page__section
  margin 1em 0 2em

.page__heading
  margin 0 0 1em
  small_caps()
  text-transform uppercase
  typeface('sans_bold')

.page__copy p
  font_serif()
  margin 0 0 1em

.page__copy a
  background '%s' % rgba(Branding.PRIMARY, .1)
  border-radius 2px
  padding .1em .4em

.page__list
  margin 1em 0

.page__list__item
  display inline-block
  typeface('sans')
  list-style none
  margin-right 1em

.no-touch .page.has-background
  background-attachment fixed

.no-touch .page__copy a
  &:hover
    color white
    background '%s' % Branding.PRIMARY

</style>
