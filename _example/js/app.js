(function() {

  'use strict';

  angular
    .module('exampleApp', [
      'ngTransiterate'
    ])
    .config(function(transiterateDefaultsProvider) {
      transiterateDefaultsProvider
        .setDefault('duration', 2500)
        .setDefault('easing', 'easeInOutExpo')
        .setDefault('filter', 'currency');
    })
    .controller('mainController', function($scope) {
      $scope.val = 0;
      $scope.add = function() {
        $scope.val += Math.random() * 700 + 1;
      };
    });

})();
