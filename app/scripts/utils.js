define(['jquery'], function($) {
	var that = {};
	that.months = ["Jan", "Feb", "Maart", "Apr", "Mei", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	that.toDate = function(input) {
		if (input.date) {
			var year = parseInt(input.date.substring(0, 4), 10);
			var month = parseInt(input.date.substring(5, 7), 10) - 1;
			var day = parseInt(input.date.substring(8, 10), 10);
			return new Date(year, month, day);
		}
		if (input.dateTime){
			return new Date(input.dateTime);
		}	
		throw "Unable to convert input to a date " + input;
	};
	that.trimAndLowerCase = function(s) {
		if (!s){
			return "";
		}
		return $.trim(s.toLowerCase());
	};
	return that;
});