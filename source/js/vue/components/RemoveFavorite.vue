<template lang="pug">
  button.remove-favorite(
    @click="removeItem(favorite)",
  )
</template>

<script>
export default {
  props: ['favorite'],

  methods: {
    /**
     * Removes recipe from user's saved favorites.
     * @param {!Object} favorite
     */
    removeItem(favorite) {
      this.$store.commit('removeFavorite', favorite);
    },
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
  height 2rem
  icon()
  line-height 2rem

.remove-favorite::before
  color '%s' % Color.MEDIUM_GREY
  content '%s' % Icon.CANCEL_CIRCLED
  font-size px_to_em(20)

.remove-favorite:active::before
  color '%s' % Color.BRAND_RED

.preview--recipe .remove-favorite
  right 0
  top 0

.no-touch .remove-favorite:hover::before
  color '%s' % Color.BRAND_RED

</style>
