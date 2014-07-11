(function() {

  'use strict';

  var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    min = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),

    paths = {
      base: './src/',
      src: './src/**/*.js',
      dist: './dist/'
    };

  gulp.task('lint', function() {
    return gulp
      .src(paths.src)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('clean', function() {
    return gulp
      .src(paths.dist + '**/*.js', {
        read: false
      })
      .pipe(rimraf());
  });

  gulp.task('copy', ['clean'], function() {
    return gulp
      .src(paths.src, {
        base: paths.base
      })
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task('minify', ['clean'], function() {
    return gulp
      .src(paths.src)
      .pipe(min())
      .pipe(uglify())
      .pipe(concat('ng-transiterate.min.js'))
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task('watch', function() {
    gulp.watch(paths.src, ['build']);
  });

  gulp.task('build', ['copy', 'minify']);

  gulp.task('default', ['build', 'watch']);

})();
