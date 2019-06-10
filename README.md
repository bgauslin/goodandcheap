# Good And Cheap

I first heard about this cookbook on NPR, downloaded the free PDF, then used its conversion to a web app as the basis for getting more familiar with Vue.

![Good And Cheap](https://assets.gauslin.com/images/screenshots/good-and-cheap.png?v=2)

## Backend

All text and images were extracted from the PDF,  imported into [Craft CMS][craft], and [JSON endpoints][endpoints] were then created for each of the various page types:

- [Home][endpoint_home]
- [Info page][endpoint_page]
- [Chapter][endpoint_chapter]
- [Recipe][endpoint_recipe]
- [Search][endpoint_search]

## Frontend

The UI is made entirely with [Vue][vue], and uses `vue-router` for URL routing, `Vuex` for state management, and all components are individual `.vue` files containing HTML, JavaScript, and CSS written in Pug, ES6, and Stylus.

- All state management is handled via small modules for extensibility and maintainability.
- To achieve a more app-like feel when moving between pages, all view transitions are handled by CSS and a `direction` module.
- Users can favorite recipes and check off ingredients, and all of this is saved via localStorage.


[vue]: https://vuejs.org
[craft]: https://craftcms.com
[endpoints]: https://github.com/bgauslin/goodandcheap_api/blob/master/craft/config/element-api.php
[endpoint_home]: https://github.com/bgauslin/goodandcheap_api/blob/master/source/transformers/home.php
[endpoint_page]: https://github.com/bgauslin/goodandcheap_api/blob/master/source/transformers/page.php
[endpoint_chapter]: https://github.com/bgauslin/goodandcheap_api/blob/master/source/transformers/chapter.php
[endpoint_recipe]: https://github.com/bgauslin/goodandcheap_api/blob/master/source/transformers/recipe.php
[endpoint_search]: https://github.com/bgauslin/goodandcheap_api/blob/master/source/transformers/search.php