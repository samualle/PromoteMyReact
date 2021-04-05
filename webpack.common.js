const path = require('path');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/,
    ),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css' //文件目录会放入output.path里
    }),
  ],
  optimization: {
    splitChunks: { // 优先级：maxInitialRequests / maxAsyncRequests < maxSize < minSize
      chunks: 'async', // 默认是 async，提取异步模块，打包到一个文件中；initial，分别提取同步和异步模块，打包到不同文件；all，不区分同步和异步，打包到一个文件中
      // name: 'async', // 打包后的文件名
      minSize: 30000, // 模块在压缩前的大小，单位字节，默认 30k，超过才会被提取
      maxSize: 0, // 模块打包后的大小值，超过后要进行分割，默认为 0，表示不限大小
      minChunks: 1, // 模块被引用的次数，达到则提取
      maxAsyncRequests: 6, // 异步加载次数，默认为 6
      maxInitialRequests: 8, // 打包后的入口文件加载时，能够同时加载的 js 文件数，默认为 4
      automaticNameDelimiter: '~', // 生成的文件名的分隔符，默认为 ~
      cacheGroups: { // 核心重点，配置提取方案。每一项代表一个提取方案
        vendors: {
          name: 'chunk-vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级，越大越优先，默认为 0
          // reuseExistingChunk: false, // 复用已存在的文件
          // enforce: false, // 忽略 groups 外部的通用方案
          chunks: 'all',
        },
        antd: {
          name: 'ant-design',
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          priority: 0,
          chunks: 'all',
        },
        icons: {
          name: 'ant-design-icons',
          test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
          priority: 0,
          chunks: 'all',
        },
        react: {
          name: 'react-dom',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: 0,
          chunks: 'all',
        },
        utils: {
          name: 'common-utils',
          test: /[\\/]node_modules[\\/](moment|lodash|axios)[\\/]/,
          priority: 0,
          chunks: 'all',
        },
        components: {
          name: 'common-components',
          test: /[\\/]node_modules[\\/](rc-table|rc-menu|rc-select|rc-calendar|rc-trigger)[\\/]/,
          priority: 0,
          chunks: 'all',
        },
      }
    }
  },
};
