var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    
    htmlLoader: {
        minimize: false // workaround for ng2
    },
    
    plugins: [
        // stops the build if there is any error
        new webpack.NoErrorsPlugin(),
        
        // detects identical (and nearly identical) files and removes them from the output
        new webpack.optimize.DedupePlugin(),
        
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
    
        // extract css from js (prepares them for HtmlWebpackPlugin)
        new ExtractTextPlugin('[name].[hash].css'),
        
        // use to define environment variables
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});