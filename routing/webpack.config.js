module.exports = {
	entry: './src/index.js',
	output: {
		path: './dist',
		publicPath: 'dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015-loose', 'stage-0'],
				plugins: ['syntax-jsx', 'inferno']
			}
		}]
	},
	devServer: {
		port: process.env.PORT || 8000,
		historyApiFallback: {
		  index: '/'
		}
	}
};
