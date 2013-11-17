define(["knockout", "utils"], function(ko, utils) {
	"use strict";
	var that = {};

	var isSummaryInteresting = function(a, b) {
		var summaryEqualsCat = utils.trimAndLowerCase(a.summary) === utils.trimAndLowerCase(b);
		var confirmed = a.status === "confirmed";
		return summaryEqualsCat && confirmed;
	};

	that.getOverviewByEventsAndCategories = function(items, cats, theDate) {
		var now = theDate || new Date(),
			temp = [];
		ko.utils.arrayForEach(cats, function(i) {
			var aantalOpgenomen = 0,
				aantalGepland = 0,
				name = i.name(),
				max = i.number(),
				remaining = 0;
			ko.utils.arrayForEach(items, function(item) {
				if (!isSummaryInteresting(item, name))
					return;
				var addedPart = item.isFullDay ? 1.0 : 0.5;
				if (utils.toDate(item.end) < now)
					aantalOpgenomen = aantalOpgenomen + addedPart;
				else
					aantalGepland = aantalGepland + addedPart;
			});
			remaining = max - aantalOpgenomen - aantalGepland;
			temp.push({
				name: name,
				max: max,
				aantalOpgenomen: aantalOpgenomen,
				aantalGepland: aantalGepland,
				remaining: remaining
			});
		});
		return temp;
	};

	that.getGroupedOverviewByEventsAndCategories = function(items, cats, theDate) {
		var now = theDate || new Date(),
			temp = [{
				name: "Detail voorbijgaande",
				items: []
			}, {
				name: "Detail toekomst",
				items: []
			}];
		ko.utils.arrayForEach(items, function(item) {
			var inPast = utils.toDate(item.end) < now;
			var inCategoryAndSubmitted = false;
			ko.utils.arrayForEach(cats, function(i) {
				if (isSummaryInteresting(item, i.name())) {
					inCategoryAndSubmitted = true;
				}
			});
			if (inCategoryAndSubmitted) {
				var index = inPast ? 0 : 1;
				temp[index].items.push(item);
			}
		});
		return temp;
	};
	return that;
});