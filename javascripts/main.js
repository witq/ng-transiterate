(function(angular) {

  'use strict';

  var app = angular.module('app', ['ngRoute','ngTransiterate']),
      pages = [
        {
          title: 'Home',
          templateUrl: 'views/home.html',
          url: '/home',
          controller: 'homeController'
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

  app.controller('appController', function($scope) {

    $scope.pages = pages;

  });

  app.controller('homeController', function($scope, $interval) {
    $scope.value = 0;
    $interval(function() {
      $scope.value = Math.random() * 1000000 + 1;
    }, 3000);
  });

})(window.angular);
