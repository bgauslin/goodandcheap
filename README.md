# Good And Cheap

I first heard about this cookbook on NPR, downloaded it, and it became the basis for learning the ins and outs of Vue a few months later.

![Good And Cheap](https://assets.gauslin.com/images/screenshots/good-and-cheap.png?v=2)

## Backend

All text and images were extracted from the PDF, the text was placed into a CSV file, and then they were all imported into Craft CMS.

Next a JSON API with endpoints based on the various page types was created, and this data is fetched by the frontend depending on the route:

- Home
- Info
- Chapter
- Recipes
- Search

## Frontend

The UI is made entirely with Vue, and uses `vue-router` for URL routing, `Vuex` for state management, and all components are individual `.vue` files containing HTML, JavaScript, and CSS written in Pug, ES6, and Stylus.

### Technical notes

- All state management is handled via small modules for extensibility and maintainability.
- To achieve a more app-like feel when moving between pages, all view transitions are handled by CSS and a `direction` module.
- Users can favorite recipes and check off ingredients, and all of this is saved via localStorage.

