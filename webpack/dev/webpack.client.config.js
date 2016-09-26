var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var fs = require('fs');
var entry = {};

var files = fs.readdirSync(path.resolve('./src/scripts/'));

var filepath = './src/scripts/';

files.forEach(function (filename) {
    filename = filename.slice(0, -3); //remove .js
    entry[filename] = filepath + filename
});

module.exports = [
{
    name: 'style',
    entry: {
        style: './src/styles/style.scss'
    },
    output: {
        path: 'build/styles',
        filename: "[name].css"
        // publicPath: "build/"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!sass?sourceMap&resolve url")
            },
            { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif&name=../images/[name].[ext]" },
            { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg&name=../images/[name].[ext]" },
            { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png&name=../images/[name].[ext]" },
            { test: /\.svg/, loader: "url-loader?limit=26000&mimetype=image/svg+xml&name=../images/[name].[ext]" },
            { test: /\.(woff|woff2|ttf|eot)/, loader: "url-loader?limit=1&name=../fonts/[name].[ext]" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css", {allChunks: true}),
        new CopyWebpackPlugin([{ from: './src/images', to: '../images' }]),
        new CopyWebpackPlugin([{ from: './src/templates', to: '../templates' }]),
        new CopyWebpackPlugin([{ from: './src/fonts', to: '../fonts' }])
    ]
},
{
    name: 'js',
    entry: entry,
    output: {
        path: 'build/js',
        filename: "[name].js",
        publicPath: "build/js/"
    },
    // devtool: "eval",
    // devtool: '#source-map',
    module: {
        loaders: [
            //{ test: /\.js$/, loader: "react-hot-loader|babel", exclude: [/node_modules/] },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: []
    // eslint: {
    //     configFile: path.resolve('.eslintrc')
    // }
}];