const direction = {
  state: {
    direction: '',
  },

  mutations: {
    updateDirection (state, name) {
      state.direction = name;
    },
  },

  getters: {
    direction: state => state.direction,
  },
}

export default direction;
