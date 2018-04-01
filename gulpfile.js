var elixir = require('laravel-elixir');

require('laravel-elixir-browserify-official');
require('laravel-elixir-vueify');
require('laravel-elixir-pug');
require('laravel-elixir-livereload');

elixir.config.sourcemaps = false;
elixir.config.assetsPath = 'source';
elixir.config.js.outputFolder = 'ui';
elixir.config.css.outputFolder = 'ui';

elixir(function(mix) {
  mix.browserify('goodandcheap.js')
  .stylus('goodandcheap.styl')
  .stylus('offline.styl')
  .copy('source/html', 'public')
  .copy('source/img', 'public/ui/img')
  .copy('source/webfonts', 'public/ui/webfonts')
  .version(['public/ui/goodandcheap.js', 'public/ui/goodandcheap.css'])
  .livereload()
  .browserSync({
    proxy: 'goodandcheap.test'
  });
});
