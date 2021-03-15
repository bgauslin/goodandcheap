<template lang="pug">
  button.remove-favorite(
    @click="removeFavorite(favorite)"
    aria-label="Remove Favorite"
  )
    svg.remove-favorite__icon(
      viewbox="0 0 24 24"
      aria-hidden="true"
    )
      circle(cx="12" cy="12" r="10")
      path(d="M8,8 L16,16 M8,16 L16,8")
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
  color var(--text-2-color)
  display block
  position absolute
  text-align center
  width rem(48)

.remove-favorite:active
[no-touch] .remove-favorite:hover
  color var(--brand-color)

.remove-favorite__icon
  height rem(24)
  width rem(24)

.remove-favorite__icon > circle
.remove-favorite__icon > path
  fill none
  stroke currentColor
  stroke-width 2
  transition stroke transition

.remove-favorite__icon > path
  stroke-linecap round

</style>
