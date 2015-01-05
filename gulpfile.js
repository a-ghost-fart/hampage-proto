var gulp = require('gulp');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

gulp.task('build:js', function () {
'use strict';
    return gulp.src('./src/js/main.js')
        .pipe(plumber())
        .pipe(browserify())
        .pipe(rename('bundled.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', function () {
    'use strict';
    gulp.watch('./src/js/**/*.js', ['build:js']);
});
