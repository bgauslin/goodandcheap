<template lang="pug">
  router-link.header__link(
    :to="linkRoute"
    :title="linkLabel"
  )
    svg.back-arrow(
      v-if="hasIcon"
      viewbox="0 0 24 24"
      aria-hidden="true"
    )
      polyline(points="14,6 8,12 14,18")
    h1.header__link__label {{ linkLabel }}
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
      return this.$route.name !== 'chapters' && this.$route.name !== 'pages';
    },

    /**
     * The header link's text label based on the current route.
     * @return {string}
     */
    linkLabel() {
      switch (this.$route.name) {
        case 'chapter':
          return 'Recipes';
        case 'chapters':
        case 'favorites':
        case 'pages':
        case 'search':
          return 'Good And Cheap';
        case 'info':
          return 'Info';
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
        case 'chapter':
        case 'chapters':
        case 'favorites':
        case 'pages':
        case 'search':
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

.header__link
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  align-items center
  display inline-flex
  grid-area heading
  height var(--header-height)
  margin-left var(--margin)
  transform-origin 0 50%
  transition transform var(--transition)

  @media breakpoint.small
    margin-left 0
    width auto

.header__link:active
  transform scale(.9)

.header__link.exact
  pointer-events none

.header__link__label
  small_caps(14)
  typeface('sans_bold')
  margin 0
  overflow hidden
  text-overflow ellipsis
  transition color var(--transition)
  white-space nowrap

.back-arrow
  height rem(24)
  width rem(24)

.back-arrow > polyline
  fill none
  stroke currentColor
  stroke-width 3
  transition all var(--transition)

</style>