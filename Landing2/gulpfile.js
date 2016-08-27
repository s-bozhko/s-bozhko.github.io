var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var uglify = require('gulp-uglify');
var pump = require('pump');
var connect = require('gulp-connect');
var lr = require('tiny-lr');

var livereload = require('gulp-livereload');

var plumber = require('gulp-plumber');
var $ = require('gulp-load-plugins')({
    pattern: '*'
});

var nano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');


var src = 'src/';
var dist = 'dist/';
var publicPath = 'public/';

var autoprefixerBrowsers = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 6',
    'opera >= 23',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('html', function() {
    return gulp.src(publicPath + 'index.html')
        .pipe(connect.reload());
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('public/js/*.js'),
            uglify(),
            gulp.dest('public/js/minify')
        ]
    );
});

gulp.task('styles',function(cb) {
    return gulp.src(src + 'sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(publicPath + 'css'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: publicPath,
    livereload: true
  });
});

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('watch', function() {
    gulp.watch(src + 'sass/*.scss', ['styles']);

    gulp.watch(src + 'sass/blocks/*/*.scss', ['styles']);

    //gulp.watch(src + 'public/styles/*.scss', ['styles']);
    gulp.watch(publicPath + '*.html', ['html']);
    gulp.watch(publicPath + 'js/*.js', ['compress']);
});


gulp.task('clean', function(cb) {
    del([dist], cb);
});

gulp.task('cleanMinify', function(cb) {
    del(['public/scripts/minify'], cb);
});


// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'watch', 'connect', 'html']);

gulp.task('scriptsMinify&Bundle', ['cleanMinify', 'compress']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
    gulp.start(['html','styles']);
});