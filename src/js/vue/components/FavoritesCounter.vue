<template lang="pug">
  div.favorites-counter
    router-link(
      :class="{ 'empty' : !hasFavorites }",
      :to="{ name: 'favorites' }",
      title="Favorites",
      exact
    ) {{ favoritesCountLabel }}

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    this.$el.addEventListener('animationend', this.animationDone, false);
  },

  beforeDestroy() {
    this.$el.removeEventListener('animationend');
  },

  watch: {
    favoritesCount() {
      this.updateCount();
    },
  },

  computed: {
    ...mapGetters([
      'favoritesCount',
    ]),

    /** @return {string} */
    favoritesCountLabel() {
      return this.favoritesCount > 0 ? this.favoritesCount : '';
    },

    /** @return {boolean} */
    hasFavorites() {
      return this.favoritesCount > 0;
    },
  },

  methods: {
    /** Removes CSS class after the icon's animation completes. */
    animationDone() {
      this.$el.classList.remove('updated');
    },

    /** Adds CSS class that triggers animation when user adds a new favorite. */
    updateCount() {
      if (this.favoritesCount > 0) {
        this.$el.classList.add('updated');
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.favorites-counter
  typeface('sans')
  color white
  display flex
  font-size em(12)
  height var(--header-height)
  justify-content flex-end
  position absolute
  right 0
  top 0
  width 3rem

.favorites-counter.updated
  animation bounce .3s ease-out

.favorites-counter a
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  align-items center
  align-self stretch
  display flex

.favorites-counter a::after
  icon(icon-heart)
  font-size 1rem
  margin 0 1rem 0 .3em

.favorites-counter a.empty::after
  content icon-heart-empty

.favorites-counter a:active
  transform scale(.9)
  transition .3s ease

.favorites-counter a.current
  color var(--header-color)

[no-touch] .favorites-counter a.current:hover
  color var(--header-color)
  cursor default

</style>
