const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: {
      index: '/index.html',
    }
  },
  output: {
    filename: 'goodandcheap.js',
  },
});
