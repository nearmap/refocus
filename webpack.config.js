/* eslint-env node */
/* eslint no-process-env: 0 */
/* eslint no-console: 0 */
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const NODE_ENV = (
  process.env.NODE_ENV
  || (
    process.argv.indexOf('--dev') > -1
      ? 'development'
      : 'production'
  )
);

module.exports = {
  entry: {
    app: ['babel-polyfill', './example/index.js']
  },

  output: {
    path: path.join(__dirname, 'build', 'pkg'),
    filename: '[name]-[chunkhash].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      // used by react to switch on/off dev warnings
      'process.env': {
        NODE_ENV: `"${NODE_ENV}"`
      }
    }),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
      chunks: ['app']
    }),
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    ...(
      NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: false
        }),
        new webpack.optimize.DedupePlugin()
      ] : []
    )
  ],

  module: {
    loaders: [{
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules' +
          `${NODE_ENV === 'production' ? '' : '&sourceMap'}` +
          '&importLoaders=1' +
          '&localIdentName=[name]_[local]_[hash:base64:5]' +
          '&camelCase' +
        '!postcss!sass'
      )
    }, {
      test: /\.(png|jpg|ico)$/,
      loader: 'url-loader?limit=1'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  // adds vendor prefixes to css
  postcss: [autoprefixer],
  sassLoader: {
    sourceMap: NODE_ENV !== 'production',
    omitSourceMapUrl: true,
    includePaths: [
      path.resolve(__dirname, './node_modules')
    ]
  },

  devtool: NODE_ENV === 'production' ? '' : '#inline-source-map',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    progress: true,
    contentBase: './build',
    publicPath: '/refocus/',
    historyApiFallback: {
      index: '/refocus/'
    }
  }
};
