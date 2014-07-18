(function(module) {

  'use strict';

  var karmaConf = {
    browsers: [
      'Chrome'
    ],
    frameworks: [
      'jasmine'
    ],
    files: [
      'https://code.angularjs.org/1.2.20/angular.js',
      'https://code.angularjs.org/1.2.20/angular-mocks.js',
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
