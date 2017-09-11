var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: utils.entries(),
  output: {
    path: config.build.assetsRoot,                      // 文件打包后的根路径
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'      // 按需加载外部资源的url
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 自动解析后缀名文件
    alias: {                           // 设置路径或模块的别名
      // 'vue$': 'vue/dist/vue.esm.js',  // 为支持模块自动化加载，ES6语法
      'vue$': 'vue/dist/vue.common.js', // 为将默认的运行时构建转成独立构建，Commonjs写法
      '@': resolve('src')
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]  // 匹配特定条件。一般是提供一个字符串或者字符串数组
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // loader: 'url-loader',
        loader: 'url-loader',                  // file-loader copy files to dist directory, while url-loader don't. Here we use copyWebpackPlugin to copy static files
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.ProvidePlugin({  // 模块自动化加载
      Vue: 'vue',
      jQuery: 'jquery',
      $: 'jquery'
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      // filename: utils.assetsPath('css/[name].[contenthash].css')
      filename: 'css/[name].[contenthash].css'
    }),

  ].concat(utils.htmlPlugin()),
}
