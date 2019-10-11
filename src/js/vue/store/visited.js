const favorites = {
  state: {
    visited: JSON.parse(localStorage.getItem('visited')) || [],
  },

  mutations: {
    addVisited (state, item) {
      state.visited.push(item);
      state.visited = [...new Set(state.visited)].sort();
      localStorage.setItem('visited', JSON.stringify(state.visited));
    },
  },

  getters: {
    visitedIds: state => state.visited,
  },
}

export default favorites;
