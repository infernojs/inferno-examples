const path = require('path');

module.exports = {
	mode: "none",
	entry: './src/index.jsx',
	module: {
		rules: [
			{
				test: /\.jsx$/,
				loader: "babel-loader",
				options: {
					plugins: [["babel-plugin-inferno", {"imports": true}]]
				}
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	}
};
