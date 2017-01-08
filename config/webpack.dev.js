const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js'); // settings common to prod and dev
const path = require('path');

process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

module.exports = function(options) {
  return webpackMerge(commonConfig({
    env: 'development',
    injected: {
      HMR: helpers.hasProcessFlag('hot')
    }
  }), {

    output: {
      filename: "[name].[hash].bundle.js",
      sourceMapFilename: '[name].map',
      pathinfo: true
    },

    // https://webpack.github.io/docs/webpack-dev-server.html
    devServer: {
      port: PORT,
      host: HOST,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      // outputPath: helpers.root('dist')
    },
  });

};
