# Good And Cheap

[goodandcheap.website][url]

I first heard about this cookbook on NPR, downloaded the free PDF, then used its conversion to a web app as the basis for getting more familiar with Vue.

![Good And Cheap](https://assets.gauslin.com/images/screenshots/good-and-cheap.png?v=2)

All text and images were extracted from the PDF, imported into Craft CMS, and [JSON endpoints][endpoints] were then created for each of the various page types:

- [Home transformer][transformer_home] and [JSON endpoint][endpoint_home]
- [Info transformer][transformer_info] and [JSON endpoint][endpoint_info]
- [Chapter transformer][transformer_chapter] and [JSON endpoint][endpoint_chapter]
- [Recipe transformer][transformer_recipe] and [JSON endpoint][endpoint_recipe]
- [Search transformer][transformer_search] and [JSON endpoint][endpoint_search]

The UI is made entirely with Vue, and uses `vue-router` for URL routing, `Vuex` for state management, and all components are individual `.vue` files containing HTML, JavaScript, and CSS written in Pug, ES6, and Stylus.

- App controller...
- All state management is handled via small modules for extensibility and maintainability.
- To achieve a more app-like feel when moving between pages, all view transitions are handled by CSS and a `direction` module.
- Users can favorite recipes and check off ingredients, and all of this is saved via localStorage.


[url]: https://goodandcheap.website

[endpoints]: https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/craft/config/element-api.php#L12-L73

[transformer_home]: https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/home.php#L6-L44
[transformer_info]: https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/info.php#L7-L42
[transformer_chapter]: https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/chapter.php#L7-L48
[transformer_recipe]: https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/recipe.php#L7-L149
[transformer_search]: https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/search.php#L6-L27

[endpoint_home]: https://api.goodandcheap.website/v2/home
[endpoint_info]: https://api.goodandcheap.website/v2/info/introduction
[endpoint_chapter]: https://api.goodandcheap.website/v2/chapter/breakfast
[endpoint_recipe]: https://api.goodandcheap.website/v2/recipe/broiled-grapefruit
[endpoint_search]: https://api.goodandcheap.website/v2/search?q=tomato