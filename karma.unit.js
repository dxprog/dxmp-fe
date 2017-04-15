const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [ 'mocha', 'chai', 'sinon' ],
    files: [ 'tests/**/*.spec.ts' ],
    preprocessors: { 'tests/**/*.spec.ts': [ 'webpack' ] },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: [ 'progress' ],
    colors: true,
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    concurrency: Infinity
  });
}