const search = {
  state: {
    query: null,
    showSearch: false
  },

  mutations: {
    setQuery (state, query) {
      state.query = query
    },
    setSearch (state, flag) {
      state.showSearch = flag
    }
  },

  getters: {
    getQuery: state => state.query,
    getShowSearch: state => state.showSearch
  }
}

export default search
