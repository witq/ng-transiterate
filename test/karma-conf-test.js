(function(module) {

  'use strict';

  var _           = require('lodash'),
      commonConf  = require('./karma-conf'),

  conf = {
    files: [
      './test/lib/angular.min.js',
      './test/lib/angular-mocks.js',
      './dist/ng-transiterate.js',
      './dist/ng-transiterate.easings.js',
      './test/spec/**/*.js'
    ],
    preprocessors: {
      './dist/ng-transiterate.js': [
        'coverage'
      ],
      './dist/ng-transiterate.easings.js': [
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

  module.exports = _.assign({}, commonConf, conf);

})(module);
