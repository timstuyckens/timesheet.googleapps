define(["knockout"], function(ko) {
	"use strict";
	var that = {};
	var isInitialized = false;

	that.init = function(vm) {
		if (!isInitialized) {
			ko.applyBindings(vm, $("#settingsContainer")[0]);
			isInitialized = true;
		}
	};

	return that;
});