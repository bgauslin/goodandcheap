<template lang="pug">
  transition(name="preview")
    li.preview.recipe-preview
      router-link(:to="{ name: routeName, params: { slug: item.slug } }", :title="item.title")
        thumb(:image="item.thumb", :title="item.title")
        div.summary
          p.chapter-title(v-if="item.chapter") {{ item.chapter }}
          h3 {{ item.title }}
          p.tagline(v-if="item.tagline") {{ item.tagline }}
          badge(v-if="item.new")
          p.kind(v-if="item.type == 'ideas' || item.type == 'method'", :class="item.type|lower") {{ recipe.kind }}
          p.index {{ itemCount }}
      toggle-favorite(v-if="toggleFavorite", :favorite="item")
      remove-favorite(v-if="removeFavorite", :favorite="item")
</template>


<script>
import Thumb from '../partials/Thumb.vue'
import Badge from './Badge.vue'
import ToggleFavorite from '../favorites/ToggleFavorite.vue'
import RemoveFavorite from '../favorites/RemoveFavorite.vue'

export default {
  components: { Thumb, Badge, ToggleFavorite, RemoveFavorite },

  props: ['item', 'routeName', 'index', 'toggleFavorite', 'removeFavorite'],

  computed: {
    itemCount () {
      return this.index + 1
    }
  },



  methods: {
    removeMe (id) {
      this.removed = true
    },
    leave (el, done) {
      // ...
      done(console.log('removed!'))
    },
  }

}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.preview
  preview()

  &.removed
    //animation slideOutLeft .5s ease

.recipe-preview
  a
    padding-right 3rem

  .chapter-title
    sans()
    small-caps(11)
    color light-grey

  .tagline
    display inline-block
    margin-right .4em
    sans-heavy()
    small-caps(11)

  // TODO: coordinate .kind with api and markup
  .kind
    display inline-block
    margin-top .2rem

  .index
    position absolute
    right 0
    bottom 1rem
    width 3rem
    text-align center
    sans()
    small-caps(11)
    line-height 1
    color light-grey

  .toggle-favorite
  .remove-favorite
    top .5rem
    right 0


.preview-enter-active
  //transition all .3s ease

.preview-leave-active
  //transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.preview-enter
.preview-leave-active
  //padding-left 10px
  //
  opacity 0



.no-touch
  .preview
    preview-no-touch()

</style>
