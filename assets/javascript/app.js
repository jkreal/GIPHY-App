var search = ['google', 'deadmau5', 'blink-182'];

$(document).ready(function () {
	console.log("ready");
	createButtons();
});

$(document).on("click", ".search-button", function () {
	console.log($('#search-input').val());
});

$(document).on("click", "#btn-search", function () {
	createButtons($.trim($('#search-input').val()));
});

$(document).on("click", ".search-del-button", removeButton);

function removeButton() {
	$(this).parent().remove();
	console.log(this);
	console.log($(this).parent());
}

function createButtons(searchTerm) {
	var searchTerm = $.trim(searchTerm);
	if (arguments.length > 0 && !search.includes(searchTerm)) {
		search.push(searchTerm);
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
		$(buttonDelete).attr('search', 'btn-' + current + '-' + index);
		$(buttonDelete).addClass('search-del-button').addClass('btn btn-danger');
		$(buttonDelete).html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');

		$(buttonGroup).append(button);
		$(buttonGroup).append(buttonDelete);

		$('#buttons').append(buttonGroup);
		$('#search-input').val('');
	});

}

