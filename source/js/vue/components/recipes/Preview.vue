<template lang="pug">
  transition(name="remove", mode="out-in")
    li.preview.recipe-preview
      router-link(:to="{ name: 'recipe', params: { chapter: item.chapter.slug, slug: item.slug } }", :title="item.title")
        thumb(:image="item.thumb", :title="item.title")
        div.summary
          p.chapter-title(v-if="showChapter") {{ item.chapter.title }}
          h3 {{ item.title }}
          p.tagline(v-if="item.tagline") {{ item.tagline }}
          badge(v-if="item.new && showBadge")
          p.kind(v-if="item.kind !== 'Recipe'") {{ item.kind }}
          p.index {{ itemCount }}
      toggle-favorite(v-if="favoriteButton === 'toggle'", :favorite="item")
      remove-favorite(v-if="favoriteButton === 'remove'", :favorite="item")
</template>


<script>
import Thumb from '../partials/Thumb.vue'
import Badge from './Badge.vue'
import ToggleFavorite from '../favorites/ToggleFavorite.vue'
import RemoveFavorite from '../favorites/RemoveFavorite.vue'

export default {
  components: { Thumb, Badge, ToggleFavorite, RemoveFavorite },

  props: ['item', 'index', 'showChapter', 'showBadge', 'favoriteButton'],

  computed: {
    itemCount () {
      return this.index + 1
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.preview
  preview()

.recipe-preview
  a
    padding-right 3rem

  .summary
    margin-right 0

  .chapter-title
  .tagline
  .kind
    small-caps()

  .chapter-title
    sans()
    color light-grey

  .tagline
  .kind
    display inline-block
    sans-heavy()
  .tagline
    margin-right .4em
  .kind
    margin-top .2rem

  .index
    position absolute
    right 0
    bottom 1rem
    width 3rem
    text-align center
    sans()
    small-caps()
    line-height 1
    color light-grey

  .toggle-favorite
  .remove-favorite
    top 0
    right 0


.no-touch
  .preview
    preview-no-touch()

</style>
