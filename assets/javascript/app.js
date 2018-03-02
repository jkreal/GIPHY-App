var search = ['google', 'deadmau5', 'blink-182'];
var images = [];
var gifClicked = false;
var lastImageClicked;
var searchTerm = '';

$(document).ready(function () {
	console.log("ready");
	createButtons();
});

$(document).on("click", ".search-button", function () {
	searchTerm = $(this).text();
	console.log($(this).text());
	generateImages();
	createButtons(searchTerm);
	images = [];
});

$(document).on("click", "#btn-search", function () {
	searchTerm = $.trim($('#search-input').val());
	generateImages();
	createButtons(searchTerm);
	images = [];
});

$(document).on("click", ".search-del-button", function () {
	var button = this;

	var index = search.indexOf($(button).attr('search-term'));
	search.splice(index, 1);

	$(this).parent().remove();
	generateImages();
});

$(document).on("click", ".gif-image", function () {
	if (!gifClicked) {
		$(this).attr('src', $(this).attr('animated'));
		$(this).animate({ width: '33vh' });
		lastImageClicked = this;
		gifClicked = true;
	}
	else if (lastImageClicked === this) {
		$(this).animate({ width: '21vh' });
		$(this).attr('src', $(this).attr('still'));
		gifClicked = false;
	} else {
		$(lastImageClicked).animate({ width: '21vh' });
		$(lastImageClicked).attr('src', $(lastImageClicked).attr('still'));
		gifClicked = false;
		$(this).animate({ width: '33vh' });
		$(this).attr('src', $(this).attr('animated'));
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
		url: "https://api.giphy.com/v1/gifs/random?api_key=ItHMCAF2beAU5uC3GtFXENruGY8CvR96&tag=" + searchTerm + "&rating=G"
	}).then(function (response) {
		addImage(response.data.images.fixed_width_still.url, response.data.images.fixed_width.url);
	});

}

function addImage(stillImage, animated) {
	var tempImage = $("<img>");
	$(tempImage).attr('src', stillImage);
	$(tempImage).attr('still', stillImage);
	$(tempImage.attr('animated', animated));
	$(tempImage).css('width', '21vh');
	$(tempImage).addClass('gif-image');

	images.push(tempImage);
	console.log(images);
	appendImages();
}

function generateImages() {
	for (var i = 0; i < 10; ++i) {
		getImage(searchTerm);
	}
	console.log(images);
}

function appendImages() {

	$('.images').empty();
	$.each(images, function (index, current) {
		$('.images').append(current);
		console.log('gotimage');
	});
}