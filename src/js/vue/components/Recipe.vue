<template lang="pug">
  .recipe
    .recipe__content
      cover(
        :budget="content.budget",
        :image="content.photo",
        :title="content.title",
        displayTitle="no",
        modifier="recipe",
      )
      .recipe__overview
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
import { mapMutations } from 'vuex';
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
  },

  mounted() {
    this.addVisited(this.content.id);
  },

  computed: {
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
    ...mapMutations([
      'addVisited',
    ]),

    /** Creates labels and routes for tabs based on available content. */
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
  --recipe-padding-x .75rem

  @media breakpoint.large
    --recipe-padding-x 1.5rem

.recipe
  @media breakpoint.small
    margin 1.5rem var(--margin) 0

  @media breakpoint.medium
    margin-top 2.25rem

  @media breakpoint.large
    margin-top 3rem

  @media breakpoint.xlarge
    margin 3rem auto 0
    width content-width-xlarge

.recipe__content
  background var(--background-1)
  margin 0 auto

  @media breakpoint.small
    max-width page-width-stacked

  @media breakpoint.medium
    max-width none
    width page-width-stacked

  @media breakpoint.large
    overflow hidden
    padding-bottom 50%
    position relative
    width 100%

// Ensure overview panel is at least a square via 'min-height' when there's not
// much content in the panel.
.recipe__overview
  align-content start
  display grid
  grid-template-columns:
    \[full-start\] minmax(var(--recipe-padding-x), 1fr) \
    \[copy-start\] minmax(0, 100%) \[copy-end\] \
    minmax(var(--recipe-padding-x), 1fr) \[full-end\]
  min-height 100vw
  position relative

  @media breakpoint.medium
    min-height page-width-stacked

  @media breakpoint.large
    height 100%
    min-height page-width-stacked - 4rem
    -webkit-overflow-scrolling touch
    overflow-y scroll
    position absolute
    width 50%

.recipe__overview > *
  grid-column copy

.recipe__overview > *:last-child
  overflow visible
  padding-bottom 2rem

  @media breakpoint.large
    padding-bottom 4rem

.recipe__overview h3
.recipe__kind
.recipe__tagline
  small_caps()
  typeface('sans_bold')

.recipe__overview h3
  margin 0 0 1em

.recipe__header
  margin 1rem 2rem 0 0

  @media breakpoint.small
    margin-top 1.5rem

.recipe__kind
  margin-bottom .5rem

.recipe__title
  typeface('serif_bold')

.recipe__tagline
  display inline-block
  margin-right 0.5rem

.tabs--recipe
  background var(--background-1)
  grid-column full
  margin 0
  padding .5rem var(--recipe-padding-x)
  position sticky
  top var(--header-height)
  z-index 1

  @media breakpoint.large
    top 0

</style>
