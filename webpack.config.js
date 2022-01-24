const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/sparrow_hood.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      },
      {
        test: /\.(png|jpg|svg|gif|mp3|jpeg|mp4)$/,
        type: 'asset/resource'
      }
    ]
  },
  devtool: 'source-map'
};