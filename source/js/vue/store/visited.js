const favorites = {

  state: {
    visited: JSON.parse(localStorage.getItem('visited')) || []
  },

  mutations: {
    addVisited (state, item) {
      state.visited.push(item)
      localStorage.setItem('visited', JSON.stringify(state.visited))
    }
  },

  getters: {
    visitedIds: state => {
      return state.visited
    }
  }
}

export default favorites
