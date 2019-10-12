const favorites = {
  state: {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  },

  mutations: {
    addFavorite (state, item) {
      state.favorites.push(item);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    removeFavorite (state, item) {
      const i = state.favorites.indexOf(item);
      state.favorites.splice(i, 1);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },

  getters: {
    favoritesCount: state => state.favorites.length,
    favoritesIds: state => state.favorites.map(favorite => favorite.id),
    hasFavorites: state => state.favorites.length > 0,
  },
}

export default favorites;
