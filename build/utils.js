var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var PAGE_PATH = path.resolve(__dirname,'../src/pages')
var merge = require('webpack-merge')

exports.entries = function () {
  var entryfiles = glob.sync(PAGE_PATH + '/*/*.js')
  var map = {}
  entryfiles.forEach(function (filePath) {
    var filename = filePath.substring(filePath.lastIndexOf('\/')+1,filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}

exports.htmlPlugin = function () {
  var entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  var arr = []
  entryHtml.forEach(function(filePath)  {
    var filename = filePath.substring(filePath.lastIndexOf('\/')+1,filePath.lastIndexOf('.'))
    var conf = {
      template:  'html-withimg-loader!' + filePath, // 为了解析html中img的src
      filename: filename + '.html',
      chunks: [filename],
      inject: true    // js注入body底部
    }
    // if(process.env.NODE_ENV === 'development'){
    conf = merge(conf, {
      chunks: ['manifest', 'vendor', filename], //注意： 这是html-webpack-plugin插件对页面入口文件(即js文件)的限定，如果不设置则会把整个项目下的所有入口文件全部引入
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    })
    // }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({   // 从一个已存在的 loader 中，创建一个提取(extract) loader
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
