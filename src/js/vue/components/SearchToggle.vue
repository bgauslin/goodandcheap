<template lang="pug">
  button.search-toggle(
    @click="toggleInput(showSearch)"
    :class="[ showSearch ? 'open' : 'closed' ]"
    aria-label="Search this site"
  )
    svg.search-toggle__icon(
      viewbox="0 0 24 24"
      aria-hidden="true"
    )
      circle(
        cx="12" cy="12" r="6"
      )
      line(
        x1="16" y1="16" x2="21" y2="21"
      )
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

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
    ...mapGetters(['showSearch']),

    /** @return {boolean} */
    isSearchPage() {
      return (this.$route.name === 'search');
    },
  },

  methods: {
    ...mapMutations([
      'updateShowSearch',
    ]),

    /** Opens/closes the search box based on where the user clicked. */
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
        this.updateShowSearch(open);
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
  color var(--header-color)
  margin 0
  opacity 1
  padding 0
  transition opacity .3s ease
  width 2.75rem

  &:active
  [no-touch] &
    &:hover
    &:visited:hover
      opacity .7

.search-toggle__icon
  height rem(24)
  width rem(24)

.search-toggle__icon > circle
.search-toggle__icon > line
  fill none
  stroke white
  stroke-width 2.5

</style>
