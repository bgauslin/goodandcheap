<template lang="pug">
  button.search-toggle(
    @click="toggleInput(isOpen)",
    :class="{ 'open' : isOpen, 'closed' : !isOpen }",
    aria-label="Search this site",
  )
</template>

<script>
export default {
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
    isOpen() {
      return this.$store.getters.showSearch;
    },

    /** @return {boolean} */
    isSearchPage() {
      return (this.$route.name === 'search');
    },
  },

  methods: {
    /**
     * @description Opens/closes the search box based on where the user clicked.
     */
    getClickTarget() {
      document.addEventListener('click', e => {
        const el = e.target.id;
        const isSearchInput = this.isSearchInput(el);

        if (this.isOpen && !isSearchInput && !this.isSearchPage) {
          this.toggleInput(this.isOpen);
        }
      }, true);
    },

    /**
     * Whether the user clicked on the search toggle.
     * @param {!string} element - The clicked element.
     * @return {boolean}
     */
    isSearchInput(element) {
      return (element === this.inputId);
    },

    /**
     * Focuses cursor in the search box if it's open.
     * @param {!boolean} isOpen
     */
    toggleInput(isOpen) {
      if (!this.isSearchPage) {
        isOpen = !isOpen;
        this.$store.commit('setSearch', isOpen);
        if (isOpen) {
          document.getElementById(this.inputId).focus();
        }
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.search-toggle
  align-self stretch
  color white
  margin 0
  padding 0
  width 2.75rem

  &:active
    color rgba(white, .7)

.search-toggle::before
  content '%s' % Icon.SEARCH
  font-size px_to_em(16)
  icon()

[no-touch] .search-toggle
  &:hover
  &:visited:hover
    color rgba(white, .7)

</style>
