<template lang="pug">
  div.page(
    :class="{ 'has-background' : hasBackgroundImage }",
    :style="'background-image:' + backgroundImageCss",
  )
    div.page__content
      h1.page__title {{ content.title }}
      section.page__section(
        v-for="block in content.content",
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
  props: {
    content: {
      title: String,
      content: Array,
    },
  },

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
     * Attaches a background image to an element via an inline  'style' tag
     * based on media query breakpoint.
     */
    setBackgroundImage() {
      switch(setup.getBreakpointValue()) {
        case 'large':
        case 'xlarge':
          this.backgroundImageCss = `${this.backgroundImageOverlayCss},url(${this.content.backgroundImage})`;
          this.hasBackgroundImage = true;
          break;
        default:
          this.backgroundImageCss = 'none';
          this.hasBackgroundImage = false;
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
  background scroll no-repeat center / cover

[no-touch] .page.has-background
  background-attachment fixed

.page__content
  background-color white
  padding 1rem var(--margin)

  @media Breakpoint.SMALL
    margin 0 auto

  @media Breakpoint.MEDIUM
    padding 2rem var(--margin)

  @media Breakpoint.LARGE
    padding 3rem 4rem
    width PAGE_MAX_WIDTH

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
  margin 0 0 1em
  typeface('serif')

.page__copy a
  background-color rgba(LINK_COLOR, .1)
  border-radius 2px
  padding .1em .4em

[no-touch] .page__copy a:hover
[no-touch] .page__copy a:focus
  background-color var(--link)
  color white

.page__list
  margin 1em 0

.page__list__item
  display inline-block
  list-style none
  margin-right 1em
  typeface('sans')

</style>
