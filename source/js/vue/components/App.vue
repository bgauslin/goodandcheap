<template lang="pug">
  div.site
    app-header(
      :home="home",
      :parent="parent",
      :query="query",
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
          :data="data",
          :key="key",
          :query="query",
        )
    app-footer
</template>

<script>
import AppFooter from './global/Footer.vue';
import AppHeader from './global/Header.vue';
import Breadcrumbs from './partials/Breadcrumbs.vue';
import Preloader from './partials/Preloader.vue';
import request from 'superagent';

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
      home: null,
      key: null,
      query: null,
      transitionEnter: null,
      transitionLeave: null,
    }
  },

  created() {
    this.isHome();
    this.isFavorites();
    this.isSearch();

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
      this.isHome();
      this.isFavorites();
      this.isSearch();

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
    /** @return {} */
    parent() {
      return this.$store.getters.getParent;
    },

    /** @return {string} */
    direction() {
      return this.$store.getters.getDirection;
    },
  },

  methods: {
    afterEnter(el) {
      el.classList.remove(this.transitionEnterClass());
    },

    afterLeave(el) {
      el.classList.remove(this.transitionLeaveClass());
    },

    beforeEnter(el) {
      el.classList.add(this.transitionEnterClass());
      // reset scroll position for iOS
      setTimeout(() => {
        window.scrollTo(0, 1)
      }, 0);
    },

    beforeLeave(el) {
      el.classList.add(this.transitionLeaveClass());
    },

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

    fetchData(endpoint) {
      let endpointUrl = this.$root.apiBaseUrl + endpoint;
      let slug = this.$route.params.slug;

      // append query for search
      if (window.location.search) {
        endpointUrl += window.location.search;
      }

      // set slug to undefined when going from 'page' to 'info'
      if (slug === null) {
        slug = undefined;
      }

      if (slug !== undefined) {
        endpointUrl += '/' + slug;
      }

      let that = this;
      request
      .get(endpointUrl)
      .end((error, response) => {
        if (error || !response.ok) {
          that.notFound();
        } else {
          that.data = response.body;
          that.$store.commit('setParent', response.body.parent);
          that.updateTitle(response.body.title);
          that.key = that.data.slug;
          that.dataLoaded = true;
        }
      })
    },

    isFavorites() {
      if (this.$route.name === 'favorites') {
        this.key = 'favorites';
        this.$store.commit('setParent', null);
      }
    },

    isHome() {
      this.home = (this.$route.name === 'chapters');
    },

    isSearch() {
      const setSearch = (this.$route.name === 'search');
      this.$store.commit('setSearch', setSearch);

      if (setSearch) {
        let query = window.location.search;
        this.query = (query) ? query.replace('?q=', '').replace('%20', ' ') : null;
      } else {
        this.query = '';
      }
    },

    notFound() {
      window.location.replace('/404');
    },

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

    updateTitle(title) {
      document.title = (title !== undefined) ? `${title} · ${this.$root.siteName}` : this.$root.siteName;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.site
  display flex
  flex-direction column
  min-height 100vh

.content
  flex 1
  margin HEADER_HEIGHT_BASE 0 0
  overflow hidden

  @media BREAKPOINT_MEDIUM
    margin-top HEADER_HEIGHT_MEDIUM

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

@media BREAKPOINT_MEDIUM
  .slide-in-left
  .slide-in-right
  .slide-in-up
  .slide-out-left
  .slide-out-right
  .slide-out-down
    animation-duration .35s

</style>
