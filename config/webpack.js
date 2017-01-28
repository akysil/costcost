var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'app': './src/main.ts'
    },
    
    resolve: {
        // extensions for extension-less link
        extensions: ['.ts', '.js']
    },
    
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    // Typescript to ES5, guided by the tsconfig.json file
                    'awesome-typescript-loader',
                    // loads angular components' template and styles
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                // exports HTML as string
                use: ['html-loader']
            },
            {
                // TODO: looks bad
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: ['file-loader?name=assets/[name].[hash].[ext]']
            },
            {
                test: /\.css$/,
                // excludes css within app directory
                exclude: helpers.path('src', 'app'),
                // moves styles to separate bundle
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader' // 'css-loader?sourceMap'
                })
            },
            {
                test: /\.css$/,
                // includes component-scoped styles
                include: helpers.path('src', 'app'),
                // loads css as string
                use: ['raw-loader', 'sass-loader']
            }
        ],
        exprContextCritical: false
    },
    
    devtool: 'cheap-module-eval-source-map',
    
    output: {
        path: helpers.path('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    
    plugins: [
        // extract css from js (prepares them for HtmlWebpackPlugin)
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        
        // inject scripts and styles in html
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: false
        })
    ],
    
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};
