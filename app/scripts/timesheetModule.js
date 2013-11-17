define(['jquery', 'knockout', 'moment'], function($, ko, moment) {
	"use strict";
	var that = {};
	var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "Dececmeber"];
	var isInitialized = false;
	var isWeekend = function(eventDay) {
		var day = eventDay.day();
		return day === 0 || day === 6;
	};
	var getResultWhenTodayIsEndOfMonth = function(today) {
		var result = {};
		var nextMonth = moment(today).add('months', 1);
		result.start = moment([today.year(), today.month(), 1]);
		var daysInNextMonth = nextMonth.date();
		var lastOfMonth = nextMonth.subtract('days', daysInNextMonth);
		result.end = moment([lastOfMonth.year(), lastOfMonth.month(), lastOfMonth.date()]);
		return result;
	};
	var getResultWhenTodayIsBeginOfMonth = function(today) {
		var result = {};
		var previousMonth = moment(today).subtract('months', 1);
		result.start = moment([previousMonth.year(), previousMonth.month(), 1]);
		var helper = moment([previousMonth.year(), previousMonth.month(), 1]);
		var lastDayOfPreviousMonth = helper.add('months', 1).subtract('days', 1);
		result.end = moment([lastDayOfPreviousMonth.year(), lastDayOfPreviousMonth.month(), lastDayOfPreviousMonth.date()]);
		return result;
	};

	var getNameFromMailAdress = function(mailAdress) {
		var names = mailAdress.substring(0, mailAdress.indexOf("@")).split(".");
		var capitalizedNames = $.map(names, function(n) {
			return n.charAt(0).toUpperCase() + n.slice(1);
		});
		var niceName = capitalizedNames.join(" ");
		return niceName;
	};
	var TimesheetDay = function(event) {
		var self = this;
		self.isWeekend = event.isWeekend;
		self.date = event.startDate;
		self.workedFullDay = event.workedFullDay || false;
		self.workedHalfDay = event.workedHalfDay || false;
		self.hours = event.hours;
		self.comment = event.comment || "";
	};
	var ViewModel = function() {
		var self = this;
		self.notBillableDays = ko.observableArray([]);
		self.notFullDayWorkedDays = ko.observableArray([]);
		self.name = ko.observable("");
		self.timeSheetDay = ko.observable(moment());
		self.firstAndLastOfMontForTimeSheetDay = ko.computed(function() {
			var today = self.timeSheetDay();
			var result = (today.date() > 20) ? getResultWhenTodayIsEndOfMonth(today) : getResultWhenTodayIsBeginOfMonth(today);
			return result;
		});
		self.title = ko.computed(function() {
			var niceMonth = months[self.firstAndLastOfMontForTimeSheetDay().start.month()];
			var name = self.name();
			return name + " - " + niceMonth;
		});
		self.hours = ko.observable(8);
		self.totaal = ko.observable(0);

		self.timesheetDays = ko.computed(function() {
			self.totaal(0);
			var workedDays = [];
			var notBillableDays = self.notBillableDays();
			var notFullDayWorkedDays = self.notFullDayWorkedDays();
			var firstAndLast = self.firstAndLastOfMontForTimeSheetDay();

			var checkIfCurrentMomentIsInList = function(e) {
				return moment(e.date).format("DD/MM/YYYY") === currentMoment;
			};
			var start = moment(firstAndLast.start); //clone date because adding wil change first of month
			for (var i = start; i <= firstAndLast.end; i.add('days', 1)) {
				var currentMoment = moment(i).format("DD/MM/YYYY");
				var dayInMonthThatIsNotBillable = $.grep(notBillableDays, checkIfCurrentMomentIsInList)[0];
				var notFullDayWorked = $.grep(notFullDayWorkedDays, checkIfCurrentMomentIsInList)[0];
				var workedFullDay = false;
				var workedHalfDay = false;
				var hours = 0;
				var weekend = isWeekend(i);
				if (!dayInMonthThatIsNotBillable && !weekend) {
					if (notFullDayWorked) {
						hours = self.hours() / 2;
						workedHalfDay = true;
					} else {
						workedFullDay = true;
						hours = self.hours();
					}
					self.totaal(self.totaal() + hours);
				}
				var comment = dayInMonthThatIsNotBillable ? dayInMonthThatIsNotBillable.comment : "";
				if (notFullDayWorked)
					comment = "Halve dag";
				workedDays.push(new TimesheetDay({
					isWeekend: weekend,
					startDate: currentMoment,
					workedFullDay: workedFullDay,
					workedHalfDay: workedHalfDay,
					hours: hours,
					comment: comment
				}));
			}
			return workedDays;
		});

		self.gotoPreviousMonth = function() {
			var temp = moment(self.timeSheetDay()).subtract("months", 1);
			self.timeSheetDay(temp);
		};
		self.gotoNextMonth = function() {
			var temp = moment(self.timeSheetDay()).add("months", 1);
			self.timeSheetDay(temp);
		};
	};

	var vm = new ViewModel();
	that.show = function(data, aMoment) {
		var domElement = $("#timesheetContainer");
		var arrayWithAllTypesVerlof = [];
		var arrayWithAllHalfDays = [];
		$.each(data.eventsGrouped, function(i, e) {
			$.each(e.items, function(j, d) {
				d.comment = d.summaryCatMatch;
				var timesheetDay = new TimesheetDay(d);
				if (d.isFullDay)
					arrayWithAllTypesVerlof.push(timesheetDay);
				else
					arrayWithAllHalfDays.push(timesheetDay);
			});
		});
		$.each(data.holidays, function(i, e) {
			var timesheetDay = new TimesheetDay({
				isWeekend: true,
				startDate: moment(e.start.date),
				workedFullDay: false,
				workedHalfDay: false,
				hours: 0,
				comment: e.summary
			});
			arrayWithAllTypesVerlof.push(timesheetDay);
		});

		vm.notBillableDays(arrayWithAllTypesVerlof);
		vm.notFullDayWorkedDays(arrayWithAllHalfDays);
		if (aMoment) //testable
			vm.timeSheetDay(aMoment);
		vm.name(getNameFromMailAdress(data.calenderName));
		if (!isInitialized) {
			if (domElement.length) //testable
				ko.applyBindings(vm, domElement[0]);
			isInitialized = true;
		}
		return {
			timesheetDays: vm.timesheetDays(),
			title: vm.title(),
			totalHours: vm.totaal()
		};
	};

	return that;

});