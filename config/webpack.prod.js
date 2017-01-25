/**
 * Configuration of a production build resembles development configuration ... with a few key changes
 */
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
      /**
       * This time the output bundle files are physically placed in the dist folder.
       */
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
      /**
       * NoErrorsPlugin - stops the build if there is any error.
       */
    new webpack.NoErrorsPlugin(),
    /**
     * DedupePlugin - detects identical (and nearly identical) files and removes them from the output.
     */
    new webpack.optimize.DedupePlugin(),
    /**
     * UglifyJsPlugin - minifies the bundles.
     */
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    /**
     * ExtractTextPlugin - extracts embedded css as external files, adding cache-busting hash to the filename.
     */
    new ExtractTextPlugin('[name].[hash].css'),
    /**
     * DefinePlugin - use to define environment variables that we can reference within our application.
     */
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
