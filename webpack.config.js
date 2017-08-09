const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: process.env.BUILD_TARGET || "./build",
    filename: "index.js",
    library: "padEvents",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.keys(process.env)
        .filter(function(k) { return k === "NODE_ENV"})
        .reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k]);
        return o;
      }, {})
    })
  ],
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
