define(["knockout","moment","utils","overviewCalculationModule"], function(ko,moment,utils,overviewCalculator) {
	"use strict";

	return function (){
		var self=this;
		var currentYear=new Date().getFullYear();

		self.loading=ko.observable(true);
		self.authorized=ko.observable(false);
		self.categories=ko.observableArray([]);
		self.events=ko.observableArray([]);
		self.holidays=ko.observableArray([]);
		self.eventsGrouped=ko.computed(function(){
			var items=self.events(),cats=self.categories();
			return overviewCalculator.getGroupedOverviewByEventsAndCategories(items,cats);
		});
		
		self.years=ko.observable([currentYear-2,currentYear-1,currentYear,currentYear+1]);
		self.categoryOverviews=ko.computed(function(){
			var items=self.events(),cats=self.categories();
			return overviewCalculator.getOverviewByEventsAndCategories(items,cats);
		});
		self.gotoPreviousMonth=function(){
			var temp=moment(self.monthDay()).subtract("months",1);
			self.monthDay(temp);
		};
		self.gotoNextMonth=function(){
			var temp=moment(self.monthDay()).add("months",1);
			self.monthDay(temp);
		};
		self.monthDay=ko.observable(moment());
		self.month=ko.computed(function(){
			var niceMonth=utils.months[self.monthDay().month()];
			return niceMonth;
		});
		self.year=ko.computed({
	        read: function () {
	            return self.monthDay().year();
	        },
	        write: function (value) {
	        	self.monthDay(self.monthDay().year(parseInt(value,10)));
	        },
	        owner:self
		});
		self.eventsInMonth=ko.computed(function(){
			var m=self.monthDay().month(),cats=self.categories();
			return ko.utils.arrayFilter(self.events(),function(e){
				var inCat=!!$.grep(cats,function(cat){
					return utils.trimAndLowerCase(e.summary)==utils.trimAndLowerCase(cat.name());
				})[0];
				return m===e.startDate.getMonth() && inCat;
			});
		});
		self.monthCounter=ko.computed(function(){
			return self.eventsInMonth().length;
		});
	};
});