/*global describe, it */
define(function(require) {
	"use strict";
	var timesheetModule = require('timesheetModule');
	var moment=require('moment');
	
	var testData={
		"calenderName":"tim.stuyckens@bite.be",
		"categories":[
			{"name":"verlof CR","number":12,"summaryCatMatch":"verlof cr"},
			{"name":"verlof","number":20,"summaryCatMatch":"verlof"}
		],
		"holidays":[
			{	
				"kind":"calendar#event",
				"id":"v8s",
				"status":"confirmed",
				"htmlLink":"ht",
				"created":"2013-08-11T09:16:27.000Z",
				"updated":"2013-08-19T19:41:45.392Z",
				"summary":"Onze lieve vrouw hemelvaart",
				"description":"recoverable",
				"creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},
				"organizer":{
					"email":"bite.be_@group.calendar.google.com",
					"displayName":"Feestdagen",
					"self":true
				},
				"start":{"date":"2013-08-15"},"end":{"date":"2013-08-16"},
				"transparency":"transparent",
				"iCalUID":"tj1b118n1sk36qltt829mchv8s@google.com",
				"sequence":0,
				"reminders":{"useDefault":true},
				"isRecoverable":true
			}
		],
		"eventsGrouped":[
			{	
				"name":"Detail voorbijgaande",
				"items":[
					{	//ganse dag verlof 
						"summary":"Verlof",
						"summaryCatMatch":"verlof",
						"start":{"date":"2013-08-16"},
						"end":{"date":"2013-08-17"},
						"startDate":"2013-08-15T22:00:00.000Z",
						"startDateText":"vrijdag 16 Aug 2013",
						"status":"confirmed",
						"htmlLink":"",
						"isWeekend":false,
						"isFullDay":true,
						"isForenoon":true,
						"isAfternoon":true
					}
				]
			},
			{
				"name":"Detail toekomst",
				"items":[
					{	//halve dag
						"summary":"Verlof",
						"summaryCatMatch":"verlof",
						"start":{"dateTime":"2013-08-28T08:00:00+02:00"},
						"end":{"dateTime":"2013-08-28T12:00:00+02:00"},
						"startDate":"2013-08-28T06:00:00.000Z",
						"startDateText":"woensdag 28 Aug 2013",
						"status":"confirmed",
						"htmlLink":"G0",
						"isWeekend":false,
						"isFullDay":false,
						"isForenoon":true,
						"isAfternoon":false
					}
				]
			}
		]
	};
	
	describe('timesheetModule - Augustus 2013 ', function() {
		
		var result=timesheetModule.show(testData,moment("Aug 25, 2013"));
		var timesheetDays=result.timesheetDays;

		describe('Title', function() {
			var title=result.title;
			it('should should be equal to naam + month', function() {
				title.should.equal("Tim Stuyckens - Augustus");
			});					
		});	

		describe('Total Hours', function() {
			var totalHours=result.totalHours;
			it('should should be equal to 19*8+4 (alle dagen buiten 15de en 16de en 28ste was halve dag)', function() {
				totalHours.should.equal(156);
			});					
		});	
		
		describe('Normal work day - vb 1 aug', function() {
			var normalDay=$.grep(timesheetDays,function(res){
				return res.date==="01/08/2013";
			})[0];
			it('should not contain a comment', function() {
				normalDay.comment.should.equal("");
			});				
			it('should have 8 worked hours', function() {
				normalDay.hours.should.equal(8);
			});		
		});	
		describe('Holiday - 15 aug', function() {
			var normalDay=$.grep(timesheetDays,function(res){
				return res.date==="15/08/2013";
			})[0];
			it('should contain a comment with holiday name', function() {
				normalDay.comment.should.equal("Onze lieve vrouw hemelvaart");
			});				
			it('should have 0 worked hours', function() {
				normalDay.hours.should.equal(0);
			});			
		});	
		describe('Verlof', function() {
			var normalDay=$.grep(timesheetDays,function(res){
				return res.date==="16/08/2013";
			})[0];
			it('should contain a comment ', function() {
				normalDay.comment.should.equal("verlof");
			});				
			it('should have 0 worked hours', function() {
				normalDay.hours.should.equal(0);
			});			
		});	
		describe('Weekend', function() {
			var normalDay=$.grep(timesheetDays,function(res){
				return res.date==="17/08/2013";
			})[0];
			it('should not contain a comment ', function() {
				normalDay.comment.should.equal("");
			});				
			it('should have 0 worked hours', function() {
				normalDay.hours.should.equal(0);
			});			
		});	
		describe('Halve dag', function() {
			var normalDay=$.grep(timesheetDays,function(res){
				return res.date==="28/08/2013";
			})[0];
			it('should contain a comment ', function() {
				normalDay.comment.should.equal("Halve dag");
			});				
			it('should have 4 worked hours', function() {
				normalDay.hours.should.equal(4);
			});			
		});			
	});
});