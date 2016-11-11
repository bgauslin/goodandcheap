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
    getQuery: state => {
      return state.query
    },
    getShowSearch: state => {
      return state.showSearch
    }
  }

}


export default search
