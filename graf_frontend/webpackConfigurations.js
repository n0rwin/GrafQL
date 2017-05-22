'use strict';

const _ = require('underscore');
const path = require('path');
const webpack = require('webpack');

const jsxLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader']
};

// const jsxHotLoader = {
//     test: /\.jsx?$/,
//     exclude: /node_modules/,
//     loaders: ['react-hot', 'babel']
// };

const mdLoader = {
    test: /\.md$/,
    exclude: /node_modules/,
    loader: 'html-loader!markdown-loader?gfm=true&breaks=true&sanitize=false'
};

const disableAppPlugin = new webpack.DefinePlugin({__ISAPP__: false});
const enableTestStagePlugin = new webpack.DefinePlugin({__TESTSTAGE__: true});
const disableTestStagePlugin = new webpack.DefinePlugin({__TESTSTAGE__: false});
const enableProductionStagePlugin = new webpack.DefinePlugin({__PRODUCTIONSTAGE__: true});
const disableProductionStagePlugin = new webpack.DefinePlugin({__PRODUCTIONSTAGE__: false});
const activateReduxDevToolsPlugin = new webpack.DefinePlugin({__DEVTOOLS__: true});
const disableReduxDevToolsPlugin = new webpack.DefinePlugin({__DEVTOOLS__: false});
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const nodeEnvDevPlugin = new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('dev')});
const nodeEnvProductionPlugin = new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')});
const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({sourceMap: true});

const baseConfig = {
    devtool: 'source-map',
    resolve: {
        alias: {
            localforage: 'localforage/dist/localforage.min'
        },
        modules: ['node_modules', 'shared'],
        extensions: ['.js', '.jsx']
    }
};

module.exports = {
    devWeb: _.extend({}, baseConfig, {
        devtool: 'eval',
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?https://localhost:4000',
            'webpack/hot/only-dev-server',
            './app/index'
        ],
        output: {
            path: path.join(__dirname, 'app', 'public'),
            filename: 'bundle.js',
            chunkFilename: '[name].bundle.js',
            publicPath: '/build/'
        },
        module: {
            loaders: [
                jsxLoader,
                mdLoader
            ]
        },
        plugins: [
            nodeEnvDevPlugin,
            hotModuleReplacementPlugin,
            disableReduxDevToolsPlugin,
            disableProductionStagePlugin,
            disableTestStagePlugin,
            disableAppPlugin,
            new webpack.NamedModulesPlugin()
        ]
    }),
    buildDevWeb: _.extend({}, baseConfig, {
        entry: './app/index',
        output: {
            path: path.join(__dirname, 'app', 'public', 'build'),
            filename: 'bundle.js',
            chunkFilename: '[name].bundle.js'
        },
        module: {
            loaders: [
                jsxLoader,
                mdLoader
            ]
        },
        plugins: [
            nodeEnvDevPlugin,
            disableReduxDevToolsPlugin,
            disableProductionStagePlugin,
            disableTestStagePlugin,
            disableAppPlugin
        ]
    }),
    buildWebTestStage: _.extend({}, baseConfig, {
        entry: './app/index',
        output: {
            path: path.join(__dirname, 'app', 'public', 'build'),
            filename: 'bundle.js',
            chunkFilename: '[name].bundle.js'
        },
        module: {
            loaders: [
                jsxLoader,
                mdLoader
            ]
        },
        plugins: [
            nodeEnvProductionPlugin,
            uglifyJsPlugin,
            disableReduxDevToolsPlugin,
            enableTestStagePlugin,
            disableProductionStagePlugin,
            disableAppPlugin
        ]
    }),
    buildWebProdStage: _.extend({}, baseConfig, {
        entry: './app/index',
        output: {
            path: path.join(__dirname, 'app', 'public', 'build'),
            filename: 'bundle.js',
            chunkFilename: '[name].bundle.js'
        },
        module: {
            loaders: [
                jsxLoader,
                mdLoader
            ]
        },
        plugins: [
            nodeEnvProductionPlugin,
            uglifyJsPlugin,
            disableReduxDevToolsPlugin,
            enableProductionStagePlugin,
            disableTestStagePlugin,
            disableAppPlugin
        ]
    })
};