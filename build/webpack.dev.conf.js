var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',          // 是否生成，以及如何生成 source map
  plugins: [

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      test: /\.js$/,
      exclude: ['vendor','manifest'],
      append: '//# sourceMappingURL=[url]',    // 注意： #后面有空格
      filename: 'js/[name].js.map',
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]'
    }),
    new webpack.optimize.CommonsChunkPlugin({  // 在js从node_modules引入的包文件打包成vendor
      name: 'vendor',
      minChunks: function (module, count) {      // 每个chunks里的模块，count指模块的数量
        // any required modules inside node_modules are extracted to vendor
        return (                                //返回js文件中引入node_modules里的模块，提取到vendor.js
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated 返回vendor的清单
    new webpack.optimize.CommonsChunkPlugin({              // 由于原插件放到base.conf.js中，会报错找不到vendor,所以单独提到dev和prod文件中
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})
