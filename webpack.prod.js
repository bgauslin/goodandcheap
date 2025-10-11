const common = require('./webpack.common.js');
const {merge} = require('webpack-merge');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[contenthash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new BaseHrefWebpackPlugin({
      baseHref: '/goodandcheap/',
    }),
  ],
});