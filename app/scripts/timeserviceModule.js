define(["knockout","jquery"], function(ko,$) {
	"use strict";
	var that ={};
	var urls={
		customers:"http://timesheetservice.herokuapp.com/customers/all",
		trackedTime:"http://timesheetservice.herokuapp.com/customers/trackedTime"
	};
	//overwrite with localhost values if necessary
	/*urls={
		customers:"http://localhost:3000/customers/all",
		trackedTime:"http://localhost:3000/customers/trackedTime"
	};*/

	that.getCustomersData=function(mail){
		var dfd = new $.Deferred();
		$.get(urls.customers).done(function(response){
			console.log("getCustomersData",response);
			var d=$.map(response,function(r){
				return {id:r._id,text:r.name};
			});
			dfd.resolve(d);
		});
		return dfd;
	};

	that.getTrackedTimeByCustomer=function(mail, maand, jaar, customer){
		var dfd = new $.Deferred();
		var postData = {
               email: mail,
               month: maand,
               year: jaar,
               customer: customer
           };
		$.post(urls.trackedTime, postData).done(function(response){
			
			var d=$.map(response,function(r){
				return {date:new Date(r.date),duration:r.duration};
			});
			console.log("trackedTime for "+customer+ " in month "+maand,d);
			dfd.resolve(d);
		});
		return dfd;
	};

	return that;

});