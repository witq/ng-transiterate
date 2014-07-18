(function() {

  'use strict';

  var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    min = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    _ = require('lodash'),
    karma = require('karma').server,
    karmaConf = require('./test/karma-conf'),

    paths = {
      base: './src/',
      src: './src/**/*.js',
      test: [
        './src/**/*.js',
        './test/spec/**/*.js'
      ],
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

  gulp.task('minify', ['lint', 'clean', 'copy'], function() {
    return gulp
      .src(paths.src)
      .pipe(plumber())
      .pipe(min())
      .pipe(uglify())
      .pipe(concat('ng-transiterate.min.js'))
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task('watch', function() {

    livereload.listen();

    gulp
      .watch(paths.test, ['test', 'build']);

    gulp
      .watch(paths.src, ['build']);

    gulp
      .watch(paths.dist + '/**/*')
      .on('change', livereload.changed);

  });

  gulp.task('build', ['copy', 'minify']);
  gulp.task('default', ['build', 'watch']);

  gulp.task('test', ['lint', 'build'], function(done) {
    karma.start(_.assign({}, karmaConf, {singleRun: true}), done);
  });

})();
