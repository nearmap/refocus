/* eslint-env node */
/* eslint no-process-env: 0 */
/* eslint no-console: 0 */
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = (
  process.env.NODE_ENV
  || (
    process.argv.indexOf('--dev') > -1
      ? 'development'
      : 'production'
  )
);

module.exports = {
  target: 'web',
  mode: 'production',

  entry: {
    app: ['./example/index.js']
  },

  output: {
    path: path.join(__dirname, 'docs'),
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
    })
  ],

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules[/\\].*/,
      loader: 'babel-loader'
    }]
  },
  // devtool: '#inline-source-map',
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
