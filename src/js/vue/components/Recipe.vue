<template lang="pug">
  .recipe
    .recipe__content
      cover(
        :budget="content.budget"
        :image="content.photo"
        :title="content.title"
        displayTitle="no"
        modifier="recipe"
      )
      .recipe__overview
        header.recipe__header
          p.recipe__kind(
            v-if="content.kind !== 'Recipe'"
          ) {{ content.kind }}
          h1.recipe__title {{ content.title }}
          p.recipe__tagline(
            v-if="content.tagline"
          ) {{ content.tagline }}
          badge(
            v-if="content.badge"
          )
          toggle-favorite(
            :favorite="content"
          )
        tabs(
          v-if="tabs.length > 1"
          :tabs="tabs"
          modifier="recipe"
        )
        router-view(
          :content="recipeContent"
          :parentId="content.id"
        )
        copyright.copyright--recipe
      alpha-overlay
</template>

<script>
import { mapMutations } from 'vuex';
import AlphaOverlay from './AlphaOverlay.vue';
import Badge from './Badge.vue';
import Copyright from './Copyright.vue';
import Cover from './Cover.vue';
import Tabs from './Tabs.vue';
import ToggleFavorite from './ToggleFavorite.vue';

export default {
  components: {
    AlphaOverlay,
    Badge,
    Cover,
    Copyright,
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
  @extends $content-layout-parent
  --recipe-padding-x .75rem

  @media breakpoint.large
    --recipe-padding-x 1.5rem

.recipe__content
  @extends $content-layout-child

// Ensure overview panel is at least a square via 'min-height' when there's not
// much content in the panel.
.recipe__overview
  display flex
  flex-direction column
  min-height 100vw

  @media breakpoint.medium
    min-height stack-width

  @media breakpoint.large
    height 100%
    min-height stack-width - overlay-height
    -webkit-overflow-scrolling touch
    overflow-y scroll
    position absolute
    width 50%

.recipe__overview > *:last-child
  overflow visible

  @media breakpoint.large
    padding-bottom overlay-height

.recipe__overview h3
.recipe__kind
.recipe__tagline
  small_caps()
  typeface('sans_bold')

.recipe__overview h3
  margin 0 0 1em

.recipe__header
  margin .25rem 0 0
  padding .75rem controls-size 0 var(--recipe-padding-x)
  position relative

  @media breakpoint.small
    margin-top .75rem

.recipe__kind
  margin-bottom .5rem

.recipe__title
  typeface('serif_bold')

.recipe__tagline
  display inline-block
  margin 1em .5rem 1em 0

.tabs--recipe
  background var(--header-background)
  grid-column full
  margin 0
  padding .5rem var(--recipe-padding-x)
  position sticky
  top var(--header-height)
  z-index 1

  @supports (backdrop-filter backdrop-effect)
    backdrop-filter backdrop-effect
    background var(--header-backdrop-background)

  @media breakpoint.large
    top 0

</style>
