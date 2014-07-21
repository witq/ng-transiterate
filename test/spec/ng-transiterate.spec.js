(function() {

  'use strict';

  describe('transiterate directive', function() {

    var element,
        lag = 1000 / 60, // account for last animation frame lag
        scope;

    beforeEach(module('ngTransiterate'));

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    describe('basics', function() {

      it('should initialize with value set to 0', inject(function($compile) {
        scope.value = 0;
        element = angular.element('<div transiterate="value"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('0');
      }));

      it('should initialize with value set to 42', inject(function($compile) {
        scope.value = 42;
        element = angular.element('<div transiterate="value"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('42');
      }));

      it('should initialize with value set to "horse" but not display anything', inject(function($compile) {
        scope.value = 'horse';
        element = angular.element('<div transiterate="value"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('');
      }));

      it('should change value from 0 to 1000 in 800 ms', inject(function($compile) {
        var value = 1000;
        element = angular.element('<div transiterate="value"></div>');
        element = $compile(element)(scope);
        runs(function() {
          scope.value = 0;
          scope.$digest();
          expect(element.text()).toBe('0');
          scope.value = value;
          scope.$digest();
        });
        waits(800 + lag);
        runs(function() {
          expect(element.text()).toBe(Math.round(value) + '');
        });
      }));

      it('should gracefuly handle setting of unsupported value: 0 -> "horse" -> 50 and display 50', inject(function($compile) {
        element = angular.element('<div transiterate="value"></div>');
        element = $compile(element)(scope);
        runs(function() {
          scope.value = 0;
          scope.$digest();
          expect(element.text()).toBe('0');
          scope.value = 'horse';
          scope.$digest();
          expect(element.text()).toBe('0');
          scope.value = 50;
          scope.$digest();
        });
        waits(800 + lag);
        runs(function() {
          expect(element.text()).toBe('50');
        });
      }));

    });

    describe('precision parameter', function() {

      it('should initialize with value set to 0, precision set to 2 and display 0.00', inject(function($compile) {
        scope.value = 0;
        element = angular.element('<div transiterate="value" precision="2"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('0.00');
      }));

      it('should initialize with value set to 10.987654321, precision set to -1 and display 10.987654321', inject(function($compile) {
        scope.value = 10.987654321;
        element = angular.element('<div transiterate="value" precision="-1"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('10.987654321');
      }));

      it('should initialize with value set to 42.15789382, precision set to 2 and display 42.16', inject(function($compile) {
        scope.value = 42.15789382;
        element = angular.element('<div transiterate="value" precision="2"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('42.16');
      }));

      it('should change value from 0 to 42.16 in 800 ms', inject(function($compile) {
        var value = 42.15789382;
        runs(function() {
          scope.value = 0;
          element = angular.element('<div transiterate="value"></div>');
          element = $compile(element)(scope);
          scope.$digest();
          expect(element.text()).toBe('0');
          scope.value = value;
          scope.$digest();
        });
        waits(800 + lag);
        runs(function() {
          expect(element.text()).toBe(Math.round(value) + '');
        });
      }));

    });

    describe('duration parameter', function() {

      it('should change value from 0 to 1000 in 1000 ms', inject(function($compile) {
        var value = 1000;
        element = angular.element('<div transiterate="value" duration="1000"></div>');
        element = $compile(element)(scope);
        runs(function() {
          scope.value = 0;
          scope.$digest();
          expect(element.text()).toBe('0');
          scope.value = value;
          scope.$digest();
        });
        waits(800);
        runs(function() {
          expect(element.text()).not.toBe(value + '');
        });
        waits(200 + lag);
        runs(function() {
          expect(element.text()).toBe(value + '');
        });
      }));

      it('should gracefuly handle value changing too soon', inject(function($compile) {
        var value = 1000;
        element = angular.element('<div transiterate="value" duration="200"></div>');
        element = $compile(element)(scope);
        runs(function() {
          scope.value = 0;
          scope.$digest();
          expect(element.text()).toBe('0');
          scope.value = value;
          scope.$digest();
        });
        waits(100);
        runs(function() {
          scope.value = 3000;
          scope.$digest();
        });
        waits(200 + lag);
        runs(function() {
          expect(element.text()).toBe(3000 + '');
        });
      }));

    });

    describe('easing parameter', function() {

      var easings = [
        'linearEase',
        'easeInQuad',
        'easeOutQuad',
        'easeInOutQuad',
        'easeInCubic',
        'easeOutCubic',
        'easeInOutCubic',
        'easeInQuart',
        'easeOutQuart',
        'easeInOutQuart',
        'easeInQuint',
        'easeOutQuint',
        'easeInOutQuint',
        'easeInSine',
        'easeOutSine',
        'easeInOutSine',
        'easeInExpo',
        'easeOutExpo',
        'easeInOutExpo',
        'easeInCirc',
        'easeOutCirc',
        'easeInOutCirc'
      ];

      easings.forEach(function(easing) {

        it('should accept ' + easing + ' easing', inject(function($compile) {

          var value = 1000;
          element = angular.element('<div transiterate="value" easing="' + easing + '" duration="5"></div>');
          element = $compile(element)(scope);
          runs(function() {
            scope.value = 0;
            scope.$digest();
            expect(element.text()).toBe('0');
            scope.value = value;
            scope.$digest();
          });
          waits(5 + lag);
          runs(function() {
            expect(element.text()).toBe(Math.round(value) + '');
          });

        }));

      });

    });

    describe('filter parameter', function() {

      it('should initialize with value set to 0, filter set to currency and display $0.00', inject(function($compile) {
        scope.value = 0;
        element = angular.element('<div transiterate="value" filter="currency"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('$0.00');
      }));

      it('should initialize with value set to 42.15789382, filter set to currency and display $42.16', inject(function($compile) {
        scope.value = 42.15789382;
        element = angular.element('<div transiterate="value" filter="currency"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('$42.16');
      }));

      it('should initialize with value set to 42.15789382, filter set to currency:PLN and display PLN42.16', inject(function($compile) {
        scope.value = 42.15789382;
        element = angular.element('<div transiterate="value" filter="currency:PLN"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('PLN42.16');
      }));

      it('should initialize with value set to 1042.15789382, filter set to number:4 and display 1,042.1579', inject(function($compile) {
        scope.value = 1042.15789382;
        element = angular.element('<div transiterate="value" filter="number:4"></div>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('1,042.1579');
      }));

    });

    describe('callbacks', function() {

      it('should fire startCallback once, providing the start value', inject(function($compile) {
        var output;
        runs(function() {
          scope.value = 154;
          scope.start = function(from) {
            output = from;
          };
          element = angular.element('<div transiterate="value" duration="200" start-callback="start" duration="0"></div>');
          element = $compile(element)(scope);
          scope.$digest();
          scope.value = 100;
          scope.$digest();
        });
        waits(lag);
        runs(function() {
          expect(output).toBe(154);
        });
      }));

      it('should fire stepCallback, providing the current value', inject(function($compile) {
        var output = 0;
        runs(function() {
          scope.value = 0;
          scope.step = function(val) {
            output += val;
          };
          element = angular.element('<div transiterate="value" step-callback="step" duration="200"></div>');
          element = $compile(element)(scope);
          scope.$digest();
          scope.value = 10;
          scope.$digest();
        });
        waits(200 + lag);
        runs(function() {
          expect(output).toBeGreaterThan(10);
        });
      }));

      it('should fire endCallback once, providing the end value', inject(function($compile) {
        var output = 1;
        runs(function() {
          scope.value = 154;
          scope.end = function(to) {
            output = to;
          };
          element = angular.element('<div transiterate="value" end-callback="end" duration="0"></div>');
          element = $compile(element)(scope);
          scope.$digest();
          scope.value = 100;
          scope.$digest();
        });
        waits(lag);
        runs(function() {
          expect(output).toBe(100);
        });
      }));

    });

  });

})();
