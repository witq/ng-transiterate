(function() {

  'use strict';

  var directive = function ($filter) {
    return {
      restrict: 'A',
      scope: {
        value: '=transiterate'
      },
      link: function(scope, element, attrs) {

        var duration = attrs.duration || 800,
          easing = attrs.easing || 'easeInOutExpo',
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

          if (attrs.filter) {
            filterArr = attrs.filter.split(':');
            filter = filterArr[0];
            if (filterArr.length > 1) {
              filterParam = parseInt(filterArr[1]) || filterArr[1];
            }
          }

        // Set initial value

        setValue(scope.value, filter, filterParam);

        // Start watching for value changes and transiterating

        scope.$watch('value', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            transIterate(oldValue, newValue, duration);
          }
        });
      }
    };
  },

  now = Date.now || function() {
    return new Date.getTime();
  },

  navigationStart = now(),

  perfNow = function() {
    if (window.performance && window.performance.now) {
      return window.performance.now();
    }
    return now() - navigationStart;
  },

  /*
   *
   * TERMS OF USE - EASING EQUATIONS
   *
   * Open source under the BSD License.
   *
   * Copyright © 2001 Robert Penner
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   *
   * Redistributions of source code must retain the above copyright notice, this list of
   * conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list
   * of conditions and the following disclaimer in the documentation and/or other materials
   * provided with the distribution.
   *
   * Neither the name of the author nor the names of contributors may be used to endorse
   * or promote products derived from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
   * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
   * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   */

  easings = {

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
    .directive('transiterate', ['$filter', directive]);

})();
