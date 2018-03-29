const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    entry: './src/main.dev.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    mode: 'development'
});