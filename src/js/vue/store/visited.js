const favorites = {
  state: {
    visited: JSON.parse(localStorage.getItem('visited')) || [],
  },

  mutations: {
    addVisited (state, item) {
      const visited = new Set(state.visited);
      if (!visited.has(item)) {
        visited.add(item);
      }
      state.visited = [...visited].sort();
      localStorage.setItem('visited', JSON.stringify(state.visited));
    },
  },

  getters: {
    visitedIds: state => new Set(state.visited),
  },
}

export default favorites;
