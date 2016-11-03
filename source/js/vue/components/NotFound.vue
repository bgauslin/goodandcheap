<template lang="pug">
  div
    h1 {{ title }}
    div
      h2 {{ errorMessage }}
      p {{ summary }}
</template>

<script>
export default {
  data () {
    return {
      title: 'Uh oh!',
      summary: 'The page you requested cannot be found. :(',
      errorMessage: 'Error 404',
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'


</style>
