(function() {

  'use strict';

  angular
    .module('exampleApp', [
      'ngTransiterate'
    ])
    .config(function(TransiterateDefaultsProvider) {
      TransiterateDefaultsProvider
        .setDefault('duration', 400)
        .setDefault('filter', 'currency');
    })
    .controller('mainController', function($scope) {
      $scope.val = 0;
      $scope.add = function() {
        $scope.val += Math.random() * 700 + 1;
      };
    });

})();
