<template lang="pug">
  transition(
    mode="out-in",
    name="remove",
  )
    li.preview.preview--recipe
      router-link(
        :class="{ visited : isVisited }",
        :title="item.title",
        :to="{ name: 'recipe', params: { chapter: item.chapter.slug, slug: item.slug } }",
      )
        thumb(
          :image="item.thumb",
          :title="item.title",
        )

        div.preview__summary
          p.preview__chapter-title(
            v-if="showChapter",
          ) {{ item.chapter.title }}

          h3 {{ item.title }}
          
          p.preview__tagline(
            v-if="item.tagline",
          ) {{ item.tagline }}
          
          badge(
            v-if="item.new && showBadge",
          )
          
          p.preview__kind(
            v-if="item.kind !== 'Recipe'",
          ) {{ item.kind }}
          
          p.preview__index {{ itemCount }}

      toggle-favorite(
        v-if="favoriteButton === 'toggle' && allowFavorites",
        :favorite="item",
      )

      remove-favorite(
        v-if="favoriteButton === 'remove'",
        :favorite="item",
      )

</template>

<script>
import Badge from './Badge.vue';
import RemoveFavorite from '../favorites/RemoveFavorite.vue';
import Thumb from '../partials/Thumb.vue';
import ToggleFavorite from '../favorites/ToggleFavorite.vue';

export default {
  components: {
    Badge,
    RemoveFavorite,
    Thumb,
    ToggleFavorite,
  },

  props: [
    'favoriteButton',
    'index',
    'item',
    'showBadge',
    'showChapter',
  ],

  data() {
    return {
      isVisited: false,
    }
  },

  mounted() {
    this.isVisited = this.checkIfVisited(this.item.id);
  },

  computed: {
    /** @return {boolean} */
    allowFavorites() {
      return this.$store.getters.allowFavorites;
    },
    
    /** @return {number} */
    itemCount() {
      return this.index + 1;
    },
  },

  methods: {
    checkIfVisited(id) {
      const ids = this.$store.getters.visitedIds;
      const index = ids.indexOf(id);
      return (index !== -1);
    },
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.preview
  preview()

.preview--recipe
  a
    padding-right 3rem

.preview__summary
  margin-right 0

.preview__chapter-title
  color '%s' % Color.MEDIUM_GREY
  font_sans()
  small_caps()

.preview__kind
.preview__tagline
  display inline-block
  font_sans_heavy()
  small_caps()

.preview__kind
  margin-top .2rem

.preview__tagline
  margin-right .4em

.preview__index
  bottom 1rem
  color '%s' % Color.MEDIUM_GREY
  line-height 1
  position absolute
  right 0
  font_sans()
  small_caps()
  text-align center
  width 3rem

.preview--recipe .toggle-favorite
.preview--recipe .remove-favorite
    right 0
    top 0

.no-touch .preview--recipe
  preview_no_touch()

</style>
