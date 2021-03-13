<template lang="pug">
  h1
    router-link(
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
        case 'chapter':
        case 'pages':
          return {
            name: 'chapters',
          };
        case 'info':
          return {
            name: 'pages',
            params: {
              slug: this.parent.slug,
            },
          };
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

.icon--back
  height rem(32)
  margin 0 rem(-4) 0 rem(-12)
  transform scale(.6)
  width rem(32)

  @media breakpoint.medium
    margin-right 0
    transform 'scale(.7) translateY(%s)' % rem(2)

.icon__path
  fill none
  stroke currentColor
  stroke-width 4
  transition all var(--transition)

</style>