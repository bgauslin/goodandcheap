const parent = {
  state: {
    parent: '',
  },

  mutations: {
    updateParent (state, parent) {
      state.parent = parent;
    },
  },

  getters: {
    parent: state => state.parent,
  },
}

export default parent;
