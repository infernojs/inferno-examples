const path = require('path');

const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
	mode: "production",
	entry: './src/index.jsx',
	module: {
		rules: [
			{
				test: /\.jsx$/,
				loader: "babel-loader",
				options: {
					presets: ["es2015"],
					plugins: [["babel-plugin-inferno", {"imports": true}]]
				}
			}
		]
	},
	optimization: {
		minimize: true
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	plugins: [
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js/
		})
	]
};
