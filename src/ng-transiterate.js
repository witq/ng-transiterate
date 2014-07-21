(function(angular, window) {

  'use strict';

  var directive,
      utils;

  directive = function ($filter, $injector, TransiterateDefaults) {
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
            duration = attrs.duration || TransiterateDefaults.duration,
            easing = attrs.easing || TransiterateDefaults.easing,
            easings,
            filter,
            filterArr,
            filterParam,
            transiterateEasings,
            precision = attrs.precision || TransiterateDefaults.precision,
            setValue,
            transIterate;

        defaultEasing = {
          linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * currentIteration / totalIterations + startValue;
          }
        };

        // check if easings file is included and load it if it is

        if ($injector.has('transiterateEasings')) {
          transiterateEasings = $injector.get('transiterateEasings');
          easings = angular.extend({}, transiterateEasings, defaultEasing);
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
        } else if (TransiterateDefaults.filter) {
          filterArr = TransiterateDefaults.filter.split(':');
          filter = filterArr[0];
          if (filterArr.length > 1) {
            filterParam = parseInt(filterArr[1] || filterArr[1]);
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

  // Register the defaults service and then the directive

  angular.module('ngTransiterate', [])
    .provider('TransiterateDefaults', {

      defaults: {
        duration: 800,
        easing: 'linearEase',
        filter: undefined,
        precision: 0
      },

      setDefault: function(option, value) {
        this.defaults[option] = value;
        return this;
      },

      $get: function() {
        return this.defaults;
      }

    })
    .directive('transiterate', ['$filter', '$injector', 'TransiterateDefaults', directive]);

})(window.angular, window);
