const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js'); // settings common to prod and dev
const path = require('path');

const WebpackMd5Hash = require('webpack-md5-hash');

process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = function(env) {
  return webpackMerge(commonConfig({
    env: 'production',
    injected: {
      HMR: false,
    }
  }), {
    output: {
      filename: "[name].[chunkhash].bundle.js",
    },

    optimization: {
      minimize: true
    },

    plugins: [
      new WebpackMd5Hash(),
    ],
  });

};
