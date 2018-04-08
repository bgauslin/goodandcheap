<template lang="pug">
  button.search-toggle(
    @click="toggle(open)",
    :class="{ open : open, closed : !open }",
  )
</template>

<script>
export default {
  props: ['open'],

  created () {
    this.clickTarget();
  },

  beforeDestroy () {
    document.removeEventListener('click');
  },

  methods: {
    toggle (open) {
      open = !open;
      this.$store.commit('setSearch', open);
      if (open) {
        document.getElementById('query').focus();
      }
    },

    clickTarget () {
      document.addEventListener('click', e => {
        let el = e.target.id;
        if (this.open && el !== 'query') {
          this.toggle(this.open);
        }
      }, true);
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.search-toggle
  align-self stretch
  color WHITE
  margin 0
  padding 0
  width 2.75rem

  &:active
    color rgba(WHITE, .7)

  &::before
    content ICON_SEARCH
    icon()
    font-size px_to_em(16)

  &.open
    &::before
      content ICON_CANCEL

.no-touch .search-toggle
  &:hover
  &:visited:hover
    color rgba(WHITE, .7)

</style>
