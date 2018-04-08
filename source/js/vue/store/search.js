const search = {
  state: {
    showSearch: false,
  },

  mutations: {
    setSearch (state, flag) {
      state.showSearch = flag;
    },
  },

  getters: {
    getShowSearch: state => state.showSearch,
  }
}

export default search;
