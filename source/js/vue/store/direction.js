const direction = {
  state: {
    direction: '',
  },

  mutations: {
    direction (state, name) {
      state.direction = name;
    },
  },

  getters: {
    direction: state => state.direction,
  },
}

export default direction;
