(function() {

  'use strict';

  angular.module('ui.transiterate', [])
    .directive('transiterate', function (easings) {
      return {
        restrict: 'A',
        scope: {
          value: '=transiterate',
          easing: '@',
          duration: '@'
        },
        link: function(scope, element) {
          function logTime(startTime) {
            console.log(window.performance.now() - startTime);
          }

          function easyTerate(from, to, duration, endCallback) {

            var diff = to - from,
              dur = duration || 800,
              startTime = window.performance.now();

            function frame(time) {
              var animTime = time - startTime,
                val;
              if (animTime >= duration) {
                element.text(to);
                if (endCallback) {
                  endCallback(startTime);
                }
              } else {
                val = easings[scope.easing](animTime, from, diff, dur);
                element.text(Math.round(val));
                window.requestAnimationFrame(frame);
              }
            }

            window.requestAnimationFrame(frame);

          }
          scope.$watch('value', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              easyTerate(oldValue, newValue, scope.duration, logTime);
            }
          });
        }
      };
    })
    .factory('easings', function() {
      return {

        linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * currentIteration / totalIterations + startValue;
        },
        easeInQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
        },
        easeOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
          return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
        },
        easeInOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
          if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * currentIteration * currentIteration + startValue;
          }
          return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
        },
        easeInCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
        },
        easeOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
        },
        easeInOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
          if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
          }
          return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
        },
        easeInQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.pow (currentIteration / totalIterations, 4) + startValue;
        },
        easeOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
          return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
        },
        easeInOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
          if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
          }
          return -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
        },
        easeInQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.pow (currentIteration / totalIterations, 5) + startValue;
        },
        easeOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
        },
        easeInOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
          if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
          }
          return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
        },
        easeInSine: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
        },
        easeOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
        },
        easeInOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
        },
        easeInExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
        },
        easeOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
        },
        easeInOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
          if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
          }
          return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
        },
        easeInCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
        },
        easeOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
        },
        easeInOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
          if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
          }
          return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
        }
      };
    });


})();
