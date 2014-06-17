
require.config({
  shim: {
    Tabletop:{
		exports:"Tabletop"
	},
	jspdf:{
		deps:["jquery"],
		exports:"jspdf"
	},
	jspdfFileSaver:{
		deps:["jspdf"],
		exports:"jspdfFileSaver"
	},
	jspdfBlobBuilder:{
		deps:["jspdf"],
		exports:"jspdfBlobBuilder"
	},
	jspdfStandardFontsMetrics:{
		deps:["jspdf"],
		exports:"jspdfStandardFontsMetrics"
	},
	jspdfSplitTextToSize:{
		deps:["jspdf"],
		exports:"jspdfSplitTextToSize"	
	},
	jspdfAddImage:{
		deps:["jspdf"],
		exports:"jspdfAddImage"		
	},
	jspdfFormHtml:{
		deps:["jspdf","jspdfBlobBuilder","jspdfFileSaver","jspdfStandardFontsMetrics","jspdfSplitTextToSize","jspdfAddImage"],
		exports:"jspdfFormHtml"
	}
	},

  paths: {
    async: '../bower_components/requirejs-plugins/src/async',
    jquery: '../bower_components/jquery/dist/jquery.min',
	knockout:'../bower_components/knockout/dist/knockout',
	moment:'../bower_components/moment/min/moment.min',
	jspdf:'../bower_components/jspdf/dist/jspdf',
	jspdfFileSaver:'vendor/FileSaver/FileSaver',
	jspdfBlobBuilder:'vendor/BlobBuilder/BlobBuilder',
	jspdfStandardFontsMetrics:'vendor/jspdf.plugin.standard_fonts_metrics',
	jspdfFormHtml:'vendor/jspdf.plugin.from_html',	
	jspdfSplitTextToSize:"vendor/jspdf.plugin.split_text_to_size",
	jspdfAddImage:"vendor/jspdf.plugin.addimage",
	Tabletop:"../bower_components/tabletop/src/tabletop"
  }
});
 
require(['ViewModel','gcalModule','knockout','jquery','navigatieModule','CalendarViewModel','SettingsViewModel','mapperModule','gdocsModule'], 
		function(ViewModel,GCalModule,ko,$,navigatieModule,CalendarViewModel,SettingsViewModel,mapper,gdocsModule) {
	"use strict";
	var settingsViewModel=new SettingsViewModel();
	var vm=new ViewModel();
	var calViewModel=new CalendarViewModel();
	var gcalModule=new GCalModule(vm);
	vm.categories(settingsViewModel.categories());
	settingsViewModel.changed.subscribe(function(){
		vm.categories(settingsViewModel.categories());
	});
	vm.holidays.subscribe(function(hol){
		settingsViewModel.holidays(hol);
	});

	var showTimeSheetForSelectedCalendar=function(){
		require(["timesheetModule"],function(timesheetModule){
			var vmToJs=ko.toJS(vm);
			vmToJs.calenderName=calViewModel.calendarId();
			timesheetModule.show(vmToJs);							
		});	
	};
	vm.refresh=function(){
		var calId=calViewModel.calendarId();
		var holidayCalId=calViewModel.holidayCalId();
		vm.events([]);
		var year=vm.year();
		$.when(gcalModule.getEventsItems(calId,year),gcalModule.getEventsItems(holidayCalId,year),gdocsModule.getSettings())
			.done(function(events,holidays,settings){
				//console.time && console.time("refresh");
				vm.holidays(mapper.mapHolidays(holidays));
				vm.events(mapper.mapEvents(events, year));
				settingsViewModel.clearCategories();
				settingsViewModel.addCategories(mapper.mapHolidaysToSetting(vm.holidays()));
				settingsViewModel.addCategories(mapper.mapSettings(settings,calId,year));
				settingsViewModel.changed(!settingsViewModel.changed());
				showTimeSheetForSelectedCalendar();				
				//console.timeEnd && console.timeEnd("refresh");
			});	
	};
	var lastFetchedYear=(new Date()).getFullYear();
	vm.year.subscribe(function(theNewYear){
		if(theNewYear!==lastFetchedYear){
			vm.refresh();
			lastFetchedYear=theNewYear;
		}		
	});
	function doAuthorizedWork(){
		vm.authorized(true);
		$.when(gcalModule.getUserInfo(),gcalModule.getCalendarList())
			.done(function(userInfo,cals){
				calViewModel.setUser(userInfo);
				calViewModel.addCalendars(cals);
			});
	}
	function handleClientLoad() {
		gcalModule.authorize()
			.done(doAuthorizedWork)
			.always(function(){
				vm.loading(false);
			});
	}
	
	$(document).ready(function() {
		navigatieModule.init();
		vm.authorized.subscribe(function(newVal){
			calViewModel.authorized(newVal);
		});
		ko.applyBindings(vm,$("#mainContainer")[0]);
		ko.applyBindings(calViewModel,$("header")[0]);
		

		$("#getEventsButton").click(function(){
			vm.refresh();
			return false;
		});
		calViewModel.calendarId.subscribe(function(newCalId){
			if(newCalId && newCalId.indexOf("bite")!==-1){
				vm.refresh();
			}
		});
		$("#authorize-button").click(function(){
			gcalModule.authorizeNotImmediate()
				.done(doAuthorizedWork)
				.fail(function(){
					alert("Failed to authenticate");
				});	
		});
		$("#getPdfButton").click(function(){	
			require(["pdfModule"],function(pdfModule){
				var vmToJs=ko.toJS(vm);
				pdfModule.create(vmToJs);							
			});	
			return false;
		});
		
		$("#settingsLink").click(function(){	
			require(["settingsModule"],function(settingsModule){
				settingsModule.init(settingsViewModel);							
			});	
			return false;
		});			
		$("#timesheetLink").click(function(){	
			showTimeSheetForSelectedCalendar();
			return false;
		});		
		handleClientLoad();
	});

});

