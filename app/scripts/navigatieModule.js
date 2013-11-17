define(['jquery'], function($) {
	"use strict";
	var that = {};

	that.init = function() {
		$("a.navigator").click(function() {
			var e = $(this);
			$(".navbar li").removeClass("active");
			e.parent().addClass("active");
			$(".container-fluid").addClass("hide");
			$(".navbar .container-fluid").removeClass("hide");
			var linkedContainer = e.attr("href").replace("#", "");
			$("#" + linkedContainer).removeClass("hide");
			return false;
		});
	};

	return that;

});