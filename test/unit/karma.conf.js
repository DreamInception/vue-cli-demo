// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],
    //frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    //files: ['./index.js'],                // 加载到浏览器的文件列表，被测试的文件
    files: ['./specs/*.spec.js'],
    preprocessors: {
      //'./index.js': ['webpack', 'sourcemap','coverage']       // 预处理器所处理的文件，也指被测试的文件
      './specs/*.spec.js': ['webpack']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
      }
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    singleRun: true       // 持续集成模式，true表示浏览器执行测试后退出
  })
}
