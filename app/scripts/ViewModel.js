define(["knockout", "moment", "utils", "overviewCalculationModule"], function(ko, moment, utils, overviewCalculator) {
	"use strict";

	return function() {
		var self = this;
		self.loading = ko.observable(true);
		self.authorized = ko.observable(false);
		self.categories = ko.observableArray([]);
		self.events = ko.observableArray([]);
		self.holidays = ko.observableArray([]);
		self.eventsGrouped = ko.computed(function() {
			var items = self.events(),
				cats = self.categories();
			return overviewCalculator.getGroupedOverviewByEventsAndCategories(items, cats);
		});
		self.categoryOverviews = ko.computed(function() {
			var items = self.events(),
				cats = self.categories();
			return overviewCalculator.getOverviewByEventsAndCategories(items, cats);
		});
		self.gotoPreviousMonth = function() {
			var temp = moment(self.monthDay()).subtract("months", 1);
			self.monthDay(temp);
		};
		self.gotoNextMonth = function() {
			var temp = moment(self.monthDay()).add("months", 1);
			self.monthDay(temp);
		};
		self.monthDay = ko.observable(moment());
		self.month = ko.computed(function() {
			var niceMonth = utils.months[self.monthDay().month()];
			return niceMonth;
		});
		self.eventsInMonth = ko.computed(function() {
			var m = self.monthDay().month(),
				cats = self.categories();
			return ko.utils.arrayFilter(self.events(), function(e) {
				var inCat = !! $.grep(cats, function(cat) {
					return utils.trimAndLowerCase(e.summary) == utils.trimAndLowerCase(cat.name());
				})[0];
				return m === e.startDate.getMonth() && inCat;
			});
		});
		self.monthCounter = ko.computed(function() {
			return self.eventsInMonth().length;
		});
	};
});