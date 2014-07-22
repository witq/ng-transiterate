(function() {

  'use strict';

  var _           = require('lodash'),
      gulp        = require('gulp'),
      header      = require('gulp-header'),
      jshint      = require('gulp-jshint'),
      karma       = require('karma').server,
      karmaConf   = require('./test/karma-conf'),
      livereload  = require('gulp-livereload'),
      ngAnnotate  = require('gulp-ng-annotate'),
      pkg         = require('./package.json'),
      plumber     = require('gulp-plumber'),
      uglify      = require('gulp-uglify'),
      rename      = require('gulp-rename'),
      rimraf      = require('gulp-rimraf'),

      banner,
      paths;

  banner = ['/*!',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' */',
  '',''].join('\n');

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
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task('minify', ['lint', 'clean'], function() {
    return gulp
      .src(paths.src)
      .pipe(plumber())
      .pipe(ngAnnotate({
        single_quotes: true
      }))
      .pipe(uglify({
        preserveComments: 'some'
      }))
      .pipe(rename(function(path) {
        path.extname = '.min.js';
      }))
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task('watch', function() {

    livereload.listen();

    gulp
      .watch(paths.test, ['test']);

    gulp
      .watch(paths.src, ['build']);

    gulp
      .watch(paths.dist)
      .on('change', livereload.changed);

  });

  gulp.task('build', ['minify', 'copy']);
  gulp.task('default', ['build', 'watch']);

  gulp.task('test', ['build'], function(done) {
    karma.start(_.assign({}, karmaConf, {singleRun: true}), done);
  });

})();
