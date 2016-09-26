var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var fs = require('fs');
var path = require('path');
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
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css?minimize&autoprefixer!sass?resolve url")
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
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true,
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin()
    ],
    module: {
        loaders: [
            //{ test: /\.js$/, loader: "react-hot-loader!babel", exclude: [/node_modules/] },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [
                        // 'transform-decorators-legacy',
                        // 'transform-react-constant-elements',
                        // 'transform-react-inline-elements'
                    ]
                }
            }
        ]
    }
    // eslint: {
    //     configFile: path.resolve('.eslintrc')
    // }
}];