var helpers = require('./helpers');

module.exports = {
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
                
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                exclude: helpers.path('src', 'app'),
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                include: helpers.path('src', 'app'),
                loader: 'raw-loader'
            },
            {
                test: /\.ts$/,
                enforce: "post",
                include: helpers.path('src/app'),
                loader: 'istanbul-instrumenter-loader',
                exclude: [/\.(e2e|spec)\.ts$/]
            }
        ],
        exprContextCritical: false
    }
};
