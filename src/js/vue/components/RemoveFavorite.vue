<template lang="pug">
  button.remove-favorite(
    @click="removeFavorite(favorite)"
  )
    svg.remove-favorite__icon(
      class="cancel-filled"
      viewbox="0 0 24 24"
      aria-hidden="true"
      aria-label="Remove Favorite"
    )
      circle(
        cx="12" cy="12" r="10"
      )
      line(
        x1="8" y1="8" x2="16" y2="16"
      )
      line(
        x1="8" y1="16" x2="16" y2="8"
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
  position absolute
  text-align center
  width 3rem

.remove-favorite__icon
  height rem(24)
  width rem(24)

.remove-favorite__icon > circle
  fill var(--text-3-color)
  transition fill transition

.remove-favorite__icon > line
  stroke var(--background-1)
  stroke-linecap round
  stroke-width 2

.remove-favorite:active circle
[no-touch] .remove-favorite:hover circle
  fill var(--brand-color)

</style>
