const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: process.env.BUILD_TARGET || "./build",
    filename: "index.js",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  }
};
