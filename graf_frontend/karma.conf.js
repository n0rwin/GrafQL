// Karma configuration
// Generated on Wed Nov 04 2015 08:19:54 GMT+0100 (Mitteleuropäische Zeit)
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack-base.config.js');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            'es5Shim.js',
            'appTests.webpack.js',
            'sharedTests.webpack.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'appTests.webpack.js': ['webpack'],
            'sharedTests.webpack.js': ['webpack']
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            resolve: webpackBaseConfig.resolve,
            module: {
                loaders: [
                    {
                        test:/\.json$/,
                        loader: 'json'
                    },
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel'
                    }
                ]
            }
        },

        webpackServer: {
            noInfo: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        customLaunchers: {
            'PhantomJS_Desktop': {
                base: 'PhantomJS',
                options: {
                    viewportSize: {
                        width: 1920,
                        height: 1080
                    }
                }
            },
            'PhantomJS_Mobile': {
                base: 'PhantomJS',
                options: {
                    viewportSize: {
                        width: 479,
                        height: 720
                    }
                }
            }
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS_Desktop', 'PhantomJS_Mobile'],

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: false
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    });
};
