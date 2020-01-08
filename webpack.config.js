const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    devServer: {
    //   contentBase: path.resolve(__dirname, './index.html'),
      publicPath: '/build',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    mode: "development",

    module: {
      rules: [
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.jsx?/, 
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [`@babel/preset-env`, `@babel/preset-react` ]
            }
          }
        },
        {
          // Image uploader
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ]
    }
  }
  