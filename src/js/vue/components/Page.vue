<template lang="pug">
  .page(
    :class="{ 'has-background' : hasBackgroundImage }"
    :style="'background-image:' + backgroundImageCss"
  )
    .page__content
      h1.page__title {{ content.title }}
      section.page__section(
        v-for="block in content.content"
      )
        h2.page__heading(
          v-if="block.heading"
        ) {{ block.heading }}
        .page__copy(
          v-if="block.copy"
          v-html="block.copy"
        )
        ul.page__list(
          v-if="block.list"
        )
          li.page__list__item(
            v-for="item in block.list"
          ) {{ item }}
      copyright.copyright--page
</template>

<script>
import Copyright from './Copyright.vue';

export default {
  components: {
    Copyright,
  },

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
      const breakpointValue = window.getComputedStyle(document.body,'::after').getPropertyValue('content').replace(/\"/g, '');
      
      switch(breakpointValue) {
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
  @media breakpoint.large
    padding 3rem 0

.page.has-background
  background scroll no-repeat center / cover

[no-touch] .page.has-background
  background-attachment fixed

.page__content
  background-color var(--background-1)
  padding 1rem var(--margin)

  @media breakpoint.small
    margin 0 auto

  @media breakpoint.medium
    padding 2rem var(--margin)

  @media breakpoint.large
    padding 3rem 4rem
    width page-width

.page__title
  margin .5em 0 1em
  typeface('serif_bold')

.page__section
  margin 1em 0 2em

.page__heading
  small_caps()
  typeface('sans_bold')
  margin 0 0 1em
  text-transform uppercase

.page__copy p
  typeface('serif')
  margin 0 0 1em

.page__copy a
  typeface('serif_bold')

.page__list
  margin 1em 0

.page__list__item
  typeface('sans')
  display inline-block
  list-style none
  margin-right 1em

</style>
