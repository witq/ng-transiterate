(function(angular) {

  'use strict';

  var app = angular.module('app', ['ngRoute','ngTransiterate','hljs']),
      pages = [
        {
          title: 'Home',
          templateUrl: 'views/home.html',
          url: '/home'
        },
        {
          title: 'Installation',
          templateUrl: 'views/installation.html',
          url: '/installation'
        },
        {
          title: 'Examples',
          templateUrl: 'views/examples.html',
          url: '/examples'
        }
      ];

  app.config(function($routeProvider) {

    pages.forEach(function(page) {
      $routeProvider.when(page.url, {
        templateUrl: page.templateUrl,
        title: page.title,
        controller: page.controller
      });
    });

    $routeProvider
      .otherwise({
        redirectTo: '/home'
      });

  });

  app.directive('checkActive', function($location) {
    return {
      restrict: 'A',
      scope: {
        url: '@checkActive',
      },
      link: function(scope, element) {
        scope.$watch(function() {
          return $location.path();
        }, function(value) {
          if (value.indexOf(scope.url) !== -1) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        });
      }
    };
  });

  app.controller('appController', function($scope, $interval) {

    $scope.pages = pages;

    $scope.value = Math.random() * 2000 + 1;
    $interval(function() {
      $scope.value = Math.random() * 2000 + 1;
    }, 4000);

  });


})(window.angular);
