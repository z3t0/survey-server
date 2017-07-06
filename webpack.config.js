// load the needed node modules
var path = require("path");
var BundleTracker = require('webpack-bundle-tracker');

// webpack project settings
module.exports = {
    context: __dirname,
    entry: {
        create_survey: './bundles/create_survey/js/index.js',
        index: './bundles/index/js/index.js',
        edit: './bundles/edit/js/index.js',
        fill: './bundles/fill/js/index.js',
        results: './bundles/results/js/index.js',
        login: './bundles/login/js/index.js'
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
