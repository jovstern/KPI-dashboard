var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Change it to local api gateway address
var apiGatewayUrl = 'http://localhost:8282/';

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;

var isProd = ENV === 'build';
console.log(isProd);


var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel-loader"
  },
  {
    // SASS Loader
    // https://github.com/jtangelder/sass-loader
    test: /\.scss$/,
    loader: "style!css!sass?sourceMap"
  }, {
    // CSS LOADER
    // Reference: https://github.com/webpack/css-loader
    // Allow loading css through js
    test: /\.css$/,
    loader: "style!css"
  },
  {
    // ASSET LOADER
    // Reference: https://github.com/webpack/file-loader
    // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
    // Rename the file using the asset hash
    // Pass along the updated reference to your code
    // You can add here any file extension you want to get copied to your output
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
    loader: 'file'
  },
  {
    test: /\.json$/,
    loader: "json-loader"
  }
];

module.exports = {
  devtool: 'source-map',
  entry: path.resolve('app', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: '[name].[hash].js',
    publicPath: isProd ? '' : 'http://localhost:8000/kpi-dashboard/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('app', 'index.html'),
      inject: 'body'
    })
  ],
  module: {
    loaders: loaders
  },
  devServer: {
    contentBase: './app',
    stats: 'minimal',
    historyApiFallback: true,
    proxy: [{
      path: /^[^.]+$/, // All url's that doesn't contain a dot (.)
      target: apiGatewayUrl,
      bypass: function(req, res, proxyOptions) {
        // Don't do proxy for '-page' requests
        if (req.url.indexOf('-page/') > -1) {
          return '/index.html';
        }
      }

    }]
  }
};
