var search = ['google', 'deadmau5', 'blink-182'];

$(document).ready(function () {
	console.log("ready");
	createButtons();
});

$(document).on("click", "#btn-search", function () {
	createButtons($.trim($('#search-input').val()));
});

$(document).on("click", ".search-del-button", function () {
	var button = this;
	// $.each(search, function (index, current) {
	// 	if (current === $(button).attr('search-term')){
	// 		console.log(true);
	// 	}
	// });
	var index = search.indexOf($(button).attr('search-term'));
	search.splice(index, 1);
	$(this).parent().remove();
});

function createButtons(searchTerm) {
	var searchTerm = $.trim(searchTerm);
	if (arguments.length > 0 && !search.includes(searchTerm)) {
		if (searchTerm !== '') {
			search.push(searchTerm);
		}
	}

	$('#buttons').empty();

	$.each(search, function (index, current) {
		var term = current.replace(/\s/g, '-');

		var buttonGroup = $('<div>');
		$(buttonGroup).addClass('btn-group');
		$(buttonGroup).attr('role', 'group');

		var button = $('<button>');
		$(button).attr('id', 'btn-' + term + '-' + index);
		$(button).addClass('search-button').addClass('btn btn-success');
		$(button).addClass('btn-' + term)
		$(button).text(term);

		var buttonDelete = $('<button>');
		$(buttonDelete).attr('search-term', term);
		$(buttonDelete).addClass('search-del-button').addClass('btn btn-danger').addClass(term);
		$(buttonDelete).html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');

		$(buttonGroup).append(button);
		$(buttonGroup).append(buttonDelete);

		$('#buttons').append(buttonGroup);
		$('#search-input').val('');
	});

}

