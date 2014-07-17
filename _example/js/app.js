(function() {

  'use strict';

  angular
    .module('exampleApp', [
      'ngTransiterate'
    ])
    .controller('mainController', function($scope) {
      $scope.val = 15;
      $scope.add = function() {
        $scope.val += Math.random() * 700 + 1;
      };
    });

})();