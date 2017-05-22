const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webpackConfigurations = require('./webpackConfigurations.js');
const WebpackDevServer = require('webpack-dev-server');
const eslint = require('gulp-eslint');
const del = require('del');

//const karmaServer = require('karma').Server;

const cordovaProjectPath = '../aep_cordovaApp';

gulp.task('dev:web', (callback) => {
    new WebpackDevServer(webpack(webpackConfigurations.devWeb), {
        https: false,
        key: fs.readFileSync(path.join(__dirname, './SSL', 'localhost.key')),
        cert: fs.readFileSync(path.join(__dirname, './SSL', 'localhost.pem')),
        ca: fs.readFileSync(path.join(__dirname, './SSL', 'ca.pem')),
        publicPath: webpackConfigurations.devWeb.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true
        },
        contentBase: './app/public'
    }).listen(4000, 'localhost', (err) => {
        if (err) {
            throw new gutil.PluginError('dev:client', err);
        }
        // Server listening
        gutil.log('[dev:web]', 'Listening at localhost:4000');

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('build:dev_web', (callback) => {
    webpack(webpackConfigurations.buildDevWeb, (err, stats) => {
        if(err) {
            throw new gutil.PluginError('build:dev_web', err);
        }
        gutil.log('[build:dev_web]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('build:web_teststage', (callback) => {
    webpack(webpackConfigurations.buildWebTestStage, (err, stats) => {
        if(err) {
            throw new gutil.PluginError('build:web_teststage', err);
        }
        gulp.src(['app/public/**/*'])
            .pipe(gulp.dest('../../Reed.AEP.Web/public'));

        gutil.log('[build:web_teststage]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('build:web_prodstage', (callback) => {
    webpack(webpackConfigurations.buildWebProdStage, (err, stats) => {
        if(err) {
            throw new gutil.PluginError('build:web_prodstage', err);
        }
        gulp.src(['app/public/**/*'])
            .pipe(gulp.dest('../../Reed.AEP.Web/public'));

        gutil.log('[build:web_prodstage]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('lint', () =>
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
);

gulp.task('dev', ['dev:web', 'test:tdd']);

gulp.task('watch:lint', () => {
    gulp.watch(['./app/**/*.js', './shared/**/*.js'], ['lint']);
});