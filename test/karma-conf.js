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
      './src/ng-transiterate.js',
      './src/ng-transiterate.easings.js',
      './test/spec/**/*.js'
    ],
    preprocessors: {
      './src/ng-transiterate.js': [
        'coverage'
      ],
      './src/ng-transiterate.easings.js': [
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
