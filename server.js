const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config.js')

const host = 'localhost'
const port = process.env.NODE_PORT || '3000'

// https://webpack.github.io/docs/webpack-dev-server.html
new WebpackDevServer(webpack(config), {
	publicPath: '/',
	hot: true,
	compress: true,
	historyApiFallback: true,
	stats: {
		chunks: false,
		chunkModules: false,
		colors: true,
	},
}).listen(port, host, (err) => {
	if (err) { return console.log(err) }
	console.log(`Listening at http://${host}:${port}/`)
})
