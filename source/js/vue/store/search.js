const search = {
  state: {
    showSearch: false,
  },

  mutations: {
    showSearch (state, flag) {
      state.showSearch = flag;
    },
  },

  getters: {
    showSearch: state => state.showSearch,
  }
}

export default search;
