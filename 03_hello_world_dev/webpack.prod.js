const webpack = require('webpack');
const config = require('./webpack.base.js');

module.exports = Object.assign(
	config,
	{
		mode: "production",
		optimization: {
			minimize: true
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': { 'DEBUG': false }  // set a DEBUG flag that can be used in the scripts (can be skipped)
			}),
			new CompressionPlugin({
				asset: "[path].gz[query]",
				algorithm: "gzip",
				test: /\.js/
			})
		]
	}
);