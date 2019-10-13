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
        @before-enter="beforeEnter",
        @after-enter="afterEnter",
        @before-leave="beforeLeave",
        @after-leave="afterLeave",
        mode="out-in",
      )
        router-view(
          v-if="hasData",
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
      data: {},
      hasData: false,
      key: '',
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

    // Set hasData flag for 404 route.
    if (this.$route.name === '404') {
      this.hasData = true;
    }
  },

  watch: {
    '$route' (to, from) {
      // TODO: Make calls to favoritesPage() and searchPage() more DRY.
      this.favoritesPage();
      this.searchPage();

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
        this.data = await response.json();
        this.key = this.data.slug;
        this.updateParent(this.data.parent);
        this.updateTitle(this.data.title);
        this.sendPageview(this.data.title);
        this.hasData = true;
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
