<template lang="pug">
  transition(
    mode="out-in",
    name="remove",
  )
    li.preview.preview--recipe
      router-link(
        :class="['preview__link', 'preview__link--recipe', { 'visited' : isVisited }]",
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
          h3.preview__heading {{ item.title }}
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

  data() {
    return {
      isVisited: false,
    }
  },

  mounted() {
    this.isVisited = this.checkIfVisited(this.item.id);
  },

  computed: {
    ...mapGetters(['allowFavorites']),
    
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
@import '../../../stylus/config/'

// .preview
//   preview()

.preview--recipe a
  padding-right 3rem

.preview__summary
  margin-right 0

.preview__chapter-title
  color var(--medium-grey)
  small_caps()
  typeface('sans')

.preview__kind
.preview__tagline
  display inline-block
  small_caps()
  typeface('sans_bold')

.preview__kind
  margin-top .2rem

.preview__tagline
  margin-right .4em

.preview__index
  bottom 1rem
  color var(--medium-grey)
  line-height 1
  position absolute
  right 0
  small_caps()
  text-align center
  typeface('sans')
  width 3rem

</style>
