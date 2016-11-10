// see https://jsfiddle.net/crswll/4emwdkv3/12/
// see http://codepen.io/lbineau/pen/QNBMdv
import Vue from 'vue/dist/vue.js'

export default function(router) {

  var transitions = {
    '/bar': ['bounceInDown', 'flipOutX'],
    '/': ['zoomIn', 'zoomOut']
  }

  router.beforeEach((to, from, next) => {
    console.log('router.beforeEach')
    console.log(from.name + ' -> ' + to.name)
    //console.log('from = ' + from.name)
    // set transitions here...

    if (from.name === 'chapters' && to.name === 'chapter') {
      router.app.transitionName = 'forward'
    } else {
      router.app.transitionName = 'none'
    }
    console.log('router.transitionName = ' + router.app.transitionName)
    console.log('-----')

    next()
  })

  router.afterEach((to, from) => {
    console.log('router.afterEach')
    console.log('-----')
  	//var t = transitions[transition.to.path]
    //router.app.transition.in = t[0]
  })

  /*
  Vue.transition('test', {
  	beforeEnter: function (el) {
    	//el.classList.add(this.transition.in)
    },
    afterEnter: function (el) {
    	//el.classList.remove(this.transition.in)
    },
    beforeLeave: function (el) {
    	//el.classList.add(this.transition.out)
    },
    afterLeave: function (el) {
    	//el.classList.remove(this.transition.out)
    }
  })
  */
}
