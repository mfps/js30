let webpack = require('webpack');
let path = require('path');

let babelOptions = {
  presets: 'es2015'
};

const config = {
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', './script.js'],
  output: {
    filename: './index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader',
            query: {
              compact: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

module.exports = config;
