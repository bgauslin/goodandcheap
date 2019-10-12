<template lang="pug">
  div.site
    app-header(
      :parent="parent",
    )
    div.content
      preloader(
        v-if="!dataLoaded",
      )
      transition(
        @before-enter="beforeEnter",
        @after-enter="afterEnter",
        @before-leave="beforeLeave",
        @after-leave="afterLeave",
        mode="out-in",
      )
        router-view(
          v-if="dataLoaded",
          :content="data",
          :key="key",
        )
    app-footer
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import AppFooter from './Footer.vue';
import AppHeader from './Header.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import Preloader from './Preloader.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
    Breadcrumbs,
    Preloader,
  },

  data() {
    return {
      data: null,
      dataLoaded: null,
      fetch: null,
      key: null,
      searchQuery: '',
      transitionEnter: null,
      transitionLeave: null,
    }
  },

  created() {
    this.favoritesPage();
    this.searchPage();

    // this.endpoint = this.$route.meta.endpoint;
    if (this.endpoint !== undefined) {
      this.fetchData(this.endpoint);
    }

    // Set dataLoaded flag for 404 route.
    if (this.$route.name === '404') {
      this.dataLoaded = true;
    }
  },

  watch: {
    '$route' (to, from) {
      this.favoritesPage();
      this.searchPage();

      this.fetch = this.doFetch(to, from);
      if (this.endpoint && this.fetch) {
        this.data = null;
        this.dataLoaded = false;
        this.fetchData(this.endpoint);
      } else {
        // Data isn't fetched for 'steps' and 'ingredients' tabs, but we still
        // need to send a pageview.
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
     * Adds CSS class to an element before entering the new route.
     * @param {!Element} element
     */
    beforeEnter(element) {
      element.classList.add(this.transitionEnterClass());
      // Reset scroll position for iOS.
      setTimeout(() => {
        window.scrollTo(0, 1)
      }, 0);
    },

    /**
     * Removes CSS class from an element before leaving the current route.
     * @param {!Element} element
     */
    beforeLeave(element) {
      element.classList.add(this.transitionLeaveClass());
    },

    /**
     * Whether to fetch data from an API depending on what route the user is
     * coming from and going to.
     * @param {!string} to
     * @param {!string} from
     * @return {boolean}
     */
    doFetch(to, from) {
      // TODO: Refactor all of this to be more clean/clear.
      if (to.name === 'intro') {
        if (from.name === 'steps' || from.name === 'ingredients') {
          return false;
        } else {
          return true;
        }
      } else if (to.name === 'steps' || to.name === 'ingredients') {
        if (from.name === 'intro' || from.name === 'steps' || from.name === 'ingredients') {
          return false;
        } else {
          return true;
        }
      } else if (from.name === 'pages' && to.name === 'chapters') {
        return false;
      } else if (from.name === 'chapters' && to.name === 'pages') {
        return false;
      } else if (to.name === 'favorites') {
        return false;
      } else {
        return true;
      }
    },

    /**
     * Fetches data from an API endpoint.
     * @param {!string} endpoint
     * @async
     */
    async fetchData(endpoint) {
      const apiBaseUrl = (process.env.NODE_ENV === 'production') ? process.env.API_PROD : process.env.API_DEV;
      let fullEndpoint = `${apiBaseUrl}/${endpoint}`;
      
      // Append slug or search query only if they exist.
      const slug = this.$route.params.slug;
      if (slug !== undefined) {
        fullEndpoint += `/${slug}`;
      } else if (this.searchQuery) {
        fullEndpoint += this.searchQuery;
      }

      try {
        const response = await fetch(fullEndpoint);
        this.data = await response.json();
        this.key = this.data.slug;
        this.updateParent(this.data.parent);
        this.updateTitle(this.data.title);
        this.sendPageview(this.data.title);
        this.dataLoaded = true;
      } catch (e) {
        this.notFound();
      }
    },

    /**
     * Updates props and state if current route is 'favorites'.
     */
    favoritesPage() {
      if (this.$route.name === 'favorites') {
        this.data = null;
        this.key = 'favorites';
        this.updateParent(null);
        this.dataLoaded = true;
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
     * Redirects to 404 page if there is no API response.
     */
    notFound() {
      this.sendPageview('404');
      window.location.replace('/404');
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
