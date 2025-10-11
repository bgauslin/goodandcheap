const common = require('./webpack.common.js');
const {merge} = require('webpack-merge');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new BaseHrefWebpackPlugin({
      baseHref: '/',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
});