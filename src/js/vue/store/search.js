const search = {
  state: {
    searchQuery: '',
    showSearch: false,
  },

  mutations: {
    searchQuery (state, value) {
      state.searchQuery = value.replace('?q=', '').replace(/%20/g, ' ');
    },

    showSearch (state, flag) {
      state.showSearch = flag;
    },
  },

  getters: {
    searchQuery: state => state.searchQuery,
    showSearch: state => state.showSearch,
  }
}

export default search;
