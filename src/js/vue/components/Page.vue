<template lang="pug">
  .page(
    :style="backgroundImage"
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

  computed: {
    backgroundImage() {
      const overlay = 'linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25))';
      return `background-image: ${overlay},url(${this.content.backgroundImage})`;
    }
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.page
  background scroll no-repeat center / cover
  width 100%

  @media breakpoint.large
    padding 3rem 0

[no-touch] .page
  background-attachment fixed

.page__content
  background-color var(--background-1)
  margin 0 auto
  max-width rem(800)
  padding 1rem var(--margin)

  @media breakpoint.medium
    padding 2rem var(--margin)

  @media breakpoint.large
    padding 3rem 4rem

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

[no-touch] .page__copy a
  transition color transition

.page__list
  margin 1em 0

.page__list__item
  typeface('sans')
  display inline-block
  list-style none
  margin-right 1em

</style>
