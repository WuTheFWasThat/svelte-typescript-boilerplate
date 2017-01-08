const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

/*
* Webpack Plugins
*/
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/*
* Webpack configuration
*
* See: http://webpack.github.io/docs/configuration.html#cli
*/
module.exports = function(options) {
  var isProd = options.env === 'production';
  return {

    mode: options.env,

    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

    output: {
      /**
      * The output directory as absolute path (required).
      * See: http://webpack.github.io/docs/configuration.html#output-path
      */
      path: helpers.root('dist'),
    },

    entry: './src/main.ts',

    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
        }
      }
    },

    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#resolve
    */
    resolve: {

      /*
      * An array of extensions that should be used to resolve modules.
      *
      * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
      */
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.node'],

      // An array of directory names to be resolved to the current directory
      modules: [
        helpers.root('src'),
        helpers.root('src/app'),
        helpers.root('src/init'),
        helpers.root('src/vendor'),
        helpers.root('src/app/styling'),
        helpers.root('node_modules')
      ],
      alias: {
        'lodash': helpers.root('node_modules/lodash/index.js'),
      },

    },

    /*
    * Options affecting the normal modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#module
    */
    module: {
      /*
      * An array of automatically applied loaders.
      *
      * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
      * This means they are not resolved relative to the configuration file.
      *
      * See: http://webpack.github.io/docs/configuration.html#module-loaders
      */
      rules: [
        /*
        * Typescript loader support for .ts and Angular 2 async routes via .async.ts
        *
        * See: https://github.com/s-panferov/awesome-typescript-loader
        */
        {
          test: /\.ts$/,
          use: 'awesome-typescript-loader',
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.ts$/,
          enforce: 'pre',
          use: [
            {
              loader: 'tslint-loader',
              options: {
                emitErrors: options.env === 'production',
                failOnHint: false,
                resourcePath: 'src'
              }
            },
          ],
        },
        /*
        * Parse Svelte components
        * See: https://github.com/sveltejs/svelte-loader
        * NOTE: There's no rule that Svelte components need extension *.sve.
        * If you don't like this approach, simply change the regex and rename the files.
        */
        {
          test: /\.sve$/,
          exclude: /node_modules/,
          use: 'svelte-loader'
        },
        /*
        * Load Sass Styles
        * See: See: https://github.com/jtangelder/sass-loader
        */
        {
          test: /\.(scss|css$)/,
          use: ['style-loader','css-loader', 'sass-loader']
        },
        {
          test: /\.woff(2)?(\?v=.+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=.+)?$/,
          use: 'file-loader'
        },
        /* Raw loader support for *.html
        * Returns file content as string
        *
        * See: https://github.com/webpack/raw-loader
        */
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        /* File loader for supporting images, for example, in CSS files.
        */
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        }
      ]
    },

    /*
    * Add additional plugins to the compiler.
    *
    * See: http://webpack.github.io/docs/configuration.html#plugins
    */
    plugins: [
      //new ExtractTextPlugin({ filename: 'index.css', disable: false, allChunks: true }),

      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      new DashboardPlugin(),

      /*
      * Plugin: CopyWebpackPlugin
      * Description: Copy files and directories in webpack.
      *
      * Copies project static assets.
      *
      * See: https://www.npmjs.com/package/copy-webpack-plugin
      */
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
        },
        // {
          //   from: 'src/vendor',
          //   to: 'vendor'
          // },
      ]),

      /*
      * Plugin: HtmlWebpackPlugin
      * Description: Simplifies creation of HTML files to serve your webpack bundles.
      * This is especially useful for webpack bundles that include a hash in the filename
      * which changes every compilation.
      *
      * See: https://github.com/ampedandwired/html-webpack-plugin
      */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: 'human-data',
        isDevServer: helpers.isWebpackDevServer(),
        favicon: 'src/assets/favicon.ico',
        chunksSortMode: 'dependency',
        inject: 'head'
      }),

      /*
      * Plugin: ScriptExtHtmlWebpackPlugin
      * Description: Enhances html-webpack-plugin functionality
      * with different deployment options for your scripts including:
      *
      * See: https://github.com/numical/script-ext-html-webpack-plugin
      */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      new ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.$": 'jquery'
      }),

      /**
      * Plugin: DefinePlugin
      * Description: Define free variables.
      * Useful for having development builds with debug logging or adding global constants.
      *
      * Environment helpers
      *
      * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      */
      // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(options.env),
        'INJECTED': Object.assign({
        }, options.injected || {}),
        'process.env': {
          'ENV': JSON.stringify(options.env),
          'NODE_ENV': JSON.stringify(options.env),
        }
      }),

    ],

    /*
    * Include polyfills or mocks for various node stuff
    * Description: Node configuration
    *
    * See: https://webpack.github.io/docs/configuration.html#node
    */
    node: {
      global: true,
      crypto: 'empty',
      process: !isProd,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      dns: 'mock',
      net: 'mock'
    },

  };
};
