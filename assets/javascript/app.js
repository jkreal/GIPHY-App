var search = ['google', 'deadmau5', 'blink-182'];
var gifClicked = false;

$(document).ready(function () {
	console.log("ready");
	createButtons();
});

$(document).on("click", "#btn-search", function () {
	getImage($.trim($('#search-input').val()));
	createButtons($.trim($('#search-input').val()));
});

$(document).on("click", ".search-del-button", function () {
	var button = this;

	var index = search.indexOf($(button).attr('search-term'));
	search.splice(index, 1);

	

	$(this).parent().remove();
});

$(document).on("click", ".gif-image", function () {
	if (!gifClicked) {
		$(this).animate({ width: '33vh' });
		gifClicked = true;
	}
	else {
		$(this).animate({ width: '21vh'});
		gifClicked = false;
	}

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

function getImage(term) {

	$.ajax({
		type: "GET",
		url: "https://api.giphy.com/v1/gifs/random?api_key=ItHMCAF2beAU5uC3GtFXENruGY8CvR96&qtag=" + term + "&limit=3"
	}).then(function (response) {
		console.log(response.data.images.fixed_width.url);
		addImage(response.data.images.fixed_width.url);
	});


}

function addImage(image) {
	var tempImage = $("<img>");
	$(tempImage).attr('src', image);
	$(tempImage).css('width', '21vh');
	$(tempImage).addClass('gif-image');

	$('.images').append(tempImage);
}

function expandImage(image) {

}

