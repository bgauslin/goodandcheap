require('dotenv').config();
import setup from './setup';
import Vue from 'vue/dist/vue.js';
import App from './vue/components/App.vue';
import router from './vue/router';
import store from './vue/store/index';
import transitions from './vue/transitions';

setup.init();

Vue.config.productionTip = false;
transitions(router);

new Vue({
  components: { App },
  data: {
    siteName: document.title,
  },
  router,
  store,
  template: '<app></app>',
}).$mount('#app');
