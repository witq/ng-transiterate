# ng-transiterate

> AngularJS directive for eased iteration display

![illustration](_readme/test.gif)

## Install

The preferred installation method is just using Bower, like that:
```sh
$ bower install ng-transiterate
```
Remember to load the script file in your view:
```html
<script src="bower_components/ng-transiterate/dist/ng-transiterate.js"></script>
```
Then, reference the module (`ngTransiterate`) in your app:
```javascript
angular.module('myApp', ['ngTransiterate']);
```

## Use

The directive is very easy to use. The minimal working usage looks like that:
```html
<div transiterate="value"></div>
```
Where value is any numerical value bound to $scope. The directive sets the element's content to the supplied values and animates any changes.

### Optional attributes

#### duration
Sets the animation duration in miliseconds. Default is 800.
```html
<div transiterate="value" duration="6000"></div>
```
#### easing
Sets the easing method. This can be any of the Robert Penner's easing functions. Default it "easeInOutExpo".
```html
<div transiterate="value" easing="easeOutQuad"></div>
```
#### precision
Sets how precisely should floating numbers be displayed. Default is 0 (display as rounded integers).
```html
<div transiterate="value" precision="2"></div>
```
