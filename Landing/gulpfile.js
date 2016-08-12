'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	refresh = require('gulp-livereload'),
	lr = require('tiny-lr'),
	server = lr();

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});


gulp.task('html', function () {
  gulp.src('public/*.html')
    .pipe(connect.reload());
});


gulp.task('sass', function () {
  return gulp.src('assets/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload());
});

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});


gulp.task('default', function() {  
    gulp.run('connect', 'html', 'sass');

    // gulp.watch('assets/sass/*', function(event) {
    //     gulp.run('sass');
    // });

    gulp.watch('assets/sass/**/**/*.scss', ['sass']);

    gulp.watch('public/*.html', function(event) {
        gulp.run('html');
    });
})