const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: ['@babel/polyfill/noConflict', './src/js/goodandcheap.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'src/img', to: 'img' },
      { from: 'src/root' },
    ]),
    new DotenvWebpack(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.pug',
    }),
    new VueLoaderPlugin(),
  ],
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        ),
        // TODO(webpack): Remove ES5 transpilation.
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
          'postcss-loader',
          'stylus-loader',
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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
          }
        }]
      }
    ]
  }
}