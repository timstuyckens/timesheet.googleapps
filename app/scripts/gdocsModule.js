define(['jquery', 'Tabletop'], function($, Tabletop) {
	"use strict";


	var googleDocsModule = {};

	googleDocsModule.getSettings = function() {
		var dfd = new jQuery.Deferred();
		Tabletop.init({
			key: '0AvcWF88lFRWVdEpxaGlSZ01LbXhUU3Vxbk53MDJvUkE', //werkt
			//key: '0AjEAUDURKVShdEtBZFJYVU4wY1JMSERyVURRdERMRmc',	//werkt niet, moet iets met apps account te maken hebben
			callback: function(data) {
				dfd.resolve(data);
			},
			simpleSheet: true
		});
		return dfd;
	};

	return googleDocsModule;


});