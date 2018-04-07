<template lang="pug">
  div.site
    app-header(
      :home="home",
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
          :data="data",
          :key="data",
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

  data () {
    return {
      data: null,
      dataLoaded: null,
      endpoint: '',
      home: null,
      transitionEnter: null,
      transitionLeave: null,
    }
  },

  computed: {
    parent () {
      return this.$store.getters.getParent;
    },

    direction () {
      return this.$store.getters.getDirection;
    },
  },

  created () {
    this.isHome();
    this.isSearch();

    this.endpoint = this.$route.meta.endpoint;
    if (this.endpoint !== undefined) {
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

  methods: {
    afterEnter (el) {
      el.classList.remove(this.transitionEnter);
    },

    afterLeave (el) {
      el.classList.remove(this.transitionLeave);
    },

    beforeEnter (el) {
      console.log('beforeEnter this.direction', this.direction);

      switch (this.direction) {
        case 'forward':
          this.transitionEnter = 'slide-in-right';
          break
        case 'back':
          this.transitionEnter = 'slide-in-left';
          break;
        default:
          this.transitionEnter = 'slide-in-up';
          break;
      }
      el.classList.add(this.transitionEnter);

      // reset scroll position for iOS
      setTimeout(() => {
        window.scrollTo(0, 1)
      }, 0);
    },

    beforeLeave (el) {
      console.log('beforeLeave this.direction', this.direction);

      switch (this.direction) {
        case 'forward':
          this.transitionLeave = 'slide-out-left';
          break;
        case 'back':
          this.transitionLeave = 'slide-out-right';
          break;
        default:
          this.transitionLeave = 'slide-out-down';
          break;
      }
      el.classList.add(this.transitionLeave);
    },

    doFetch(to, from) {
      if (to.name === 'intro') {
        if (from.name === 'steps' || from.name === 'ingredients') {
          return;
        }
      } else if (to.name === 'steps' || to.name === 'ingredients') {
        return;
      } else if (from.name === 'pages' && to.name === 'chapters') {
        return;
      } else if (from.name === 'chapters' && to.name === 'pages') {
        return;
      } else if (to.name === 'favorites') {
        return;
      } else {
        return true;
      }
    },

    fetchData (endpoint) {
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
          that.dataLoaded = true;
        }
      })
    },

    isHome () {
      this.home = (this.$route.name === 'chapters');
    },

    isSearch () {
      const setSearch = (this.$route.name === 'search');
      this.$store.commit('setSearch', setSearch);
    },

    notFound() {
      window.location.replace('/404');
    },

    updateTitle (title) {
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

  @media(min-width BREAKPOINT_MEDIUM)
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

@media(min-width BREAKPOINT_MEDIUM)
  .slide-in-left
  .slide-in-right
  .slide-in-up
  .slide-out-left
  .slide-out-right
  .slide-out-down
    animation-duration .35s

</style>
