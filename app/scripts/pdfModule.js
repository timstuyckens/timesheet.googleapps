define(['jquery', 'jspdfFormHtml'], function($, jspdf) {
	"use strict";
	var that = {};

	var tableWidth, rowHeight, left, top, lineMargin, margeBetweenDetailTables, margeBetweenSummaryAndDetail;
	var fontsizeNormal = 11,
		fontsizeTitel = 16;
	//jspdf api
	//RECT:x, y, w, h, style
	//LINE: (x1, y1, x2, y2) {
	//TEXT doc.text(20, 20, 'Hello landscape world!');
	var initPixel = function() {
		tableWidth = 185;
		rowHeight = 8;
		left = 15;
		top = 20;
		lineMargin = 3;
		margeBetweenDetailTables = 10;
		margeBetweenSummaryAndDetail = 20;
	};
	var createTitleAboveTable = function(pdf, x, y, text) {
		pdf.setFontSize(fontsizeTitel);
		pdf.text(x + 3 * lineMargin, y - 5, text);
		pdf.setFontSize(fontsizeNormal);
	};
	var createSummary = function(pdf, data) {
		createTitleAboveTable(pdf, left, top, "Kort");
		pdf.rect(left, top, tableWidth, rowHeight);
		var headers = ["Type", "Aantal", "Opgenomen", "Gepland", "Resterend"];
		var columnWidth = tableWidth / headers.length;
		var firstLineX1 = left + tableWidth / headers.length;
		var firstLineY2 = top + (data.categoryOverviews.length + 1) * rowHeight;
		var headerLeft = left;
		var headerTop = top;
		pdf.setFontType("bold");
		$.each(headers, function(i, e) {
			pdf.text(headerLeft + lineMargin, headerTop + lineMargin * 2, e);
			headerLeft += columnWidth;
			pdf.line(firstLineX1 + i * columnWidth, top, firstLineX1 + i * columnWidth, firstLineY2);
		});
		pdf.setFontType("normal");
		$.each(data.categoryOverviews, function(i, e) {
			top += rowHeight;
			headerLeft = left;
			$.each(["name", "max", "aantalOpgenomen", "aantalGepland", "remaining"], function(j, d) {
				pdf.text(headerLeft + lineMargin + j * columnWidth, top + lineMargin * 2, (e[d]) + "");
			});
			pdf.rect(left, top, tableWidth, rowHeight);
		});
	};

	var createDetail = function(pdf, data) {
		var detailPastTableWidth = (tableWidth - margeBetweenDetailTables) / 2;
		var headers = [" ", " "]; //layout cheat: "4" columns (eerste is dubbel zo breed als andere), visueel 3 columns
		$.each(data.categoryOverviews, function(i, e) {
			headers.push(e.name);
		});
		var detailTop = top + margeBetweenSummaryAndDetail + rowHeight;

		$.each(data.eventsGrouped, function(index, grouped) {
			left += index * (detailPastTableWidth + margeBetweenDetailTables);
			createTitleAboveTable(pdf, left, detailTop, grouped.name);
			var columnWidth = detailPastTableWidth / headers.length;
			var firstLineX1 = left + detailPastTableWidth / headers.length;
			var firstLineY2 = detailTop + (grouped.items.length + 1) * rowHeight;
			var headerLeft = left;
			var headerTop = detailTop;
			pdf.rect(left, detailTop, detailPastTableWidth, (grouped.items.length + 1) * rowHeight);
			pdf.setFontType("bold");
			$.each(headers, function(i, e) {
				pdf.text(headerLeft + lineMargin, headerTop + lineMargin * 2, e);
				headerLeft += columnWidth;
				if (i > 0) //eerste kolom dubbel zo breed als de twee andere, geen lijn tonen
					pdf.line(firstLineX1 + i * columnWidth, detailTop, firstLineX1 + i * columnWidth, firstLineY2);
			});
			pdf.line(left, headerTop + rowHeight, left + headers.length * columnWidth, headerTop + rowHeight);

			pdf.setFontType("normal");
			headerLeft = left;
			headerTop = detailTop + rowHeight;
			$.each(grouped.items, function(i, e) {
				var eventLeft = headerLeft;
				var eventTop = headerTop + lineMargin * 2;
				pdf.text(eventLeft + lineMargin, eventTop, e.startDateText);


				$.each(data.categoryOverviews, function(catIndex, cat) {
					eventLeft += columnWidth;
					var theText = cat.name === e.summaryCatMatch ? "x" : " ";
					pdf.text(eventLeft + lineMargin, eventTop, theText);
				});


				headerTop += rowHeight;
			});
		});


	};

	that.create = function(data) {
		try {
			var pdf = new jsPDF();
			pdf.setFontSize(fontsizeNormal);
			initPixel();
			createSummary(pdf, data);
			createDetail(pdf, data);

			//pdf.save('Vakantie.pdf');	
			pdf.output('dataurl', 'Vakantie.pdf'); //dataurl,dataurlstring
		} catch (e) {
			console.log(e);
		}
	};

	return that;
});