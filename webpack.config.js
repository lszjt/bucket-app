//TODO add Hot Reloading, or just make add a watcher
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const validate = require('webpack-validator');
const PATHS = {
  app: path.join(__dirname, 'src'),
  build : path.join(__dirname, 'public/js')
};


const config = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    extensions:['','.js','.jsx']
  },
  module:{
    loaders: [
      {
        test: /\.jsx?$/,
        loaders:['babel?cacheDirectory'],
        include: PATHS.src,
        exclude: PATHS.src + '/static'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style","css!sass"),
        include: PATHS.src
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/static/index.html', to: '../'},
      { from: 'src/static/404.html', to: '../'},
      { from: 'src/static/app.html', to: '../'},
      { from: 'src/static/home.html', to: '../'},
      { from: 'src/static/images/bucket-logo.png', to: '../images'},
      { from: 'src/static/js/jquery-3.1.1.slim.js', to: './'},
      { from: 'src/static/js/main.js', to: './'}
    ]),
    new ExtractTextPlugin('../styles/main.css')
  ]
};

module.exports = config;