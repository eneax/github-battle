const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // define entry point of the app
  entry: './app/index.js',
  // where the bundle that webpack creates is going to go
  output: {
    // create a 'dist' folder inside the root folder
    path: path.resolve(__dirname, 'dist'),
    // inside 'dist', create a bundle file
    filename: 'index_bundle.js',
  },
  // transformations that need to be made on our code
  module: {
    rules: [
      // select all js files and transform jsx code into js that browser can read
      { test: /\.(js)$/, use: 'babel-loader' },
      // select all css files and use loaders to make css import work
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  mode: 'development',
  plugins: [
    // create new instance of HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      // take 'index.html' and create a copy of it containing the bundled file inside 'dist' folder
      template: 'app/index.html',
    }),
  ],
}
