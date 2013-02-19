/*******************************************************************
		Global Variables
 *******************************************************************/
var modal = {};
var intNew = 0;
var isRate = false,
	isDollar = false,
	isDecimal = false;

/*******************************************************************
		Global Functions
 *******************************************************************/
// Focus In ---> Select All
function highlightInput() {
	if($(this).attr('selected') == false || typeof($(this).attr('selected')) == 'undefined') {
		$(this).attr('selected', true);
		this.select();this.focus();
	}
}

// Currency Delimiter
function insertDelimiter(delta) {
	//delta = delta.toString().replace(/[\$,.]/g, "");
	delta = parseFloat(delta).toFixed(2);

	deltaSplit = delta.split('.');
	deltaDollars = deltaSplit[0];
	deltaDecimal = deltaSplit.length > 1 ? '.' + deltaSplit[1] : '';
	var regExCheck = /(\d+)(\d{3})/;
	while (regExCheck.test(deltaDollars)) {
		deltaDollars = deltaDollars.replace(regExCheck, '$1' + ',' + '$2');
	}

	return deltaDollars + deltaDecimal;
}	

// Numeric Imputs
function isNumeric(event) {
	var charCode = (navigator.appName == "Netscape" ? event.which : event.keyCode)
	var allowDecimal = true;

	if (allowDecimal && charCode == 46)
		return true;
	else if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 8)
		return false;
	else return true;
}

// Tooltip Init() - Use When AJAX is Loaded that Contains "twipsy" Class Attributes
function initTooltip() {
	var tooltips = $('.twipsy');

	if(tooltips.length) {
		tooltips.each(function() {
			$(this).tooltip({
				placement: ($(this).attr("gravity") !== undefined) ? $(this).attr("gravity") : "right",
				animation: true
			});
		});
	}
}

// Modal/Dialog - Open
function openDialog() {
	var ajaxURL = $(this).attr("url");
		dialogTitle = modal.find(".modal-header h3"),
		dialogContent = modal.find(".modal-body p"),
		dialogFooter = modal.find(".modal-footer"),
		dialogButtons = {
			"1": dialogFooter.find("#primaryButton"),
			"2": dialogFooter.find("#secondaryButton")
		};

	$.post(ajaxURL, function(html) {
		dialogTitle.html("Invoice Detail");
		dialogContent.html(html);
		dialogFooter.css("text-align", "center");
		dialogButtons["1"].hide();

		modal.width("75%").modal("show");
	});
	
	return false;
}

// Generate HighChart - Pass in Chart Container Object AND HighChart Settings
function generateHighChart($chart, options) {
	var chartOptions = {};

	// When Coldfusion serializes a struct to JSON, it converts numeric data types to strings. This loop converts it back to
	// a numeric type so the HighCharts JS API can process the JSON correctly.
	options = JSON.parse(JSON.stringify(options).replace(/\"\/|\/\"/g, ""));

	// Dual Axis Options
	if(Object.prototype.toString.call(options.yAxis) === '[object Array]') {
		// Primary yAxis
		options.yAxis[0].labels.formatter = function() {
			return '$' + Highcharts.numberFormat(this.value);
		};

		// Secondary yAxis
		options.yAxis[1].labels.formatter = function() {
			return '$' + Highcharts.numberFormat(this.value);
		}
	}

	chartOptions = $.extend(true, {}, chartOptions, $chart.defaultOptions, options);

	if($.browser.mozilla)
		console.log(JSON.stringify(chartOptions));

	$chart.chart.destroy();
	$chart.chart = new Highcharts.Chart(chartOptions);
}

// Disable Text Selection
(function($){
	$.fn.disableSelection = function() {
		return this.each(function() {
			$(this).attr('unselectable', 'on')
				.css({
					'-ms-user-select':'none',
					'-moz-user-select':'none',
					'-webkit-user-select':'none',
					'user-select':'none'
				}).each(function() {
					this.onselectstart = function() { return false; };
				});
		});
	};

	/*******************************************************************
		jQuery DataTable Defaults
 	*******************************************************************/
	$.extend($.fn.dataTable.ext.oJUIClasses, {
		sSortJUIAsc : 'icon icon-chevron-up pull-right',
		sSortJUIDesc : 'icon icon-chevron-down pull-right',
		sSortJUI: 'icon icon-chevron-down pull-right',
		sSortJUIAscAllowed : 'icon icon-chevron-up pull-right',
		sSortJUIDescAllowed : 'icon icon-chevron-down pull-right',
		sSortableNone : 'icon sort-none'
	});
})(jQuery);

$(function() {
	var forms = $('form.validateForm');
		modal = $("#dialog");

	// Bootstrap Tooltips Init() - onLoad()
	initTooltip();
	
	// ValidationEngine Init() - <form class"valiateForm"> Objects
	if(forms.length) {
		forms.validationEngine({ promptPosition : "bottomLeft" });
	}

	// Add Button - Click()
	$("body").on("click", "a.addButton", function() {
		var table = $($(this).attr("table")).find("tbody");
		var tr = $("table.hidden tr").clone();
		var doIncrement = false;

		intNew++;

		tr = tr.html(tr.html().toString().replace(/\[id\+\+\]/g, intNew + 1));
		tr = tr.html(tr.html().toString().replace(/\[id\]/g, intNew));

		table.append(tr);
	});

	$("#container").on("ajaxComplete", function() {
		initTipsy();
	});

	// Edit Button - Click()
	$("body").on("click", "a.editButton", function() {
		if($(this).attr("isToggled") == undefined) {
			var tr = $(this).parent().parent();
			var addWith = $($(this).attr("addWith")).children().clone();
			var id = $(this).attr("id");

			addWith.each(function() {
				var element = $(this);
					element.attr("name", element.attr("name").toString().replace(/\[id\]/g, id));
					element.attr("id", element.attr("id").toString().replace(/\[id\]/g, id));

				var addTo = tr.find("td:eq(" + element.attr("index") + ")");
				var value = parseFloat(addTo.html().toString().replace(/\$|\,|\%/g, ""));
					addTo.empty().append(element.attr("value", value));
			})

			$(this).attr("isToggled", "true");
		}
	});

	// Bootstrap Tooltips Init() - ajaxComplete()
	$("#container").on("ajaxComplete", function() {
		initTipsy();
	});

	// Bootstrap Modal/Dialog - Center Vertically/Horizontally Upon Opening
	modal.on("show", function() {
		modal.css({
			"position": "absolute",
			"margin": 0,
			"left": ($(window).width() - modal.width()) / 2,
			"top": $(window).scrollTop() + ($(window).height() * .1)
		});
	});

	// Bootstrap Modal/Dialog - Open Trigger
	$("body").on("click", ".dialog", openDialog);

	// Bootstrap Tabs Init()
	$('#dashboardCharts').tab();

	// Event Delegation Between <a> Links and AJAX Links
	$("body").on("mouseover", "a.exportLink", function() {
		$("body").off("click", ".dialog", openDialog);
	}).on("mouseout", "a.exportLink", function() {
		$("body").on("click", ".dialog", openDialog);
	});

	// Bootstrap DatePicker Init() 
	$(".date").datepicker();

	$(".dataTable").ajaxComplete(function() {
		$("th:not('.sort-none') .DataTables_sort_wrapper").each(function() {
			$(this).children(":not('br')").remove();
			$(this).append(
				'<span class="sortIconWrapper pull-right">' +
					'<div class="DataTables_sort_icon icon icon-chevron-up"></div>' +
					'<div class="DataTables_sort_icon icon icon-chevron-down"></div>' +
				'</span>'
			);
		})
	});

	// B3T4 NumberFormatter Init() 
 	$("body").on("focusin", "input.numeric", function() {
 		var element = $(this),
 			value = element.val().toString();
 			isRate = (value.indexOf("%") > -1);
 			isDollar = (value.indexOf("$") > -1 || element.hasClass("currency"));
 			isDecimal = (value.indexOf(".") > -1 || element.hasClass("currency"));

 			value = value.toString().replace(/\$|\%|\,/g, "");
 			element.val(value);
 	}).on("focusout", "input.numeric", function() {
 		var element = $(this),
 			value = element.val();

 		if(isRate) {
 			if(isDecimal)
 				value = parseFloat(value).toFixed(4);
 			element.val(value + "%");
 		}

 		if(isDollar) {
 			if(isDecimal)
 				value = parseFloat(value).toFixed(2);
 			element.val("$" + insertDelimiter(value));
 		}

 		if(!isRate && !isDollar && isDecimal) 
 			element.val(parseFloat(value).toFixed(4));

 		element.attr('selected', false);
 	})
 	.on("click", "input.numeric", highlightInput)
 	.on("keypress", "input.numeric", isNumeric);
});