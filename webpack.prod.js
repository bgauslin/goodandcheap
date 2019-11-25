const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'goodandcheap.[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'offline.html',
      template: 'src/html/offline.pug',
      inject: false,
    }),
  ],
});
