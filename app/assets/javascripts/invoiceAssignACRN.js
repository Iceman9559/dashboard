var acrnID = 0;
var acrnCode = "";
var acrnFunding = 0.00;
var acrnBalance = 0.00;

var splitLink = '<span><a href="javascript:;" class="split">Split</a></span>';
var deleteLink = '<span><a href="javascript:;" onclick="$(this).parent().parent().parent().remove();" class="delete">Delete</a></span>';

var isSplitCase = false;
var isAcrnEmpty = false;

var remainingFunding = 0.00;


// ********************************************************************************
// ********************************************************************************
// Calculate totals and set display
// ********************************************************************************
// ********************************************************************************
function getInvoiceTotal(acrnCode) {
	var invoice = {
		"laborTotal": 0.00,
		"subcontractorTotal": 0.00,
		"indirectTotal": 0.00,
		"directTotal": 0.00,
		"otherDirect": 0.00,
		"total": 0.00
	};

	$("tr.laborRow input:checked").filter(":visible").each(function() {
		invoice.laborTotal +=  parseFloat($(this).attr('cost'));
	});

	$("tr.subcontractorRow input:checked").filter(":visible").each(function(){
		invoice.subcontractorTotal += parseFloat($(this).attr('cost'));
	});

	$("tr.indirectRow input:checked").filter(":visible").each(function(){
		invoice.indirectTotal += parseFloat($(this).attr('cost'));
	});

	$("tr.directRow input:checked").filter(":visible").each(function(){
		invoice.directTotal += parseFloat($(this).attr('cost'));
	});

	$("tr.otherDirectRow input:checked").filter(":visible").each(function(){
		invoice.otherDirect += parseFloat($(this).attr('cost'));
	});

	invoiceCostTotal = invoice.laborTotal + invoice.subcontractorTotal + invoice.indirectTotal + invoice.directTotal + invoice.otherDirect;

	// needs to happen AFTER figuring out new totals
	acrnBalance = acrnFunding - invoiceCostTotal;
	invoice.total += (invoiceCostTotal);

	if (acrnBalance < 0)
		isSplitCase = true;
	if (acrnBalance == 0)
		isAcrnEmpty = true;

	// this is for when a split or empty happens and the user clicks cancel, to prevent dialog from appearing every click after
	if (acrnBalance > 0) {
		isSplitCase = false;
		isAcrnEmpty = false;
	}

	$("span#summaryLaborTotal").html(insertDelimiter(invoice.laborTotal));
	$("span#summaryIndirectTotal").html(insertDelimiter(invoice.indirectTotal));
	$("span#summarySubcontractorTotal").html(insertDelimiter(invoice.subcontractorTotal));
	$("span#summaryDirectTotal").html(insertDelimiter(invoice.directTotal));
	$("span#summaryOtherDirectTotal").html(insertDelimiter(invoice.otherDirect));

	$("span#summaryAcrnBalance").html(insertDelimiter(acrnBalance));

	return acrnBalance;
}

function disableInvoice() { 
	$("table.invoice table td").addClass("disabled").attr('disabled','disabled')
		.find("input[type='checkbox']").attr("disabled", "disabled");
}

function enableInvoice() { 
	$("table.invoice table td").removeClass("disabled").removeAttr('disabled')
		.find("input[type='checkbox']").removeAttr("disabled");
}


/******************************************************************************/
/******************** Event Trigger ~ ACRN Radio Selections *******************/
/******************************************************************************/
$('body').on( 'click', 'input[type="radio"].acrnRadios', function() {
	enableInvoice();

	acrnCode = $(this).attr("id");
	acrnID = $(this).attr("value");

	acrnFunding =  $(this).attr("fundingAmount");
	
	var $laborItems = $('tr.laborRow');
	var $subcontractorItems = $('tr.subcontractorRow');
	var $directItems = $('tr.directRow');

	var $laborList = $($(this).attr("employeeIDs").replace(/(,)|^/g, "$1tr.laborRow.").replace(/^tr.laborRow.$/, "tr.laborRow"));
	var $subcontractorList = $($(this).attr('subcontractorIDs').replace(/(,)|^/g, "$1tr.subcontractorRow.").replace(/^tr.laborRow.$/, "tr.subcontractorRow"));
	var $directList = $($(this).attr('employeeIDs').replace(/(,)|^/g, "$1tr.directRow.").replace(/^tr.laborRow.$/, "tr.directRow"));

	// Re-Enables All Items
	$laborItems.addClass('disabled').find('input[type="checkbox"]').attr("disabled", "disabled").removeAttr("checked");
	$subcontractorItems.addClass('disabled').find('input[type="checkbox"]').attr("disabled", "disabled").removeAttr("checked");
	$directItems.addClass('disabled').find('input[type="checkbox"]').attr("disabled", "disabled").removeAttr("checked");

	// Disables All Available Items
	$laborList.removeClass('disabled').find('input[type="checkbox"]').removeAttr("disabled");
	$subcontractorList.removeClass('disabled').find('input[type="checkbox"]').removeAttr("disabled");
	$directList.removeClass('disabled').find('input[type="checkbox"]').removeAttr("disabled");

	$("tr.laborRow, tr.subcontractorRow, tr.directRow")
		.filter(':not(.disabled)')
		.filter("input[type='checkbox']:checked")
		.each(function() {
			// Resets all isSplitItem input values
			$(this).removeAttr("checked").next().val(0);
		});

	// Checks all Invoice Costs Associated with Selected ACRN
	$("tr." + acrnCode + " input[type='checkbox']").attr("checked", "checked");

	// Calculates Funding Summary for ACRN <---> Employee Relationship
	$("span#summaryAcrnFunding").html(insertDelimiter(acrnFunding));
	// Updates checkbox value to selected acrnID
	$('input[type="checkbox"]').attr("value", acrnID);
	
	getInvoiceTotal(acrnCode);
});

// ********************************************************************************
// ********************************************************************************
// Checkboxes for invoice items
// ********************************************************************************
// ********************************************************************************
$('body').on('click', "input[type='checkbox']", function() {
	acrnBalance = getInvoiceTotal();
	
	if(isSplitCase) {
		if (confirm('Selecting this item will exceed the available funding, and will split it into 2 lines. Is this okay?')) {
			$(this).next().val(acrnBalance);
			disableInvoice();
		} else {
			$(this).removeAttr("checked").val(0);
			getInvoiceTotal();
		}
	}

	if(isAcrnEmpty) {
		if (confirm('All ACRN funding has been used.\n\nPlease click "Save changes" and you will be able to assign another ACRN to all unassigned items.')) {
			disableInvoice();
		} else {
			$(this).attr('checked','checked');
			getInvoiceTotal();
		}
	}
});

// ********************************************************************************
// ********************************************************************************
// onload
// ********************************************************************************
// ********************************************************************************
$(function() {
	$("input.acrnRadios").each(function() {
		if($(this).css("visibility") == "visible") {
			$(this).attr('checked','checked').click();
			return false;
		}
	});

	// Re-enable all form fields when submitted
	$("form#frmInvoice").submit(function() {
		enableInvoice();
	});
});
