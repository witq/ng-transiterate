(function() {

  'use strict';

  angular.module('ui.transiterate', [])
    .directive('transiterate', function ($filter) {
      return {
        restrict: 'A',
        scope: {
          value: '=transiterate'
        },
        link: function(scope, element) {
          function easyTerate(from, to, duration) {

            var easeInOutExpo = function (t, b, c, d) {
              if (t === 0) {
                return b;
              }
              if (t === d) {
                return b + c;
              }
              if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
              }
              return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            diff = to - from,
            dur = duration || 800,
            startTime = window.performance.now();

            function frame(time) {
              var animTime = time - startTime,
                val;
              if (animTime >= duration) {
                element.text($filter('number')(to));
              } else {
                val = easeInOutExpo(animTime, from, diff, dur);
                element.text(Math.round(val));
                requestAnimationFrame(frame);
              }
            }

            requestAnimationFrame(frame);

          }
          scope.$watch('value', function(newValue, oldValue) {
            if (newValue) {
              if (!oldValue) {
                oldValue = 0;
              }
              easyTerate(oldValue, newValue, 1000);
            }
          });
        }
      };
    });


})();
