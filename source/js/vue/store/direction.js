const direction = {
  state: {
    direction: null,
  },

  mutations: {
    setDirection (state, name) {
      state.direction = name;
    },
  },

  getters: {
    getDirection: state => state.direction,
  },
}

export default direction;
