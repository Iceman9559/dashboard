var spinner = {};
var invoiceTotal = 0.00;
var tmpTotal = 0.00;

var currentRow = 1;

$.fx.speeds._default = 1000;

/*******************************************************************
 * 	Calculate Subtotals
 *******************************************************************/
function calculateRateCosts(tr, filter, baseCost, overrideDefault) {
	var tmpRate = 0.00, tmpSplitCost = 0.00;
	var tr = tr.filter(filter);

	tr.each(function() {
		tmpRate += parseFloat($(this).find("td.rate").attr("rate"));

		if($(this).hasClass("splitItem")) {
			tmpSplitCost += parseFloat($(this).find("td.cost").attr("cost"));
		}
	});

	tmpCost = (baseCost * tmpRate) - tmpSplitCost;

	tmpCost = Math.round(tmpCost * 100) / 100;
	tmpTotal += tmpCost;

	var tr = tr.filter("tr:not(.splitItem)");

	tr.find("td.cost").html('$' + insertDelimiter(tmpCost.toFixed(2)));
	tr.find("input.cost").val(tmpCost.toFixed(2));

	return (tmpCost + tmpSplitCost);
}

$(function() {
	/*******************************************************************
	 * 	Add New Row (Labor Detail, Indirect Costs, Direct Costs)
	 *******************************************************************/
	$('body').delegate("#addRow", 'click', function() {
		var $row = $('#' + $(this).attr('row_map'));	//grabs id selector for table to append additional rows to
		var $rowSrc = $(this).attr('row_src');
		currentRow++;									//current keeps track of how many people we have

		$rowSrc = $rowSrc.replace(/(\[lt\]input)/g, '$1 value="0.00"').replace(/\[current\]/g, currentRow).replace(/\[lt\]/g, "<").replace(/\[gt\]/g, ">");
		$row.before($rowSrc);
	});


	$('body').on('change', 'input.laborCosts, input.laborHours', function() {
		//----------------------------------------------------------------
		// Labor Costs ---------------------------------------------------
		//----------------------------------------------------------------
		var laborTR = $('.' + $(this).attr('map_class'));
		var laborTotalTD = $('#' + $(this).attr('map_subtotal'));
		var laborTotal = 0.00;
			invoiceTotal = 0.00;

		laborTR.each(function() {
			laborTotal += parseFloat($(this).val().replace(/\$|\,/g, ''));
		});

		if($(this).attr('map_class') == 'laborCosts_Subtotals')
			laborTotalTD.html('$' + insertDelimiter(laborTotal.toFixed(2)));
		else laborTotalTD.html(insertDelimiter(laborTotal.toFixed(2)));

		invoiceTotal += parseFloat(laborTotal);

		// Only updates the cost totals if the labor hours input is changed
		if($(this).hasClass('laborCosts')) {
			//----------------------------------------------------------------
			// Indirect Costs ------------------------------------------------
			//----------------------------------------------------------------
			var indirectTR = $('tr.indirectCostRow');
			var indirectTotalTD = $('#indirectTotalRow td.cost');

			var tmpRate = 0.00, tmpCost = 0.00, tmpSplitCost = 0.00, tmpTotal = 0.00, tmpAdjustment = 0.00;

			indirectTotalTD.html(0.00);
			tmpCost = laborTotal;

			// 1 = Fringe Benefits, 2 = Overhead, 3 = General & Administrative, 4 = Contract Fee
			for(intCostID = 1; intCostID <= 4; intCostID++) {
				tmpClass = ".costID_" + intCostID;
				tmpCost += calculateRateCosts(indirectTR, tmpClass, tmpCost);
			}

			tmpTotal = tmpCost - laborTotal;
			invoiceTotal += tmpTotal;

			indirectTotalTD.html('$' + insertDelimiter(tmpTotal));

			//----------------------------------------------------------------
			// Subcontractor Costs -------------------------------------------
			//----------------------------------------------------------------
			if($('#subcontractorTotalRow td.cost').length > 0) {
				var subcontractorTotal = $('#subcontractorTotalRow td.cost').html();
				subcontractorTotal = parseFloat(subcontractorTotal.substring(0, subcontractorTotal.length).replace(/[$,]/g, ""));

				invoiceTotal += subcontractorTotal;
			}

			//----------------------------------------------------------------
			// Direct Costs --------------------------------------------------
			//----------------------------------------------------------------
			if($('#directTotalRow td.cost').length > 0) {
				var directTotalTD = $('#directTotalRow td.cost');
				var odcTypes = ["employee", "subcontractor"];
				var ODCTypeTotal = "";
					tmpTotal = 0.00;

				directTotalTD.html(0.00);

				// Employee/Subcontractor ODC Costs
				for(var intODCType in odcTypes) {
					baseCost = parseFloat($('#directTotalRow-1 td.cost').attr(odcTypes[intODCType] + 'cost'));
					tmpCost = baseCost;
					directTR = $('tr.directCostRow.' + odcTypes[intODCType]);

					tmpCost += calculateRateCosts(directTR, ".GA", tmpCost);
					tmpCost += calculateRateCosts(directTR, ":not(.GA)", tmpCost);

					tmpTotal += tmpCost - baseCost;

					directTotalTD.html('$' + insertDelimiter(tmpTotal));

					// Combined Direct Costs Total (Subcontractor + Employee)
					invoiceTotal += baseCost;
				}

				// ODC Total Cost
				invoiceTotal += tmpTotal;
			}
			
			//----------------------------------------------------------------
			// Invoice Total -------------------------------------------------
			//----------------------------------------------------------------
			if($('#invoiceTotalRow td.cost').length > 0) {
				var invoiceTotalTD = $('#invoiceTotalRow td.cost');

				invoiceTotalTD
					.attr("cost", parseFloat(invoiceTotal))
					.html('$' + insertDelimiter(parseFloat(invoiceTotal).toFixed(2)));
			}
		}
	});
});