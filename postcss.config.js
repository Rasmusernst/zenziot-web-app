module.exports = {
	plugins: [
		require('cssnano')({
			autoprefixer: {
				add: true,
				remove: true,
				browsers: ['last 2 versions'],
			},
			discardComments: { removeAll: true },
			discardUnused: false,
			mergeIdents: false,
			reduceIdents: false,
			safe: true,
			sourcemap: true,
		}),
	],
}
