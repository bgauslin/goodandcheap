//import Vue from 'vue/dist/vue.js'

export default function(router) {

  router.beforeEach((to, from, next) => {
    console.log(from.name + ' -> ' + to.name)

    // good gravy, this is convoluted!
    if (to.name === 'favorites') {
      router.app.$store.commit('setTransitionName', 'up')
    } else if (from.name === 'chapters' && to.name === 'chapter') {
      router.app.$store.commit('setTransitionName', 'forward')
    } else if (from.name === 'chapter' && to.name === 'chapters') {
      router.app.$store.commit('setTransitionName', 'back')
    } else if (from.name === 'chapter' && to.name === 'intro') {
      router.app.$store.commit('setTransitionName', 'forward')
    } else if (from.name === 'intro' || from.name === 'ingredients' || from.name === 'steps' ) {
      if (to.name === 'chapter') {
        router.app.$store.commit('setTransitionName', 'back')
      }
      if (to.name === 'intro' || to.name === 'ingredients' || to.name === 'steps' ) {
        router.app.$store.commit('setTransitionName', null)
      }
    } else if (from.name === 'pages' && to.name === 'info') {
      router.app.$store.commit('setTransitionName', 'forward')
    } else if (from.name === 'info' && to.name === 'pages') {
      router.app.$store.commit('setTransitionName', 'back')
    } else {
      router.app.$store.commit('setTransitionName', 'up')
    }

    console.log('transitionName = ' + router.app.$store.getters.getTransitionName)
    console.log('-----')
    next()
  })
}
