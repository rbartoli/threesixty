import path from 'path'
import webpack from 'webpack'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const config = {
  mode: process.env.NODE_ENV,
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? 'threesixty.min.js' : 'threesixty.js',
    library: 'threesixty',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          warnings: false,
        },
      })
    ]
  },
}

export default config
