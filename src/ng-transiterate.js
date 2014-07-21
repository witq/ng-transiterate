(function(angular, window) {

  'use strict';

  var directive,
      utils;

  directive = function ($filter, $injector) {
    return {
      restrict: 'A',
      scope: {
        value: '=transiterate',
        startCallback: '=',
        stepCallback: '=',
        endCallback: '='
      },
      link: function(scope, element, attrs) {

        var defaultEasing,
            duration = attrs.duration || 800,
            easing = attrs.easing || 'linearEase',
            easings,
            filter,
            filterArr,
            filterParam,
            ngTransiterateEasings,
            precision = attrs.precision || 0,
            setValue,
            transIterate;

        defaultEasing = {
          linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * currentIteration / totalIterations + startValue;
          }
        };

        // check if easings file is included and load it if it is

        if ($injector.has('ngTransiterateEasings')) {
          ngTransiterateEasings = $injector.get('ngTransiterateEasings');
          easings = angular.extend({}, ngTransiterateEasings, defaultEasing);
        } else {
          easings = defaultEasing;
        }

        // interpret filter input

        if (attrs.filter) {
          filterArr = attrs.filter.split(':');
          filter = filterArr[0];
          if (filterArr.length > 1) {
            filterParam = parseInt(filterArr[1]) || filterArr[1];
          }
        }

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
        };

        transIterate = function(from, to, duration, stepCallback, startCallback, endCallback) {

          var diff = to - from,
            startTime = utils.now(),
            step;

          step = function() {

            var animTime,
              val;

            animTime = Math.min(utils.now() - startTime, duration);
            val = easings[easing](animTime, from, diff, duration);

            if (duration - animTime < 0.0001) {

              setValue(to, filter, filterParam);

              if (endCallback && typeof endCallback === 'function') {
                endCallback(to, filter, filterParam);
              }

            } else {

              utils.requestAnimationFrame.call(window, step);

              setValue(val, filter, filterParam);

              if (stepCallback && typeof stepCallback === 'function') {
                stepCallback(val, filter, filterParam, animTime);
              }
            }
          };

          // call the start callback

          if (startCallback && typeof startCallback === 'function') {
            startCallback(from);
          }

          // request next requestAnimationFrame tick and enter the loop

          utils.requestAnimationFrame.call(window, step);

        };

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
  };

  // create some basic utilities, do browser features check

  utils = (function() {

    var navigationStart,
        now,
        perfNow,
        requestAnimationFrame;

    now = Date.now || function() {
      return new Date().getTime();
    };
    navigationStart = now();
    if (window.performance && window.performance.now) {
      perfNow = function() {
        return window.performance.now();
      };
    } else {
      perfNow = function() {
        return now() - navigationStart;
      };
    }
    requestAnimationFrame = (function() {
      return window.requestAnimationFrame  ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    }());

    return {
      now: perfNow,
      requestAnimationFrame: requestAnimationFrame
    };

  }());

  // Register the directive

  angular.module('ngTransiterate', [])
    .directive('transiterate', ['$filter', '$injector', directive]);

})(window.angular, window);
