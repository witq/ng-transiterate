(function() {

  'use strict';

  angular
    .module('exampleApp', [
      'ui.transiterate'
    ])
    .controller('mainController', function($scope, $interval) {
      $scope.val = 0;
      $interval(function() {
        $scope.val = Math.floor(Math.random() * 2000) + 1;
      }, 3000);
    });

})();