const search = {
  state: {
    searchQuery: '',
    showSearch: false,
  },

  mutations: {
    updateSearchQuery (state, value) {
      state.searchQuery = value.replace('?q=', '').replace(/%20/g, ' ');
    },

    updateShowSearch (state, flag) {
      state.showSearch = flag;
    },
  },

  getters: {
    searchQuery: state => state.searchQuery,
    showSearch: state => state.showSearch,
  }
}

export default search;
