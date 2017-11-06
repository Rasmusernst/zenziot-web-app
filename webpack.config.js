const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.NODE_PORT || '3000';
const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

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
  plugins: [
    // We always include the define plugin to define globals
    new webpack.DefinePlugin({
      // Doing this tells React to use the production version if NODE_ENV is 'production'
      'process.env': {
        NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
      },
      'VERSION': JSON.stringify(require('./package.json').version),
    }),
    // Create the index file with link to css and script
   new HtmlWebpackPlugin({
     template: path.join(srcPath, 'index.html'),
     filename: 'index.html',
     inject: 'body'
   }),
  ]
  .concat(!isDev
    ? [
    // For exporting all CSS to one external bundle
		new ExtractTextPlugin({ filename: '[name].[contenthash:hex:8].css' }),
    ]
    : [])
  .concat(isDev ? [
    // Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ] : []),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader',],
        exclude: /node_modules/,

      },
      // CSS loader to CSS files
      // Files will get handled by css loader and then passed to the extract text plugin
      // which will write it to the file we defined above
      {
        test: /\.css$/,
        use: isDev
        ? [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
        : ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }]
        }),
      }
    ],
    // loaders: [
    //   {
    //     test: /\.js$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/,
    //   },
    //   {
    //     test: /\.jsx$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/
    //   }
    // ],
  },
// Enable importing JS files without specifying their's extenstion
// So we can write:
// import MyComponent from './my-component';
// Instead of:
// import MyComponent from './my-component.jsx';
  resolve: { extensions: ['.js', '.jsx'] },
 };

module.exports = config
