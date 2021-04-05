const path = require('path');
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8082,
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    inline: true,
    liveReload: false,
    stats: {
      modules: false,
      entrypoints: false
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ]
});
