(function(require) {

  'use strict';

  var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    min = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),

    paths = {
      src: './src/*.js',
      dist: './dist/ng-transiterate.min.js'
    };

  gulp.task('lint', function() {
    return gulp.src(paths.src)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });

})(require);
