var contract = $("#contractSelect");
var reportExportButton = $("#reportExportButton");

/***************************
	Bootstrap Accordion
 ***************************/
$('.accordion-group')
	.on("show", function() {
		$(this).find('i').removeClass('icon-chevron-right').addClass('icon-chevron-down');
	})
	.on("hide", function() {
		$(this).find('i').removeClass('icon-chevron-down').addClass('icon-chevron-right');
	});

/**********************************
	jQuery HighCharts
 **********************************/
if($('#chart').length > 0) {
	var chart = {
		"defaultOptions": {
			chart: { 
				"renderTo": "chart"
			},

			loading: {
				"labelStyle": { "top": "35%" },
				"style": {  "fontSize": '24px' },
				"showDuration": 1000,
				"hideDuration": 1000
			},

			yAxis: {
				"stackLabels": {
					enabled: false,
					rotation: -90,
					verticalAlign: "top",
					textAlign: "left",
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
					},
					formatter: function() {
						return "$" + Highcharts.numberFormat(this.y)
					}
				}
			},

			plotOptions: {
				"column": {
					dataLabels: {
						"color": (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
						"shadow": true,
						"formatter": function() { return "$" + Highcharts.numberFormat(this.total) }
					}
				}
			},

			tooltip: {
				formatter:
					function() {
						return '<strong><em>Invoice - ' + this.x + '</em></strong><br />' + 
							'<strong>' + this.series.name + '</strong>: '+ Highcharts.numberFormat(this.y, 2, '.', ',');
					}
			},

			debug: true,

			title: { "text": '' },
			credits: false
		}
	};

	chart.chart = new Highcharts.Chart(chart.defaultOptions);
}

$('#contracts').on("change", function() {
	var ajaxURL = $(this).attr("url") + "?format=json";
	var contractID = $(this).val();

	if(contractID > 0) {
		chart.chart.showLoading();
		/**********************************
			Report Exports
		**********************************/
		if(reportExportButton.length > 0) {
			var exportURL = reportExportButton.attr("exportURL").replace(/key/, contractID);

			reportExportButton
				.hide()
				.attr("href", exportURL);
		}

		$.post(ajaxURL, { 
			"contractID": contractID 
		}, function(newChartOptions) {
				generateHighChart(chart, newChartOptions);
			}).complete(function() {
				if(reportExportButton.length > 0 && contractID > 0) {
					reportExportButton.show();
				}
			});
	} else $("#chart").html("");
});

if(contract.length > 0) {
	var invoice = $("#invoiceSelect");
	var form = $("#contractStatusForm");
	var report = $(".reportContainer");
	
	// Contract Select onChange Event
	contract.on("change", function() {
		var contractID = $(this).val();
		var url = $(this).attr("url") + "?format=json";

		if(report.length && invoice.children().length)
			report.empty();

		invoice.empty();

		$.post(url, {
			"contractID": contractID
		}, function(invoices) {
			if(invoices.length > 0) {
				var options = '<option value="0">-- Select Invoice --</option>';

				for(var intInvoice = 0; intInvoice < invoices.length; intInvoice++) {
					options += '<option value="' + invoices[intInvoice].invoiceid + '">' + invoices[intInvoice].invoicenumber + '</option>';
				}

				invoice.append(options)
					.removeAttr("disabled")
					.removeClass("disabled");
			} else {
				if(contractID > 0) {
					var options = '<option value="">-- No Invoices Available --</option>';

					invoice.append(options)
						.attr("disabled", "disabled")
						.addClass("disabled");
				} else {
					invoice.attr("disabled", "disabled")
						.addClass("disabled");
				}
			}
		});
	});

	// Invoice Select onChange Event
	invoice.on("change", function() {
		if($(this).val() > 0)
			contractStatusForm.submit();
	});

	// Window Onload Events
	if(contract.val() == 0)
		invoice.attr("disabled", "disabled");
	else {
		contract
			.trigger("change")
			.ajaxComplete(function() {
				invoice.val(invoice.attr("invoiceID"));
			});
	}
}

$("#contracts").trigger("change");