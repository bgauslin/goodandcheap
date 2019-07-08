<template lang="pug">
  button.search-toggle(
    @click="toggleInput(showSearch)",
    :class="{ 'open' : showSearch, 'closed' : !showSearch }",
    aria-label="Search this site",
  )
</template>

<script>
import { mapGetters } from 'vuex';

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
    ...mapGetters([
      'showSearch',
    ]),

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

        if (this.showSearch && !isSearchInput && !this.isSearchPage) {
          this.toggleInput(this.showSearch);
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
     * @param {!boolean} open
     */
    toggleInput(open) {
      if (!this.isSearchPage) {
        open = !open;
        this.$store.commit('showSearch', open);
        if (open) {
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
