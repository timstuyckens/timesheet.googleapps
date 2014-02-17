define(["knockout"], function(ko) {
	"use strict";
	
	var trimAndLowerCase=function(s){
		if(!s)
			return "";
		return $.trim(s.toLowerCase());
	};
	var Category=function(name,number,parent){
		var self=this;
		
		self.name=ko.observable(name||"");
		self.number=ko.observable(parseFloat(number,10)||0).extend({ throttle: 50 });
		self.summaryCatMatch=ko.computed(function(){
			return trimAndLowerCase(self.name());
		});
		self.name.subscribe(function(){
			parent.changed(!parent.changed());
		});
		self.number.subscribe(function(){
			parent.changed(!parent.changed());
		});	
	};
	return function(){
		var self=this;
		self.changed=ko.observable(true);
		self.categories=ko.observableArray([new Category("verlof CR",12,self),new Category("verlof",20,self)]);
		self.holidays=ko.observableArray([]);
		self.addCategories=function(arrayWithObjectThatHasNameAndNumberField){
			ko.utils.arrayForEach(arrayWithObjectThatHasNameAndNumberField,function(s){
				self.categories.push(new Category(s.name,s.number,self));
			});
		};
		self.clearCategories=function(){
			self.categories([]);
		};
	};

});