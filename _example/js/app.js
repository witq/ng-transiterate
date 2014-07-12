(function() {

  'use strict';

  angular
    .module('exampleApp', [
      'ui.transiterate'
    ])
    .controller('mainController', function($scope) {
      $scope.val = 0;
      $scope.add = function() {
        $scope.val += Math.random() * 700 + 1;
      };
    });

})();