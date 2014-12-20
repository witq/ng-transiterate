(function(module) {

  'use strict';

  var _           = require('lodash'),
      commonConf  = require('./karma-conf'),

      conf = {
        files: [
          './test/lib/angular.min.js',
          './test/lib/angular-mocks.js',
          './dist/ng-transiterate.min.js',
          './dist/ng-transiterate.easings.min.js',
          './test/spec/**/*.js'
        ],
        reporters: [
          'spec'
        ]
      };

  module.exports = _.assign({}, commonConf, conf);

})(module);
