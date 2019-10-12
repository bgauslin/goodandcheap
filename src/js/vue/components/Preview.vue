<template lang="pug">
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

  props: {
    item: {
      thumb: Object,
      title: String,
    },
    modifier: String,
    to: Object,
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.preview
  list-style none
  position relative

.preview__link
  link(var(--dark-grey), var(--medium-grey), var(--brand-color), var(--brand-color))
  align-items center
  background white
  border-top 1px solid var(--border-color)
  display flex

.preview__summary
  flex 1 1
  margin 0 1rem 0 .5rem

.preview__heading
  typeface('serif_bold')
  line-height 1.1
  margin .2em 0

.preview:last-child > .preview__link
  border-bottom 1px solid var(--border-color)

</style>
