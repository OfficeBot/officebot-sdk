"use strict";

var browserify   = require('browserify');
var gulp         = require('gulp');
var minify       = require('gulp-minify');
var streamify    = require('gulp-streamify');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var watchify     = require("watchify");

var sourceFile   = 'index.js';
var destFolder   = './dist';
var destFile     = 'officebot-sdk.js';

var libs = [
   "angular"
];

// Inspired by http://truongtx.me/2014/08/06/using-watchify-with-gulp-for-fast-browserify-build/
gulp.task('browserify',function browserifyShare() {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        paths: ['./node_modules'],
        debug: true
    });

    // libs.forEach(function(lib) {
    //     b.external(lib);
    // });

    if ( process.env.WATCH ) {
        b = watchify(b);
        b.on('update', function() {
            gutil.log("Watchify detected change -> Rebuilding bundle");
            return bundleShare(b);
        });
    }
    b.on('error', handleErrors);

    // b.add(sourceFile); // It seems to produce weird behaviors when both using "add" and "require"

    return bundleShare(b);
});

function bundleShare(b) {
    return b.bundle()
        .on('error', handleErrors)
        .pipe(source(destFile))
        // .pipe(streamify( minify({mangle : false})) )
        .pipe(gulp.dest(destFolder))
}

function handleErrors(e) {
    gutil.log('ERROR----');
    gutil.log(e);
}

gulp.task('default', ['browserify']);
