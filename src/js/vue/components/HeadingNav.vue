<template lang="pug">
  h1.heading
    router-link.heading__link(
      :to="linkRoute"
      :title="linkLabel"
    ) 
      svg.icon.icon--back(
        v-if="hasIcon"
        viewbox="0 0 32 32"
        aria-hidden="true"
      )
        path.icon__path(
          d="m21.08768,26.09236l-10.17537,-10.1165l10.12708,-10.06822"
        )
      span {{ linkLabel }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'parent',
    ]),

    /**
     * @return {boolean}
     */
    hasIcon() {
      return this.$route.name !== 'chapters';
    },

    /**
     * The header link's text label based on the current route.
     * @return {string}
     */
    linkLabel() {
      switch (this.$route.name) {
        case 'chapters':
        case 'pages':
          return 'Good And Cheap';
        case 'info':
          return 'Info';
        case 'chapter':
          return 'Recipes';
        default:
          return this.parent.title;
      }
    },

    /**
     * The route to go to when header link is clicked.
     * @return {Object}
     */
    linkRoute() {
      switch (this.$route.name) {
        case 'chapters':
        case 'pages':
        case 'chapter':
          return {name: 'chapters'};
        case 'info':
          return {name: 'pages'};
        default:
          return {
            name: this.parent.routeName,
            params: {
              slug: this.parent.slug,
            },
          };      
      }
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/goodandcheap'

.heading
  small_caps(14)
  typeface('sans_bold')
  grid-area heading

.heading__link
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  line-height controls-size
  margin-left var(--margin)
  overflow hidden
  text-overflow ellipsis
  transform-origin 0 50%
  transition transform .3s ease
  white-space nowrap

  @media breakpoint.small
    margin-left 0

.heading__link:active
  transform scale(.9)

.heading__link.exact
  pointer-events none

.icon--back
  height rem(32)
  transform scale(.6)
  margin rem(-2) 0 0 rem(-9)
  vertical-align middle
  width rem(32)

.icon__path
  fill none
  stroke currentColor
  stroke-width 4
  transition all var(--transition)

</style>