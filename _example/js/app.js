(function() {

  'use strict';

  angular
    .module('exampleApp', [
      'ngTransiterate'
    ])
    .controller('mainController', function($scope) {
      $scope.val = 0;
      $scope.end = function(to) {
        console.log(to);
      };
      $scope.add = function() {
        $scope.val += Math.random() * 700 + 1;
      };
    });

})();
