// see https://jsfiddle.net/crswll/4emwdkv3/12/
// see http://codepen.io/lbineau/pen/QNBMdv
import Vue from 'vue/dist/vue.js'

export default function(router) {

  router.beforeEach((to, from, next) => {
    //console.log(from.name + ' -> ' + to.name)

    if (from.name === null && to.name === 'chapters') {
      // home
      router.app.$store.commit('setTransitionName', 'forward')
    } else if (from.name === 'chapters' && to.name === 'chapter') {
      // home -> chapter
      router.app.$store.commit('setTransitionName', 'forward')
    } else if (from.name === 'chapter' && to.name === 'chapters') {
      // chapter -> home
      router.app.$store.commit('setTransitionName', 'back')
    } else if (from.name === 'chapter' && to.name === 'intro') {
      // chapter -> recipe
      router.app.$store.commit('setTransitionName', 'forward')
    } else if (from.name === 'intro' || from.name === 'ingredients' || from.name === 'steps' ) {
      if (to.name === 'chapter') {
        // recipe -> chapter
        router.app.$store.commit('setTransitionName', 'back')
      }
      if (to.name === 'intro' || to.name === 'ingredients' || to.name === 'steps' ) {
        // recipe -> recipe
        router.app.$store.commit('setTransitionName', null)
      }
    } else {
      // default
      router.app.$store.commit('setTransitionName', 'up')
    }

    //console.log('transitionName = ' + router.app.$store.getters.getTransitionName)
    //console.log('-----')
    next()
  })
}
