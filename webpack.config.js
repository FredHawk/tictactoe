const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    port: 9000,
    stats: "errors-only",
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
        }]
      }, {
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1}
          }, { 
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                require('postcss-import')({}),
                require('postcss-cssnext')({ browsers: ['last 2 versions', '> 5%'] }),
              ],
            }
          }],
          publicPath: '/dist'
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ticcy Taccy Toe',
      minify: {
        collapseWhitepsace: false // Set to true to minify html
      },
      hash: true, // Set to true if we want hashed bundles.
      template: './src/index.html', // Load a custom template (ejs by default)
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false,
      allChunks: true
    })
    ]
}