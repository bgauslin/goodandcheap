# Good And Cheap

I first heard about this cookbook on NPR, downloaded it, and that was that. A few months later, I was trying to think of a good project to give myself for learning the ins and outs of Vue.js, and voilà, this project was born.

![Good And Cheap](https://assets.gauslin.com/images/screenshots/good-and-cheap.png)

## Backend

I extracted all text and images from the PDF, placed the text into a CSV file, then imported it all into Craft CMS.

With all data now residing in a CMS, I then created a JSON API with endpoints based on the various page types:

- Home
- Info
- Chapter
- Recipes

## Frontend

The UI is made entirely with Vue, and uses `vue-router` for URL routing, `Vuex` for state management, and all components are individual `.vue` files containing HTML, JavaScript, and CSS written in Pug, ES6, and Stylus.

### Technical notes

- All state management is handled via small modules for extensibility and maintainability.
- To achieve a more app-like feel when moving between pages, all view transitions are handled by CSS and a `direction` module.
- Users can favorite recipes and check off ingredients, and all of this is saved via localStorage.

