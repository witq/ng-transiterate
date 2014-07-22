(function() {

  'use strict';

  var bower       = require('gulp-bower'),
      connect     = require('gulp-connect'),
      gulp        = require('gulp'),
      livereload  = require('gulp-livereload'),
      wiredep     = require('wiredep').stream,

      paths = {
        watch: [
          './index.html',
          './javascripts/*',
          './stylesheets/*',
          './views/*'
        ]
      };

  gulp.task('bowerInstall', function() {

    return bower();

  });

  gulp.task('bower', ['bowerInstall'], function() {

    return gulp
      .src('./index.html')
      .pipe(wiredep())
      .pipe(gulp.dest('./'));

  });

  gulp.task('serve', ['watch'], function() {

    connect.server();

  });

  gulp.task('watch', function() {

    livereload.listen();

    gulp
      .watch(paths.watch)
      .on('change', livereload.changed);

  });

}());
