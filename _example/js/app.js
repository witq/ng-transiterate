(function() {

  'use strict';

  angular
    .module('exampleApp', [
      'ngTransiterate'
    ])
    .config(function(TransiterateDefaultsProvider) {
      TransiterateDefaultsProvider
        .setDefault('duration', 5000)
        .setDefault('filter', 'currency')
        .setDefault('easing', 'easeInOutExpo');
    })
    .controller('mainController', function($scope) {
      $scope.val = 0;
      $scope.add = function() {
        $scope.val += Math.random() * 700 + 1;
      };
    });

})();
