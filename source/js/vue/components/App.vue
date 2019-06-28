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
      endpoint: '',
      key: null,
      searchQuery: '',
      transitionEnter: null,
      transitionLeave: null,
    }
  },

  created() {
    this.isFavoritesPage();
    this.isSearchPage();

    this.endpoint = this.$route.meta.endpoint;
    if (this.endpoint !== undefined && this.endpoint !== 'favorites') {
      this.fetchData(this.endpoint);
    }
    // set dataLoaded flag for routes with no data fetching
    if (this.$route.name === 'favorites' || this.$route.name === '404') {
      this.dataLoaded = true;
    }
  },

  watch: {
    '$route' (to, from) {
      this.isFavoritesPage();
      this.isSearchPage();

      this.endpoint = this.$route.meta.endpoint;
      const fetch = this.doFetch(to, from);

      if (this.endpoint !== undefined && fetch !== false) {
        this.data = null;
        this.dataLoaded = false;
        this.fetchData(this.endpoint);
      }
    }
  },

  computed: {
    /** @return {string} */
    direction() {
      return this.$store.getters.direction;
    },

    /** @return {Object} */
    parent() {
      return this.$store.getters.parent;
    },
  },

  methods: {
    /**
     * @param {!Element} element - DOM element to remove a CSS class from after
     * entering a new route.
     */
    afterEnter(element) {
      element.classList.remove(this.transitionEnterClass());
    },

    /**
     * @param {!Element} element - DOM element to remove a CSS class from after
     * leaving the current route.
     */
    afterLeave(element) {
      element.classList.remove(this.transitionLeaveClass());
    },

    /**
     * @param {!Element} element - DOM element to add a CSS class to before
     * entering a new route.
     */
    beforeEnter(element) {
      element.classList.add(this.transitionEnterClass());
      // reset scroll position for iOS
      setTimeout(() => {
        window.scrollTo(0, 1)
      }, 0);
    },

    /**
     * @param {!Element} element - DOM element to remove a CSS class from before
     * leaving the current route.
     */
    beforeLeave(element) {
      element.classList.add(this.transitionLeaveClass());
    },

    /**
     * Whether to fetch data from JSON API depending on what page the user is
     * coming from and going to.
     * @param {!string} to - The route the user is going to. 
     * @param {!string} from - The route the user is coming from.
     * @return {boolean}
     */
    doFetch(to, from) {
      if (to.name === 'intro') {
        if (from.name === 'steps' || from.name === 'ingredients') {
          return false;
        }
      } else if (to.name === 'steps' || to.name === 'ingredients') {
        return false;
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
     * Fetches data from API endpoint, then stores that data to avoid
     * further (redundant) API calls.
     * @param {!string} endpoint - API endpoint.
     * @async
     */
    fetchData: async function(endpoint) {
      let endpointUrl = this.$root.apiBaseUrl + endpoint;
      let slug = this.$route.params.slug;

      // append query for search
      if (this.searchQuery) {
        endpointUrl += this.searchQuery;
      }

      // set slug to undefined when going from 'page' to 'info'
      if (slug === null) {
        slug = undefined;
      }

      if (slug !== undefined) {
        endpointUrl += `/${slug}`;
      }

      try {
        const response = await fetch(endpointUrl);
        this.data = await response.json();
        this.$store.commit('parent', this.data.parent);
        this.key = this.data.slug;
        this.updateTitle(this.data.title);
        this.sendPageview(this.data.title);
        this.dataLoaded = true;
      } catch (e) {
        this.notFound();
      }
    },

    /**
     * Updates transition key and parent prop if current route is the
     * 'favorites' page.
     */
    isFavoritesPage() {
      if (this.$route.name === 'favorites') {
        this.key = 'favorites';
        this.$store.commit('parent', null);
      }
    },

    /**
     * Stores showSearch flag and search params (if they exist) for other
     * components to access if current route is the search results page.
     */
    isSearchPage() {
      this.searchQuery = window.location.search;
      if (this.searchQuery) {
        this.$store.commit('searchQuery', this.searchQuery);
      }
      this.$store.commit('showSearch', this.$route.name === 'search');
    },

    /** 
     * Redirects to 404 page if JSON API response is null.
     */
    notFound() {
      this.sendPageview('404');
      window.location.replace('/404');
    },

    /**
     * Gets global Google Analytics object and sends a new pageview.
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
     * @return {string} The CSS class to apply on transition's 'enter' tick
     * based on the current 'direction'.
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
     * @return {string} The CSS class to apply on transition's 'leave' tick
     * based on the current 'direction'.
     */
    transitionLeaveClass(el) {
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
     * @param {!string} pageTitle - Title of the current page.
     * @return {string}
     */
    updateTitle(pageTitle) {
      document.title = (pageTitle !== undefined) ? `${pageTitle} · ${this.$root.siteName}` : this.$root.siteName;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.site
  display flex
  flex-direction column
  min-height 100vh

.content
  flex 1
  margin var(--header-height) 0 0
  overflow hidden

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
