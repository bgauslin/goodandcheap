<template lang="pug">
  div.favorites-counter
    router-link(
      :class="{ empty : !hasFavorites }",
      :to="{ name: 'favorites' }",
      title="Favorites",
      exact
    ) {{ favoritesCount }}

</template>

<script>
export default {
  data() {
    return {
      hasFavorites: null,
    }
  },

  mounted() {
    this.hasFavorites = this.showCounter();
    this.$el.addEventListener('animationend', this.animationDone, false);
  },

  updated() {
    this.hasFavorites = this.showCounter();
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
    /** @return {number} */
    favoritesCount() {
      const count = this.$store.getters.favoritesCount;
      if (count > 0) {
        return count;
      }
    },
  },

  methods: {
    /** @description Removes CSS class after the icon's animation completes. */
    animationDone() {
      this.$el.classList.remove('updated');
    },

    /** @return {boolean} */
    showCounter() {
      const count = this.favoritesCount;
      return (count > 0);
    },

    /**
     * @description Adds CSS class that triggers an animation when user adds
     * a new favorite.
     */
    updateCount() {
      const count = this.favoritesCount;
      if (count > 0) {
        this.$el.classList.add('updated');
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.favorites-counter
  color white
  display flex
  font-size px_to_em(12)
  height HEADER_HEIGHT_BASE
  justify-content flex-end
  font_sans()
  position_it(absolute, 0, 0, null, null)
  width 3rem

  @media BREAKPOINT_MEDIUM
    height HEADER_HEIGHT_MEDIUM

  &.updated
    animation bounce .3s ease-out

  a
    align-items center
    align-self stretch
    display flex
    link(white, white, rgba(white, .7))

    &::after
      content '%s' % Icon.HEART
      font-size 1rem
      icon()
      margin 0 1rem 0 .3em

    &.empty::after
      content '%s' % Icon.HEART_EMPTY

    &:active
      transform scale(.9)
      transition .3s ease

    &.current
      color white

.no-touch
  .favorites-counter
    a
      link_hover(rgba(white, .7))

      &.current:hover
        color white
        cursor default

</style>
