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
      .preview__summary
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
  border-top 1px solid var(--background-0)
  list-style none
  position relative

@media breakpoint.small
  .preview:first-child
    border-top 0

@media breakpoint.medium
  .preview:last-child
    border-bottom 1px solid var(--background-0)

.preview__link
  link(var(--text-1-color), var(--text-2-color), var(--text-1-color), var(--text-1-color))
  link_background(var(--background-1), var(--background-1), var(--background-2), var(--background-2))
  align-items center
  display flex

.preview__summary
  flex 1 1
  margin 0 1rem 0 .5rem

.preview__heading
  typeface('serif_bold')
  line-height 1.1
  margin .2em 0

</style>
