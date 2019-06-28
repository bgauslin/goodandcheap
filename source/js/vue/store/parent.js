const parent = {
  state: {
    parent: '',
  },

  mutations: {
    parent (state, parent) {
      state.parent = parent;
    },
  },

  getters: {
    parent: state => state.parent,
  },
}

export default parent;
