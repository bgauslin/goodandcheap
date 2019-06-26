<template lang="pug">
  transition(
    mode="out-in",
    name="remove",
  )
    li(
      :class="['preview', 'preview--' + modifier]",
    )
      router-link(
        :class="['preview__link', 'preview__link--' + modifier]",
        :title="item.title",
        :to="to",
      )
        thumb(
          :image="item.thumb",
          :title="item.title",
        )
        div.preview__summary
          h3.preview__heading {{ item.title }}
          slot
</template>

<script>
import Thumb from './Thumb.vue';

export default {
  components: { Thumb },

  props: [
    'item',
    'modifier',
    'to',
  ],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.preview
  list-style none
  position relative

.preview__link
  align-items center
  background white
  border-top 1px solid var(--border-color)
  display flex
  link(var(--color-grey-dark), var(--color-grey-medium), var(--brand-color), var(--brand-color))

.preview__summary
  flex 1 1
  margin 0 1rem 0 .5rem

.preview__heading
  line-height 1.1
  margin .2em 0
  typeface('serif_bold')

.preview:last-child > .preview__link
  border-bottom 1px solid var(--border-color)

</style>
