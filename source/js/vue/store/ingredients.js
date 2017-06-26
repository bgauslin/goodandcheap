const ingredients = {
  state: {
    ingredients: JSON.parse(localStorage.getItem('ingredients')) || []
  },

  mutations: {
    addIngredient (state, id) {
      state.ingredients.push(id)
      localStorage.setItem('ingredients', JSON.stringify(state.ingredients))
    },
    removeIngredient (state, id) {
      var i = state.ingredients.indexOf(id)
      state.ingredients.splice(i, 1)
      localStorage.setItem('ingredients', JSON.stringify(state.ingredients))
    }
  },

  getters: {
    ingredientsIds: state => state.ingredients
  }
}

export default ingredients
