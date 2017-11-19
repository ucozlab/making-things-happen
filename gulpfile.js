'use strict';

const
  gulp         = require('gulp'),
  sass         = require('gulp-sass'),
  cleanCSS     = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps   = require('gulp-sourcemaps'),
  webserver    = require('gulp-webserver'),
  wait         = require('gulp-wait'),
  concat       = require('gulp-concat'),
  uglify       = require('gulp-uglify'),
  babel        = require('gulp-babel'),
  gutil        = require('gulp-util'),
  fs			     = require('fs'),
  path		     = require('path'),
  connect      = require('gulp-connect'),
  paths        = {
    scripts : [
      // './node_modules/jquery/dist/jquery.min.js',
      './src/js/main.js'
    ]
  };

gulp.task('compile-scss', function() {
  gulp.src('src/scss/style.scss').pipe(wait(100))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    // .pipe(cleanCSS({advanced : false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', ['compile-scss']);
  gulp.watch(paths.scripts, ['compile-js']);
});

gulp.task('compile-js', function() {
  gulp.src(paths.scripts)
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['es2015']  // videojs plugin sending an error with it
    }))
    // .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('webserver', function() {
  gulp.src('./public')
    .pipe(webserver({
      livereload: true,
      fallback: "./index.html",
      port: 1080,
      open: true
    }));
});

gulp.task('connect', function() {
  connect.server({
    root: './public',
    port: '8000',
    livereload: true
  });
});

//Watch task
gulp.task('default', ['webserver', 'compile-scss', 'compile-js', 'watch'] );

gulp.task('build', ['compile-scss', 'compile-js'] );