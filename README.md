# Good And Cheap

[GoodAndCheap.website](https://goodandcheap.website)

I first heard about this cookbook on NPR, downloaded the free PDF, then used its conversion to a web app as the basis for getting more familiar with Vue.

![Good And Cheap](https://assets.gauslin.com/images/screenshots/good-and-cheap.png?v=2)

All text and images were extracted from the PDF, imported into Craft CMS, and [JSON endpoints][endpoints] were created for each of the various page types.

[endpoints]: https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/craft/config/element-api.php#L12-L73

The frontend uses `vue-router` for [URL routing][routing] and `Vuex` for [state management][store], and is composed entirely of [single file `.vue` components][vue_components] written in Pug, ES6, and Stylus.

[routing]: https://github.com/bgauslin/goodandcheap/blob/63ef3456ebe1e20030fb16489b8393127d5e2606/source/js/vue/routes.js#L15-L107
[store]: https://github.com/bgauslin/goodandcheap/tree/master/source/js/vue/store
[vue_components]: https://github.com/bgauslin/goodandcheap/tree/master/source/js/vue/components

An `App` component [watches for route changes][watches] in order to [fetch data from an endpoint][fetch_data], then sets a [transition direction][transition_direction] and related [CSS classes][transition_classes] for [leaving the current route][leave_class] and [entering the new route][enter_class].

[watches]: https://github.com/bgauslin/goodandcheap/blob/63ef3456ebe1e20030fb16489b8393127d5e2606/source/js/vue/components/App.vue#L70-L85
[fetch_data]: https://github.com/bgauslin/goodandcheap/blob/63ef3456ebe1e20030fb16489b8393127d5e2606/source/js/vue/components/App.vue#L167-L196
[transition_direction]: https://github.com/bgauslin/goodandcheap/blob/63ef3456ebe1e20030fb16489b8393127d5e2606/source/js/vue/transitions.js#L3-L39
[transition_classes]: https://github.com/bgauslin/goodandcheap/blob/63ef3456ebe1e20030fb16489b8393127d5e2606/source/js/vue/components/App.vue#L300-L334
[leave_class]: https://github.com/bgauslin/goodandcheap/blob/63ef3456ebe1e20030fb16489b8393127d5e2606/source/js/vue/components/App.vue#L261-L270
[enter_class]: https://github.com/bgauslin/goodandcheap/blob/63ef3456ebe1e20030fb16489b8393127d5e2606/source/js/vue/components/App.vue#L246-L255

Each route loads its own component and is passed data from its related endpoint transformer:

- Home page:
  - ['Home' component](https://github.com/bgauslin/goodandcheap/blob/master/source/js/vue/components/Home.vue)
  - ['Chapters' component](https://github.com/bgauslin/goodandcheap/blob/master/source/js/vue/components/Chapters.vue)
  - ['Pages' component](https://github.com/bgauslin/goodandcheap/blob/master/source/js/vue/components/Pages.vue)
  - ['index' endpoint transformer](https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/home.php#L6-L44)
- Info page:
  - ['Info' component](https://github.com/bgauslin/goodandcheap/blob/master/source/js/vue/components/Page.vue)
  - ['info' endpoint transformer](https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/info.php#L7-L42)
- Chapter with multiple recipes
  - ['Chapter' component](https://github.com/bgauslin/goodandcheap/blob/master/source/js/vue/components/Chapter.vue)
  - ['chapter' endpoint transformer](https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/chapter.php#L7-L48)
- Individual recipe
  - ['Recipe' component](https://github.com/bgauslin/goodandcheap/blob/master/source/js/vue/components/Recipe.vue)
  - ['recipe' endpoint transformer](https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/recipe.php#L7-L149)
- Search results
  - ['Search' component](https://github.com/bgauslin/goodandcheap/blob/master/source/js/vue/components/SearchResults.vue)
  - ['search' endpoint transformer](https://github.com/bgauslin/goodandcheap_api/blob/b46679b223958d90f4e027e145e2c94d9ffeb479/source/transformers/search.php#L6-L27)

TODO:

- Favorites
- Image swapping
