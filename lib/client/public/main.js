'use strict';

if (window.applicationCache) {
	// FF won't fire this event if there's no listener registered
	// before window.onload
	window.applicationCache.addEventListener('updateready', function () {},
		false);
}

// Shims:
// Safari OSX + iOS
require('es5-shim/lib/Function/prototype/bind');
// Safari iOS
require('es5-shim/lib/Object/freeze');
require('dom-shim/lib/classList');
require('es5-fix/lib/Date/parse');

// Fix Safari OSX + iOS implementation
require('es5-fix/lib/Object/defineProperty');

// Show all arguments in Safari iOS console
require('base/client/fix-ios-console');

// Expose unresolved promises
require('deferred/lib/deferred').MONITOR = function () {
	var stack = (new Error()).stack;
	stack = (stack && stack.toString()) || "NO STACK IN SAFARI";
	return setTimeout(function () {
		console.error("UNRESOLVED PROMISE:" + stack);
	}, 5000);
};

window.onload = function () {
	var view, auth;

	// Configure view engine
	view = require('../view');

	// Configure view controller
	require('base/client/controller');

};
