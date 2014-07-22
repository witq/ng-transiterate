# ng-transiterate [![Build Status](https://travis-ci.org/witq/ng-transiterate.svg?branch=master)](https://travis-ci.org/witq/ng-transiterate)

AngularJS directive for eased iteration display

![illustration](_readme/test.gif)

## Demo

A working demo can be foud at the project's website: [http://witq.github.io/ng-transiterate](http://witq.github.io/ng-transiterate)

## Install

The preferred installation method is just using Bower, like that:
```sh
$ bower install ng-transiterate
```
By default, only the core directive is installed in the unminified version. If you want to load additional easing equations, you can customize your bower.json file with the following:
```json
{
  "dependencies": {
    "ng-transiterate": "~1.1"
  },
  "overrides": {
    "ng-transiterate": {
      "main": [
        "dist/ng-transiterate.js", // required
        "dist/ng-transiterate.easings.js" // optional
      ]
    }
  } 
}
```
Or, for the minified versions:
```json
{
  "dependencies": {
    "ng-transiterate": "~1.1",
    ...
  },
  "overrides": {
    "ng-transiterate": {
      "main": [
        "dist/ng-transiterate.min.js", // required
        "dist/ng-transiterate.easings.min.js" // optional
      ]
    },
    ...
  } 
}
```

Remember to load the script file in your view:
```html
<script src="bower_components/ng-transiterate/dist/ng-transiterate.js"></script>
```
If you decide to also load the additional easing equations, add this:
```html
<script src="bower_components/ng-transiterate/dist/ng-transiterate.easings.js"></script>
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
Sets the easing method. This can be any of the Robert Penner's easing functions. Default it "linearEase". Other easing equations are optional, as described in the installation instructions.
```html
<div transiterate="value" easing="easeOutQuad"></div>
```
#### precision
Sets how precisely should floating numbers be displayed. Default is 0 (display as rounded integers). This parameter is used only when no filter is selected.
```html
<div transiterate="value" precision="2"></div>
```
#### filter
Sets which angular filter the directive should use for display. Default is none. If a filter requires parameters, they should be passed like that: `number:3`. This sets the filter to number with optional fractionSize parameter.
```html
<div transiterate="value" filter="number:3"></div>
```

### Setting defaults
The directive comes with some default settings. If you are planning to use it in many places in your app, you can change those defaults in your `.config()` block, as the transiterateDefaults service can be injected and used as transiterateDefaultsProvider. It has a `.setDefault(option, value)` method, which can be used to set global app values that all instances of the directive will use:

```javascript
angular.module('myApp', ['ngTransiterate'])
  .config(function(transiterateDefaultsProvider) {
    transiterateDefaultsProvider.setDefault('duration', 3000);
});
```
If you want to set multiple options, you can chain the calls:
```javascript
angular.module('myApp', ['ngTransiterate'])
  .config(function(transiterateDefaultsProvider) {
    transiterateDefaultsProvider
      .setDefault('duration', 6000)
      .setDefault('easing', 'easeOutQuad')
      .setDefault('filter', 'number:3');
});
```
Yeah, I know, the provider name is a bit too long.

## Contributing

This directive is my first jab at creating something universal and reusable. If you have any ideas how to make it better, PR's and suggestions are welcome.
