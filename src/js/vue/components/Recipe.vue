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

.recipe__overview
  padding 1rem 1rem 2rem
  position relative

  @media breakpoint.large
    height 100%
    padding 1.5rem 1.5rem 4rem
    -webkit-overflow-scrolling touch
    overflow-y scroll
    position absolute
    width 50%

.recipe__overview h3
.recipe__kind
.recipe__tagline
  small_caps()
  typeface('sans_bold')

.recipe__overview h3
  margin 0 0 1em

.recipe__header
  margin 0 2rem 1rem 0

.recipe__kind
  margin-bottom .5rem

.recipe__title
  typeface('serif_bold')

.recipe__tagline
  display inline-block
  margin-right 0.5rem

.tabs--recipe
  margin 0 0 1.5rem

  @media breakpoint.small
    margin 0 0 2rem

</style>
