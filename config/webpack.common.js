/**
 * Typos are common. There's a tool called webpack-validator that we can use to validate our configuration 
 * to ensure that there aren't any typos, and give us a little bit more of a helpful error message.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
      /**
       * We are splitting our application into three bundles:
       * ----------------------------------------------------
       * - polyfills - the standard polyfills we require to run Angular applications in most modern browsers.
       * - vendor - the vendor files we need: Angular, lodash, bootstrap.css...
       * - app - our application code.
       */
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
      /**
       * But most of our import statements won't mention the extension at all. 
       * So we tell Webpack to resolve module file requests by looking for matching files with:
       * 
       * - an explicit extension (signified by the empty extension string, '') or
       * - .js extension (for regular JavaScript files and pre-compiled TypeScript files) or
       * - .ts extension.
       */
    extensions: ['', '.ts', '.js']
  },

  module: {
     
    loaders: [
      {
        // we don't repeat the same test for the loader in the whole file or the next one will be ignored.
        test: /\.ts$/,
        /**
         * awesome-typescript-loader - a loader to transpile our Typescript code to ES5, guided by the tsconfig.json file
         * angular2-template-loader - loads angular components' template and styles
         */
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      },
      {
        test: /\.html$/,
        /**
         * html - for component templates
         */
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        /**
         * images/fonts - Images and fonts are bundled as well.
         */
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        /**
         * css - The pattern matches application-wide styles; 
         *       the second handles component-scoped styles
         *       (the ones specified in a component's styleUrls metadata property)
         */
        /**
         * The first pattern excludes .css files within the /src/app directories 
         * where our component-scoped styles sit. 
         * It includes only .css files located at or above /src; 
         * these are the application-wide styles. 
         * The ExtractTextPlugin (described below) applies the style and css loaders to these files.
         */
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        /**
         * The second pattern filters for component-scoped styles 
         * and loads them as strings via the raw loader — 
         * which is what Angular expects to do with styles specified
         * in a styleUrls metadata property.
         */
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
       /**
       * Multiple loaders can be also chained using the array notation.
       */
    ]
  },

  plugins: [
      /**
       * We want the app.js bundle to contain only app code and the vendor.js bundle 
       * to contain only the vendor code.
       * Our application code imports vendor code. Webpack is not smart enough to keep 
       * the vendor code out of the app.js bundle. 
       * We rely on the CommonsChunkPlugin to do that job.
       */
      /**
       * It identifies the hierarchy among three chunks: app -> vendor -> polyfills. 
       * Where Webpack finds that app has shared dependencies with vendor, 
       * it removes them from app. 
       * It would do the same if vendor and polyfills had shared dependencies (which they don't).
       */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
      /**
       * Webpack generates a number of js and css files. We could insert them into our index.html manually. 
       * That would be tedious and error-prone. 
       * Webpack can inject those scripts and links for us with the HtmlWebpackPlugin.
       */
      /**
       * The HtmlWebpackPlugin (added in webpack.common.js) use the publicPath 
       * and the filename settings to generate appropriate <script> and <link> tags into the index.html.
       */
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
