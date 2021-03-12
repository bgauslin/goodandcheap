<template lang="pug">
  button.remove-favorite(
    @click="removeFavorite(favorite)"
  )
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    favorite: Object,
  },

  methods: {
    ...mapMutations([
      'removeFavorite',
    ]),
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.remove-favorite
  display block
  padding .5rem
  position absolute // NOTE see .recipe and .preview for TRBL
  text-align center
  width 3rem

.remove-favorite::before
  icon()
  height 2rem
  line-height 2rem

.remove-favorite::before
  color var(--text-2-color)
  content icon-cancel-circled
  font-size em(20)

.remove-favorite:active::before
  color var(--brand-color)

.preview--recipe .remove-favorite
  right 0
  top 0

[no-touch] .remove-favorite:hover::before
  color var(--brand-color)

</style>
