define(["knockout","moment","utils"], function(ko,moment,utils) {
	"use strict";
	var that={};
	//private
	var days=["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"];	//0 is zondag, 6 is zaterdag
	var handleEventThatDontTakeFullDay=function(event,startDate,endDate, result){
		console.log( "event dat geen ganse dag duurt from "+event.start.dateTime+" till "+event.end.dateTime+" "+event.summary);
		var startHour=startDate.getHours();
		event.isFullDay=false;
		if(startHour<12){
			event.isForenoon=true;
			event.isAfternoon=false;
		}
		else{
			event.isAfternoon=true;
			event.isForenoon=false;
		}
		result.push(event);
	};
	
	//eventmodel 
	var Event=function(d){
		var self=this;
		var formatDate=function(dateObject){
			return days[dateObject.getDay()]+" "+dateObject.getDate()+" "+utils.months[dateObject.getMonth()]+" "+dateObject.getFullYear();
		};

		self.summary=d.summary;
		self.summaryCatMatch=utils.trimAndLowerCase(d.summary);
		self.start=d.start;
		self.end=d.end;
		self.startDate=utils.toDate(self.start);
		self.startDateText=formatDate(self.startDate);
		self.status=d.status;
		self.htmlLink=d.htmlLink;
		self.isWeekend=function(){
			var day=self.startDate.getDay();
			return day===0 || day===6;
		}();
		self.created=new Date(d.created);
		//later aangemaakt dan startdatum OF verlof voor dezelfde maand na 21ste
		self.suspicious= (self.created > self.startDate && self.startDate.getMonth() !== self.created.getMonth())
				|| (self.startDate.getMonth() == self.created.getMonth() && self.created.getDate() > 21);
		self.suspiciousText="Aangemaakt op "+formatDate(self.created);
		self.isFullDay=true;
		self.isForenoon=true;
		self.isAfternoon=true;
	};
	//MAPPER
	that.mapHolidays=function(googleCalendarEventsFromFeestdagenCalendar){
		ko.utils.arrayForEach(googleCalendarEventsFromFeestdagenCalendar, function(holiday) {
			holiday.isRecoverable=holiday.description&& holiday.description==="recoverable";
		});
		return ko.utils.arrayFilter(googleCalendarEventsFromFeestdagenCalendar, function(item) {
            return item.start.date && !item.start.dateTime; //enkel hele dagen
        });
	};
	that.mapEvents=function(googleCalendarEvents, year){
		var eventObjects=[];
		ko.utils.arrayForEach(googleCalendarEvents,function(e){
			var theEvent=new Event(e);
			var i=0;
			var startDateEvent=utils.toDate(e.start);
			var endDateEvent=utils.toDate(e.end);
			//verlof dat over meerdere dagen loopt
			if(e.start.date && e.end.date && e.end.date!==e.start.date ){
				console.log( "sequence from "+e.start.date+" till "+e.end.date+" "+e.summary);
				//als verlof overloopt tussen twee jaren vb 30/12 tot 5/1
				var endDateEventDays=parseInt(moment(endDateEvent).format("YYYY"),10)>year	//als het doorloopt
									? (parseInt(moment(new Date(new Date().getFullYear(),11,31)).format("DDD"),10) +1)	//neem 365 of 366 bij schrikkeljaar
									: parseInt(moment(endDateEvent).format("DDD"),10); //anders neem eindatum dag in jaar
				var daysOfEvent=endDateEventDays-parseInt(moment(startDateEvent).format("DDD"),10);
				if(daysOfEvent>1){ //einddatum van google api ligt 1 dag verder dan je verwacht.
					for( i=0;i<daysOfEvent;i++){
						var startEventDate=utils.toDate(theEvent.start);						
						var newlyCreatedDate=moment(startEventDate).add('days', i);
						var formattedNewlyCreatedDateObject={date:newlyCreatedDate.format("YYYY-MM-DD")};
						var theNewEvent=new Event({	//nieuw object maken
							summary:theEvent.summary,
							end:formattedNewlyCreatedDateObject,
							start:formattedNewlyCreatedDateObject,
							status:theEvent.status,
							htmlLink:theEvent.htmlLink,
							created: theEvent.created
						});
						
						if(!theNewEvent.isWeekend){
							console.log( "    gesplitst in   "+theNewEvent.end.date);
							eventObjects.push(theNewEvent);
						}
					}
				}
				//1 volledage dag nemen of bv bij verlof nemen op 31ste december 
				else if (daysOfEvent===1 || daysOfEvent===0) {
					if(!theEvent.isWeekend){
						eventObjects.push(theEvent);
					}
				}
			}
			else{	//indien geen hele dag. bv events als bITe dinner - halve dag verlof
				handleEventThatDontTakeFullDay(theEvent,startDateEvent,endDateEvent,eventObjects);
			}
		});
		eventObjects.sort(function(a, b){
			var a1= a.startDate, b1= b.startDate;
			if(a1== b1) return 0;
			return a1> b1? 1: -1;
		});

		return eventObjects;	
	};	
	
	function capitaliseFirstLetter(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	that.mapSettings=function(settings,calId,year){
		var cats=[];
		ko.utils.arrayForEach(settings || [],function(s){
			if(calId === s.employee && parseInt(s.year,10)===year){
				$.each(s,function(key,value){
					var theParsedNumber=value.replace ? parseFloat(value.replace(",",".")) : 0;
					if( ! (key==="employee" || key==="year" || key==="rowNumber" || theParsedNumber===0 || isNaN(theParsedNumber) )){
						var n=key.split("-");
						var theString="";
						var index=0;
						
						ko.utils.arrayForEach(n,function(categoryPart){
							var space="";
							categoryPart=capitaliseFirstLetter(categoryPart);
							if(index===1){
								categoryPart=categoryPart.toUpperCase();
								space=" ";
							}
							theString=theString+space+categoryPart;
							index++;
						});
						cats.push({name:theString,number:theParsedNumber});
					}
				});
			}
		});
		return cats;
	
	};
	//recoverable stuff
	that.mapHolidaysToSetting=function(holidays){
		var recoverableHolidaysCount = ko.utils.arrayFilter(holidays, function (hol) {
			return hol.isRecoverable;
		}).length;
		if(recoverableHolidaysCount>0)
			return [{name:"Verlof VF",number:recoverableHolidaysCount}];
		return [];
	};
	
	return that;
});