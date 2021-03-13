<template lang="pug">
  transition(
    mode="out-in"
    name="remove"
  )
    li.preview.preview--recipe
      router-link(
        :class="['preview__link', 'preview__link--recipe', { 'visited' : isVisited }]"
        :title="item.title"
        :to="{ name: 'recipe', params: { chapter: item.chapter.slug, slug: item.slug } }"
      )
        thumb(
          :image="item.thumb"
          :title="item.title"
        )
        .preview__summary
          p.preview__chapter-title(
            v-if="showChapter"
          ) {{ item.chapter.title }}
          h2.preview__heading {{ item.title }}
          p.preview__tagline(
            v-if="item.tagline"
          ) {{ item.tagline }}
          badge(
            v-if="item.new && showBadge"
          )
          p.preview__kind(
            v-if="item.kind !== 'Recipe'"
          ) {{ item.kind }}
          p.preview__index {{ itemCount }}
      toggle-favorite(
        v-if="favoriteButton === 'toggle'"
        :favorite="item"
      )
      remove-favorite(
        v-if="favoriteButton === 'remove'"
        :favorite="item"
      )
</template>

<script>
import { mapGetters } from 'vuex';
import Badge from './Badge.vue';
import RemoveFavorite from './RemoveFavorite.vue';
import Thumb from './Thumb.vue';
import ToggleFavorite from './ToggleFavorite.vue';

export default {
  components: {
    Badge,
    RemoveFavorite,
    Thumb,
    ToggleFavorite,
  },

  props: {
    favoriteButton: String,
    index: Number,
    item: Object,
    modifier: String,
    showBadge: Boolean,
    showChapter: Boolean,
  },

  computed: {
    ...mapGetters([
      'visitedIds',
    ]),
    
    /** @return {boolean} */
    isVisited() {
      return this.visitedIds.has(this.item.id);
    },

    /** @return {number} */
    itemCount() {
      return this.index + 1;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.preview__link--recipe
  padding-right 3rem

.preview__summary
  margin-right 0

.preview__chapter-title
  small_caps()
  typeface('sans')
  color var(--text-2-color)

.preview__kind
.preview__tagline
  small_caps()
  typeface('sans_bold')
  color var(--text-2-color)
  display inline-block

.preview__kind
  margin-top .2rem

.preview__tagline
  margin-right .4em

.preview__index
  small_caps()
  typeface('sans')
  bottom 1rem
  color var(--text-3-color)
  line-height 1
  position absolute
  right 0
  text-align center
  width 3rem

</style>
