<template lang="pug">
  div
    preloader(v-if="!loaded")
    div(v-if="loaded")
      tabs(:tabs="tabs")
      router-view(
        :chapters="chapters",
        :pages="pages"
      )
</template>

<script>
import Preloader from './partials/Preloader.vue'
import Tabs from './partials/Tabs.vue'

export default {
  components: { Preloader, Tabs },

  data () {
    return {
      loaded: false,
      chapters: null,
      pages: null,
      dataUrl: this.$root.apiBaseUrl + 'home',
      tabs: [
        { label: 'Recipes', name: 'chapters' },
        { label: 'Info', name: 'pages' }
      ]
    }
  },

  created () {
    this.fetchData(this.dataUrl)
  },

  methods: {
    fetchData (url) {
      this.$http.get(url).then((response) => {
        this.chapters = response.data.chapters
        this.pages = response.data.pages
        //this.updateTitle(null)
        this.loaded = true
      })
    },
    updateTitle(title) {
      //this.$root.$emit('update-title', title)
    }
  }
}
</script>
