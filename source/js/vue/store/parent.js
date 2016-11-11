const favorites = {

  state: {
    parent: null
  },

  mutations: {
    setParent (state, parent) {
      state.parent = parent
    }
  },

  getters: {
    getParent: state => {
      return state.parent
    }
  }

}

export default favorites
