const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production' // check if we are running a production build, used to branch build steps with ? : ternarys
const port = process.env.NODE_PORT || '3000'
const srcPath = path.join(__dirname, 'src') // joins all given path segments together using the platform specific separator as a delimiter
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
			// Always add the entry point.
			// It specifies the entry file where the bundler starts the bundling process.
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
			inject: 'body',
		}),
	]
		.concat(!isDev
			? [
				// For exporting all CSS to one external bundle
				// Use the plugin to specify the resulting filename
				new ExtractTextPlugin({ filename: '[name].[contenthash:hex:8].css' }),
			]
			: [])
		.concat(isDev ? [
			// Hot Module Replacement
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
		] : []),

	// Loaders are needed because we want the browser to be able to, for instance, interpret and run JSX, ES6 & Sass.
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				// Babel-loader allows transpiling JavaScript files using Babel and webpack.
				// The babel packages we are using to transpile are: Babel core, Babel webpack loader, Babel env preset & Babel React preset
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			// CSS loader for CSS files
			// Files will get handled by CSS loader and then passed to the extract text plugin
			// which will write it to the file we defined above in new ExtractTextPlugin
			{
				test: /\.css$/,
				use: isDev
					? [
						// style-loader adds CSS to the DOM by injecting a <style> tag, used for development as it workds well with hmr.
						{ loader: 'style-loader' },
						// The css-loader interprets @import and url() like import/require() and will resolve them.
						// So we can write: import MyCSS from './myCss'; - Instead of: import MyCSS from './myCss.css';
						{ loader: 'css-loader' },

					]
					// if we are running af production build, only use css-loader. We dont want all styles inlined in prod.
					: ExtractTextPlugin.extract({
						use: [{
							loader: 'css-loader',
						}],
					}),
			},
			// Sass loading via postcss-loader, cssnano, sass-loader
			// Use ExtractTextPlugin for production build to take CSS into separate stylesheet
			{
				test: /src(\/|\\).+\.scss$/,
				use: isDev ? [{
					loader: 'style-loader',
				}, {
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: true,
						localIdentName: '[path]___[name]__[local]___[hash:base64:5]',

					},
				}, {
					// Postcss is a framework for handling preprocessing of Css - for example minifying and adding vendor prefixes.
					// Postcss is basically babel for css and as such we can load different plugins into it.
					// We are using css-nano as a plugin to minify and add vendor prefixes for better browser compat. See postcss.config for setup.
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
					},
				},
				{
					// sass-loader loads a SASS/SCSS file and compiles it to CSS.
					// The css will then need to be handled by our postcss framework and then by the css-loader and (because we are running a dev build) style-loader
					loader: 'sass-loader',
					options: {
						sourceMap: true,
						// includePaths: ['src/lib/styles'],
						// data: `@import 'common.scss';`,
					},
				}] : ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							sourceMap: true, // Map the compiled code to the original, for easier debug in the browser https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map
							modules: true, // applies local scope to ours css, to avoid any conflicts in global scope https://css-tricks.com/css-modules-part-1-need/
							localIdentName: '[hash:base64:6]', // adding unique names for locally scoping css
						},
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							// includePaths: ['src/lib/styles'],
							// data: `@import 'common.scss';`,
						},
					}],
				}),
				include: srcPath,
			},
			// SVG and images are imported via url-loader. It instructs webpack to emit the required object as file and to return its public URL
			// We have also specified the mimetype (should not be required as it can infer it from the filetype) but bette safe than sorry
			// We have set a limit (in bytes) for when webpack inlines the image as base64 via dataURL
			// This is saves unnecessary round trips to the server for excessively small files
			{ test: /\.svg(\?.*)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[hash:hex:8].[ext]' },
			{ test: /\.(png|jpg|webp)$/, use: 'url-loader?limit=8192&name=[name].[hash:hex:8].[ext]' },
		],
	},
	// Enable importing JS files without specifying their extenstion
	// So we can write:
	// import MyComponent from './my-component';
	// Instead of:
	// import MyComponent from './my-component.jsx';
	resolve: { extensions: ['.js', '.jsx'] },
}

module.exports = config
