// load the needed node modules
var path = require("path");
var BundleTracker = require('webpack-bundle-tracker');

// webpack project settings
module.exports = {
    context: __dirname,
    entry: {
	assets: './assets/js/index.js'
    },
    output: {
	path: path.resolve('./static_src/bundles/'),
	filename: "[name]-[hash].js"
    },
    
    plugins: [
	new BundleTracker({path: __dirname, filename: './webpack-stats.json'})
	
    ],
    
    module: {
	loaders: [
	    {
		test: /\.jsx$/,
		exclude: /(node_modules)/,
		loader: 'babel', // 'babel-loader' is also a legal name to reference
		query: {
		    presets: ['es2015', 'react']
		}
	    },
	    
	]
    },
    
    resolve: {
	extensions: ['.js']
    },
    node: {
	fs: 'empty'
    }
}
