import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import direction from './direction';
import favorites from './favorites';
import ingredients from './ingredients';
import parent from './parent';
import search from './search';
import visited from './visited';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    direction,
    favorites,
    ingredients,
    parent,
    search,
    visited,
  }
});
