<template lang="pug">
  div.site
    app-header(
      :parent="parent",
    )
    div.content
      preloader(
        v-if="!hasData",
      )
      transition(
        v-if="!notFound",
        @before-enter="beforeEnter",
        @after-enter="afterEnter",
        @before-leave="beforeLeave",
        @after-leave="afterLeave",
        mode="out-in",
      )
        router-view(
          v-if="hasData",
          :content="content",
          :key="key",
        )
      not-found(
        v-if="notFound",
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
      content: {},
      hasData: false,
      key: '',
      notFound: false,
      searchQuery: '',
      transitionEnter: '',
      transitionLeave: '',
    }
  },

  created() {
    // TODO: Make calls to favoritesPage() and searchPage() more DRY.
    this.favoritesPage();
    this.searchPage();
    this.fetchData();
  },

  watch: {
    '$route' (to, from) {
      // TODO: Make calls to favoritesPage() and searchPage() more DRY.
      this.favoritesPage();
      this.searchPage();

      // Reset notFound flag.
      this.notFound = false;

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
        this.hasData = false;
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
     * Removes CSS class from an element after entering the new route.
     * @param {!Element} element
     */
    afterEnter(element) {
      element.classList.remove(this.transitionEnterClass());
    },

    /**
     * Removes CSS class from an element after leaving the current route.
     * @param {!Element} element
     */
    afterLeave(element) {
      element.classList.remove(this.transitionLeaveClass());
    },

    /**
     * Adds CSS class to an element before entering the new route and resets
     * scroll position for iOS.
     * @param {!Element} element
     */
    beforeEnter(element) {
      element.classList.add(this.transitionEnterClass());
      setTimeout(() => window.scrollTo(0, 1), 0);
    },

    /**
     * Removes CSS class from an element before leaving the current route.
     * @param {!Element} element
     */
    beforeLeave(element) {
      element.classList.add(this.transitionLeaveClass());
    },

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
          this.hasData = true;
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
    favoritesPage() {
      if (this.$route.name === 'favorites') {
        this.content = null;
        this.key = 'favorites';
        this.updateParent(null);
        this.hasData = true;
      }
    },

    /**
     * Stores 'showSearch' flag and search params (if they exist) for other
     * components to access if current route is the search results page.
     */
    searchPage() {
      this.searchQuery = window.location.search;
      if (this.searchQuery) {
        this.updateSearchQuery(this.searchQuery);
      }
      this.updateShowSearch(this.$route.name === 'search');
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
      this.content = null;
      this.hasData = true;
      this.notFound = true;
    },

    /**
     * Returns a CSS class to apply on transition 'enter' tick based on
     * current 'direction' state value.
     * @return {string}
     */
    transitionEnterClass() {
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
    transitionLeaveClass() {
      switch (this.direction) {
        case 'forward':
          return 'slide-out-left';
        case 'back':
          return 'slide-out-right';
        default:
          return 'slide-out-down';
      }
    },

    /**
     * Updates document title.
     * @param {!string} pageTitle
     * @return {string}
     */
    updateTitle(pageTitle) {
      document.title = (pageTitle !== undefined) ? `${pageTitle} · ${this.$root.siteName}` : this.$root.siteName;
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

.slide-in-left
.slide-in-right
.slide-in-up
.slide-out-down
.slide-out-left
.slide-out-right
  animation-duration .2s
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

@media Breakpoint.MEDIUM
  .slide-in-left
  .slide-in-right
  .slide-in-up
  .slide-out-left
  .slide-out-right
  .slide-out-down
    animation-duration .35s

</style>
