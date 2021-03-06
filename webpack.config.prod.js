const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: {
    // polyfills: '@babel/polyfill',
    app: './src/ts/app.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src/ts'),
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.scss$/i,
        include: [path.resolve(__dirname, 'src/sass')],
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        include: [path.resolve(__dirname, 'src/assets')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: 'style/[id].css'
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
}
