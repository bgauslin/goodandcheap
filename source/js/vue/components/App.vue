<template lang="pug">
  div.site
    app-header
    div.content
      router-view
    app-footer
</template>

<script>
import AppHeader from './global/Header.vue'
import AppFooter from './global/Footer.vue'

export default {
  components: { AppHeader, AppFooter }
}
</script>


<style lang="stylus">
@import '../../../stylus/config/'

.site
  display flex
  min-height 100vh
  flex-direction column

.content
  flex 1
  padding-top header-height-base

  @media(min-width breakpoint-medium)
    padding-top header-height-medium

</style>
