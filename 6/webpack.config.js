var webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: './styles.css'
});

const uglifyJS = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
});

let babelOptions = {
  presets: 'es2015'
};

const config = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './script.js'),
    path.resolve(__dirname, './styles.scss')
  ],
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
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [{ loader: 'url-loader' }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [extractSass, uglifyJS]
};

module.exports = config;
