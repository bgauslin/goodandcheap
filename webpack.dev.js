const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');


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
  plugins: [
    new CopyPlugin([
      { from: 'src/json' },
    ])
  ]
});
