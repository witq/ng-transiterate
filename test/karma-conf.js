(function(module) {

  'use strict';

  var karmaConf = {
    browsers: [
      'PhantomJS'
    ],
    frameworks: [
      'jasmine'
    ],
    files: [
      './test/lib/angular.min.js',
      './test/lib/angular-mocks.js',
      './dist/ng-transiterate.js',
      './test/spec/**/*.js'
    ],
    preprocessors: {
      './dist/ng-transiterate.js': [
        'coverage'
      ]
    },
    reporters: [
      'spec',
      'coverage'
    ],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  };

  module.exports = karmaConf;

})(module);
