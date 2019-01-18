<template lang="pug">
  button.search-toggle(
    @click="toggleInput(open)",
    :class="{ open : open, closed : !open }",
    aria-label="Search this site",
  )
</template>

<script>
export default {
  props: ['open'],

  data() {
    return {
      inputId: 'query',
    }
  },

  created() {
    this.getClickTarget();
  },

  computed: {
    /** @return {boolean} */
    isSearchPage() {
      return (this.$route.name === 'search');
    },
  },

  methods: {
    /** @description ... */
    getClickTarget() {
      document.addEventListener('click', e => {
        const el = e.target.id;
        const isSearchInput = this.isSearchInput(el);

        if (this.open && !isSearchInput && !this.isSearchPage) {
          this.toggleInput(this.open);
        }
      }, true);
    },

    /**
     * @description
     * @param {!string} el -
     */
    isSearchInput(el) {
      return (el === this.inputId);
    },

    /**
     * @description
     * @param {!boolean} open -
     */
    toggleInput(open) {
      if (!this.isSearchPage) {
        open = !open;
        this.$store.commit('setSearch', open);
        if (open) {
          document.getElementById(this.inputId).focus();
        }
      }
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

  // &.open
  //   &::before
  //     content ICON_CANCEL

.no-touch .search-toggle
  &:hover
  &:visited:hover
    color rgba(WHITE, .7)

</style>
