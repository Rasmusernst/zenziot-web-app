const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.NODE_PORT || '3000'
const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')

const config = {
  entry: {
		main: []
			// Add the hot loader and dev server components if we are using this for development
			.concat(isDev ? [
				'react-hot-loader/patch',
				`webpack-dev-server/client?http://localhost:${port}`,
				'webpack/hot/only-dev-server',
			] : [])
			// Always add the entry point
			.concat(path.join(srcPath, 'index')),
	},

  output: {
		path: distPath,
		filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
		hashDigest: 'hex',
		publicPath: '/',
		// Include comments with information about the modules - only for dev
		pathinfo: isDev,
		devtoolModuleFilenameTemplate: '[resource-path]',
	},

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
   new HtmlWebpackPlugin({
     template: './src/index.html',
     filename: 'index.html',
     inject: 'body'
   }),
  ]
  .concat(!isDev ? [] : [])
  .concat(isDev ? [
    // Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ] : [])
 };

module.exports = config
