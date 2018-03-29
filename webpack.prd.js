const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    entry: './src/main.js',
    plugins: [
        new UglifyJSPlugin()
    ],
    mode: 'production'
});