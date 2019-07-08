<template lang="pug">
  div.recipe
    div.recipe__content
      cover(
        :budget="content.budget",
        :image="content.photo",
        :title="content.title",
        displayTitle="no",
        modifier="recipe",
      )
      div.recipe__overview
        header.recipe__header
          p.recipe__kind(
            v-if="content.kind !== 'Recipe'",
          ) {{ content.kind }}
          h1.recipe__title {{ content.title }}
          h2.recipe__tagline(
            v-if="content.tagline",
          ) {{ content.tagline }}
          badge(
            v-if="content.badge",
          )
        toggle-favorite(
          v-if="allowFavorites",
          :favorite="content",
        )
        tabs(
          v-if="tabs.length > 1",
          :tabs="tabs",
          modifier="recipe",
        )
        router-view(
          :content="recipeContent",
          :parentId="content.id",
        )
      alpha-overlay
</template>

<script>
import setup from '../../setup';
import { mapGetters } from 'vuex';
import AlphaOverlay from './AlphaOverlay.vue';
import Badge from './Badge.vue';
import Cover from './Cover.vue';
import Tabs from './Tabs.vue';
import ToggleFavorite from './ToggleFavorite.vue';

export default {
  components: {
    AlphaOverlay,
    Badge,
    Cover,
    Tabs,
    ToggleFavorite,
  },

  props: {
    content: {
      badge: String,
      budget: Object,
      id: Number,
      kind: String,
      photo: Object,
      tagline: String,
      title: String,
    },
  },

  data() {
    return {
      tabs: [],
    }
  },

  created() {
    this.setTabs();
    window.addEventListener('resize', this.minHeight);
  },

  mounted() {
    this.addVisited(this.content.id);
    this.minHeight();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.minHeight);
  },

  computed: {
    ...mapGetters([
      'allowFavorites',
    ]),

    /** @return {Object} */
    recipeContent() {
      let content = {};
      switch(this.$route.name) {
        case 'ingredients':
          return this.content.ingredients;
          break;
        case 'steps':
          return this.content.instructions;
          break;
        default:
          content.blurb = this.content.blurb;
          content.copyBlocks = this.content.copyBlocks;
          content.recipeBlocks = this.content.recipeBlocks;
          return content;
      }
    },
  },

  methods: {
    /**
     * Adds the recipe to a 'visited' array which sets a class that styles the
     * recipe as visited for improved usablity.
     * @param {string} id
     */
    addVisited(id) {
      this.$store.commit('addVisited', id);
    },

    /**
     * @description Sets a 'min-height' CSS property via inline 'style'
     * depending on the media query breakpoint to ensure the text content panel
     * and the photo panel are the same height.
     * TODO: Achieve this with CSS padding and positioning, then remove method.
     */
    minHeight() {
      const overviewElement = this.$el.querySelector('.recipe__overview');
      const overviewWidthPx = overviewElement.offsetWidth;
      const overviewWidth = `${overviewWidthPx / 16}em`;

      switch(setup.getBreakpointValue()) {
        case 'large':
        case 'xlarge':
          overviewElement.style.minHeight = overviewWidth;
          break;
        default:
          overviewElement.style.minHeight = 'none';
      }
    },

    /**
     * @description Creates labels and routes for tabs based on available content.
     */
    setTabs() {
      if (this.content.blurb || this.content.recipeBlocks || this.content.copyBlocks) {
        this.tabs.push({
          label: 'Intro',
          route: {
            name: 'recipe',
            params: {
              chapter: this.content.parent.slug,
              slug: this.content.slug,
            }
          }
        });
      }

      if (this.content.ingredients) {
        this.tabs.push({
          label: 'Ingredients',
          route: {
            name: 'ingredients',
            params: {
              chapter: this.content.parent.slug,
              slug: this.content.slug,
            }
          }
        });
      }

      if (this.content.instructions) {
        this.tabs.push({
          label: 'Steps',
          route: {
            name: 'steps',
            params: {
              chapter: this.content.parent.slug,
              slug: this.content.slug,
            }
          }
        });
      }
    }
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.recipe
  @media Breakpoint.SMALL
    margin 1.5rem var(--margin) 0

  @media Breakpoint.MEDIUM
    margin-top 2.25rem

  @media Breakpoint.LARGE
    margin-top 3rem

  @media Breakpoint.XLARGE
    margin 3rem auto 0
    width '%s' % ContentWidth.XLARGE

.recipe__content
  background white
  margin 0 auto

  @media Breakpoint.SMALL
    max-width PAGE_WIDTH_STACKED

  @media Breakpoint.MEDIUM
    max-width none
    width PAGE_WIDTH_STACKED

  @media Breakpoint.LARGE
    overflow hidden
    padding-bottom 50%
    position relative
    width 100%

.recipe__overview
  padding 1rem 1rem 2rem
  position relative

  @media Breakpoint.LARGE
    height 100%
    padding 1.5rem 1.5rem 4rem
    -webkit-overflow-scrolling touch
    overflow-y scroll
    position_it(absolute, 0, null, null, 0)
    width 50%

.recipe__overview h3
  margin 0 0 1em
  small_caps()
  typeface('sans_bold')

.recipe__header
  margin 0 2rem 1rem 0

.recipe__kind
  margin-bottom .5rem
  small_caps()
  typeface('sans_bold')

.recipe__title
  typeface('serif_bold')

.recipe__tagline
  display inline-block
  margin-right 0.5rem
  small_caps()
  typeface('sans_bold')

.tabs--recipe
  margin 0 0 1.5rem

  @media Breakpoint.SMALL
    margin 0 0 2rem

</style>
