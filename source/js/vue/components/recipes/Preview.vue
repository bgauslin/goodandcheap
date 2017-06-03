<template lang="pug">
  transition(name="remove", mode="out-in")
    li.preview.recipe-preview
      router-link(
        :to="{ name: 'recipe', params: { chapter: item.chapter.slug, slug: item.slug } }",
        :title="item.title",
        :class="{ visited : isVisited }"
      )
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

  data () {
    return {
      isVisited: false
    }
  },

  computed: {
    itemCount () {
      return this.index + 1
    }
  },

  mounted () {
    this.isVisited = this.checkIfVisited(this.item.id)
  },

  methods: {
    checkIfVisited (id) {
      var ids = this.$store.getters.visitedIds
      var index = ids.indexOf(id)
      return (index !== -1) ? true : false
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

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
    small_caps()

  .chapter-title
    color LIGHT_GREY
    sans()

  .kind
  .tagline
    display inline-block
    sans_heavy()

  .kind
    margin-top .2rem

  .tagline
    margin-right .4em

  .index
    bottom 1rem
    color LIGHT_GREY
    line-height 1
    position absolute
    right 0
    sans()
    small_caps()
    text-align center
    width 3rem

  .toggle-favorite
  .remove-favorite
    right 0
    top 0

.no-touch
  .preview
    preview_no_touch()

</style>
