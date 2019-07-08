const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill/noConflict', './src/js/goodandcheap.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'src/apache' },
      { from: 'src/icons' },
      { from: 'src/img', to: 'img' },
    ]),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        ),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['transform-regenerator'],
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          { // Vue components with <template lang="pug"> tags.
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          { // Standard Pug templates.
            use: [
              'raw-loader',
              'pug-plain-loader',
            ]
          }
        ]
      },
      { // TODO: Put all generated webfonts into a folder.
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
}