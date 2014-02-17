define(["knockout",'moment'], function(ko,moment) {
	"use strict";
	var Calendar=function(d){
		var self=this;
		
		self.name=d.summary;
		self.id=d.id;
	};
	var User=function(d){
		var self=this;
		
		self.id=d.id||"";
		self.email=d.email||"";
		self.name=d.name||"";
		self.link=d.link||"";
		self.firstName=d.given_name || "";
		self.lastName=d.family_name||"";
	};
	
	//VIEWMODEL
	return function (){
		var self=this;
		self.setUser=function(d){
			self.user(new User(d));
		};
		self.authorized=ko.observable(false);
		self.user=ko.observable(new User({}));
		self.calendarId=ko.observable("");
		self.holidayCalId=ko.observable("");
		self.calendars=ko.observableArray([]);
		self.addCalendars=function(cals){
			var userLastNameToLower=self.user().lastName.toLowerCase();
			var userFirstNameToLower=self.user().firstName.toLowerCase();
			var calObjects=[];
			var biteCalenderId="";
			ko.utils.arrayForEach(cals,function(e){
				var cal=new Calendar(e);
				calObjects.push(cal);
				if(cal.name.indexOf("bite.be") !==-1 && cal.name.toLowerCase().indexOf(userFirstNameToLower)!==-1){
					biteCalenderId=cal.id;
				}
				if(cal.name.indexOf("Feestdagen") !==-1){
					self.holidayCalId(cal.id);
				}
			});
			self.calendars(calObjects);		
			self.calendarId(biteCalenderId);			
		};
	};

});