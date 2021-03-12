require('dotenv').config();

import setup from './setup';
import Vue from 'vue/dist/vue.js';
import App from './vue/components/App.vue';
import router from './vue/router';
import store from './vue/store/index';
import transitions from './vue/transitions';

Vue.config.productionTip = false;
transitions(router);
setup.init();

new Vue({
  components: { App },
  data: {
    siteName: document.title,
  },
  router,
  store,
  template: '<app></app>',
}).$mount('#app');

// Register the Service Worker.
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}