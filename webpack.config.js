var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');

var cfg = {
    entry: {
        app:'./src/app.js',
        vendor: [
            'bluebird',
            'classnames',
            'jquery',
            'lodash',
            'loglevel',
            'loglevel-prefix-persist/client',
            'moment',
            'object-path-immutable',
            'react',
            'react-dom',
            'react-dom/server',
            'underscore.string'
        ],
    },
    resolve: {
        modulesDirectories: ['node_modules']
    },
    devtool: 'source-map',
    output: {
        path: 'build/js/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'/*,'eslint-loader'*/]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]!less-loader")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=100000'
            },
            { 
                test: /\.json$/, 
                loader: 'json-loader'
            }
        ]
    },/*
    eslint: {
        configFile: './.eslintrc'
    },*/
    plugins: [
        new ExtractTextPlugin("../css/vendor.css", {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName= */"vendor", 
            /* filename= */"vendor.js"
        )
    ]
};

if (process.env.NODE_ENV === 'production') {
    cfg.plugins = cfg.plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        })
    )
}

module.exports = cfg