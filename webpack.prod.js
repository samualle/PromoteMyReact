const { merge } = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'nosources-source-map',
  stats: {
    modules: false,
    entrypoints: false
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
  ]
});
