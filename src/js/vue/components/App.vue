<template lang="pug">
  div.site
    app-header(
      :parent="parent",
    )
    div.content
      preloader(
        v-if="isLoading",
      )
      transition(
        mode="out-in",
        @before-enter="beforeEnter",
        @after-enter="afterEnter",
        @before-leave="beforeLeave",
        @after-leave="afterLeave",
      )
        router-view(
          v-if="!is404 && !isLoading",
          :content="content",
          :key="key",
        )
        not-found(
          v-if="is404",
        )
    app-footer
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import AppFooter from './Footer.vue';
import AppHeader from './Header.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import NotFound from './NotFound.vue';
import Preloader from './Preloader.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
    Breadcrumbs,
    NotFound,
    Preloader,
  },

  data() {
    return {
      content: null,
      is404: false,
      isLoading: true,
      key: '',
      searchQuery: '',
    }
  },

  created() {
    this.showFavorites();
    this.updateSearch();
    this.fetchData();
  },

  watch: {
    '$route' (to, from) {
      this.showFavorites();
      this.updateSearch();

      // Reset 404 flag.
      this.is404 = false;

      // Determine if there should be an API request depending on where we're
      // coming from and going to.
      let isFetchable = true;
      if (this.$route.name === 'favorites') {
        isFetchable = false;
      } else {
        const noFetch = [
          ['intro', 'steps'],
          ['intro', 'ingredients'],
          ['ingredients', 'intro'],
          ['ingredients', 'steps'],
          ['steps', 'intro'],
          ['steps', 'ingredients'],
          ['chapters', 'pages'],
          ['pages', 'chapters'],
        ];

        noFetch.forEach((route) => {
          const [to_, from_] = route;
          if (to_ === to.name && from_ === from.name) {
            isFetchable = false;
          }
        });
      }

      if (isFetchable) {
        this.isLoading = true;
        this.fetchData();
      } else {
        this.sendPageview(document.title);
      }
    }
  },

  computed: {
    ...mapGetters([
      'direction',
      'parent',
    ]),

    /** @return {string} */
    endpoint() {
      return this.$route.meta.endpoint;
    }
  },

  methods: {
    ...mapMutations([
      'updateParent',
      'updateSearchQuery',
      'updateShowSearch',
    ]),

    /**
     * Fetches data from an API endpoint.
     * @async
     */
    async fetchData() {
      if (this.$route.name === '404') {
        this.show404();
      }

      if (!this.endpoint) {
        return;
      }

      const apiBaseUrl = (process.env.NODE_ENV === 'production') ? process.env.API_PROD : process.env.API_DEV;
      let endpoint = `${apiBaseUrl}/${this.endpoint}`;
      
      // Append slug or search query only if they exist.
      const slug = this.$route.params.slug;
      if (slug !== undefined) {
        endpoint += `/${slug}`;
      } else if (this.searchQuery) {
        endpoint += this.searchQuery;
      }

      try {
        const response = await fetch(endpoint);
        
        if (response.status === 200) {
          this.content = await response.json();
          this.key = this.content.slug;
          this.isLoading = false;
          this.updateParent(this.content.parent);
          this.updateTitle(this.content.title);
          this.sendPageview(this.content.title);
        } else {
          this.show404();
        }
      } catch (e) {
      }
    },

    /**
     * Updates props and state if current route is 'favorites'.
     */
    showFavorites() {
      if (this.$route.name === 'favorites') {
        this.content = 'favorites';
        this.key = 'favorites';
        this.updateParent(null);
        this.isLoading = false;
      }
    },

    /**
     * Stores 'showSearch' flag and search params (if they exist) for other
     * components to access if current route is the search results page.
     */
    updateSearch() {
      this.searchQuery = window.location.search;
      if (this.searchQuery) {
        this.updateSearchQuery(this.searchQuery);
      }
      this.updateShowSearch(this.$route.name === 'search');
    },

    /**
     * Updates document title.
     * @param {!string} pageTitle
     * @return {string}
     */
    updateTitle(pageTitle) {
      document.title = (pageTitle !== undefined) ? `${pageTitle} · ${this.$root.siteName}` : this.$root.siteName;
    },

    /**
     * Gets global Google Analytics object and sends a new pageview.
     * @param {!string} pageTitle
     */
    sendPageview(pageTitle) {
      const ga = window.ga;
      if (ga) {
        ga('set', 'page', this.$route.path);
        ga('set', 'title', pageTitle);
        ga('send', 'pageview');
      }
    },

    /**
     * Displays a 404 message for URLs that don't exist.
     */
    show404() {
      this.content = '404';
      this.key = '404';
      this.isLoading = false;
      this.is404 = true;
    },

    /**
     * Adds CSS class to an element before entering the new route.
     * @param {!Element} el
     */
    beforeEnter(el) {
      el.classList.add(this.enterCssClass());
    },

    /**
     * Removes CSS class from an element after entering the new route.
     * @param {!Element} el
     */
    afterEnter(el) {
      el.classList.remove(this.enterCssClass());
    },

    /**
     * Removes CSS class from an element before leaving the current route.
     * @param {!Element} el
     */
    beforeLeave(el) {
      el.classList.add(this.leaveCssClass());
    },

    /**
     * Removes CSS class from an element after leaving the current route.
     * @param {!Element} el
     */
    afterLeave(el) {
      el.classList.remove(this.leaveCssClass());
    },

    /**
     * Returns a CSS class to apply on transition 'enter' tick based on
     * current 'direction' state value.
     * @return {string}
     */
    enterCssClass() {
      switch (this.direction) {
        case 'forward':
          return 'slide-in-right';
        case 'back':
          return 'slide-in-left';
        default:
          return 'slide-in-up';
      }
    },

    /**
     * Returns a CSS class to apply on transition 'leave' tick based on
     * current 'direction' state value.
     * @return {string}
     */
    leaveCssClass() {
      switch (this.direction) {
        case 'forward':
          return 'slide-out-left';
        case 'back':
          return 'slide-out-right';
        default:
          return 'slide-out-down';
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/goodandcheap'

.site
  display grid
  grid-template-rows auto 1fr auto
  grid-template-columns 1fr
  min-height 100vh

.content
  grid-row 2
  padding 0 env(safe-area-inset-right) 0 env(safe-area-inset-left)

.slide-in-left
.slide-in-right
.slide-in-up
.slide-out-down
.slide-out-left
.slide-out-right
  animation-duration .3s
  animation-timing-function ease-out

.slide-in-left
  animation-name slideInLeft

.slide-in-right
  animation-name slideInRight

.slide-in-up
  animation-name slideInUp

.slide-out-down
  animation-name slideOutDown

.slide-out-left
  animation-name slideOutLeft

.slide-out-right
  animation-name slideOutRight

</style>
