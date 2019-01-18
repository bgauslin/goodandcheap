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

  computed: {
    favoritesCount() {
      const count = this.$store.getters.favoritesCount;
      if (count > 0) {
        return count;
      }
    },
  },

  watch: {
    favoritesCount() {
      this.updateCount();
    },
  },

  methods: {
    animationDone() {
      this.$el.classList.remove('updated');
    },

    showCounter() {
      const count = this.favoritesCount;
      return (count > 0) ? true : false;
    },

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
  color WHITE
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
    link(WHITE, WHITE, rgba(WHITE, .7))

    &::after
      content ICON_HEART
      font-size 1rem
      icon()
      margin 0 1rem 0 .3em

    &.empty::after
      content ICON_HEART_EMPTY

    &:active
      transform scale(.9)
      transition .3s ease

    &.current
      color WHITE

.no-touch
  .favorites-counter
    a
      link_hover(rgba(WHITE, .7))

      &.current:hover
        color WHITE
        cursor default

</style>
