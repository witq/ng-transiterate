(function(angular) {

  'use strict';

  var directive = function ($filter, $injector) {
    return {
      restrict: 'A',
      scope: {
        value: '=transiterate',
        startCallback: '=',
        stepCallback: '=',
        endCallback: '='
      },
      link: function(scope, element, attrs) {

        var duration = attrs.duration || 800, // TODO: add duration autodetection
          easing = attrs.easing || 'linearEase',
          easings,
          ngTransiterateEasings,
          filterArr,
          filter,
          filterParam,
          precision = attrs.precision || 0,

          setValue = function(val, filter, filterParam) {
            if (filter && typeof filter === 'string') {
              element.text($filter(filter)(val, filterParam));
            } else {
              if (precision === 0) {
                element.text(Math.round(val));
              } else {
                if (precision > 0) {
                  element.text(val.toFixed(precision));
                } else {
                  element.text(val);
                }
              }
            }
          },

          transIterate = function(from, to, duration, stepCallback, startCallback, endCallback) {

            var diff = to - from,
              startTime = perfNow();

            if (startCallback && typeof startCallback === 'function') {
              startCallback(from);
            }

            (function step() {

              var animTime,
                val;

              animTime = Math.min(perfNow() - startTime, duration);
              val = easings[easing](animTime, from, diff, duration);

              if (duration - animTime < 0.0001) {

                if (endCallback && typeof endCallback === 'function') {
                  endCallback(to, filter, filterParam);
                } else {
                  setValue(to, filter, filterParam);
                }

              } else {

                requestAnimFrame(step);

                if (stepCallback && typeof stepCallback === 'function') {
                  stepCallback(val, filter, filterParam, animTime);
                } else {
                  setValue(val, filter, filterParam);
                }
              }
            })();

          };

        // interpret filter input

        if (attrs.filter) {
          filterArr = attrs.filter.split(':');
          filter = filterArr[0];
          if (filterArr.length > 1) {
            filterParam = parseInt(filterArr[1]) || filterArr[1];
          }
        }

        // check if easings file is included and load it if it is

        if($injector.has('ngTransiterateEasings')) {
          ngTransiterateEasings = $injector.get('ngTransiterateEasings');
        }

        easings = angular.extend({}, ngTransiterateEasings, {

          linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * currentIteration / totalIterations + startValue;
          }

        });

        // Start watching for value changes and transiterating

        scope.$watch('value', function(newValue, oldValue) {
          if (typeof newValue === 'number') {
            if (newValue !== oldValue) {
              if (typeof oldValue !== 'number') {
                oldValue = 0;
              }
              transIterate(oldValue, newValue, duration, scope.stepCallback, scope.startCallback, scope.endCallback);
            } else {
              setValue(newValue, filter, filterParam);
            }
          }
        });
      }
    };
  },

  now = Date.now || function() {
    return new Date().getTime();
  },

  navigationStart = now(),

  perfNow = function() {
    if (window.performance && window.performance.now) {
      return window.performance.now();
    }
    return now() - navigationStart;
  },

  // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

  requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback) {
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  // Register the directive

  angular.module('ngTransiterate', [])
    .directive('transiterate', ['$filter', '$injector', directive]);

})(window.angular);
