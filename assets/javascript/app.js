var search = ['google', 'deadmau5', 'blink-182'];
var images = [];
var gifClicked = false;
var lastImageClicked;
var searchTerm = '';

$(document).ready(function () {

	createButtons();
});

//when the button is clicked to search from existing button
$(document).on("click", ".search-button", function () {
	// Global variable searchTerm is changed to the text of the button
	searchTerm = $(this).text();
	console.log($(this).text());
	// Generate images from searchTerm
	generateImages();
	// Create buttons for searchTerm??
	createButtons(searchTerm);
	// Reset images to empty array?
	images = [];
});

//When the search button is clicked next to the search box
$(document).on("click", "#btn-search", function () {
	//Global variable searchTerm is set to the value of the input box
	searchTerm = $.trim($('#search-input').val());
	//Generate images from the global variable
	generateImages();
	//Create buttons from the global variable
	createButtons(searchTerm);
	//Reset images to an empty array?
	images = [];
});

//When the red X is clicked next to a search term
$(document).on("click", ".search-del-button", function () {
	// Create local variable and set it to "this" - the delete button
	var button = this;

	//Find index of button and splice it from the array
	var index = search.indexOf($(button).attr('search-term'));
	search.splice(index, 1);

	//Remove the parent of the search-del-button
	$(this).parent().remove();
	//Generate images of the last search term???
	generateImages();
});

// When one of the images is clicked, it should expand your view of it
$(document).on("click", ".gif-image", function () {
	// If gif has not yet been clicked
	if (!gifClicked) {
		// Change 'src' attrib to animated - this will animate the image
		$(this).attr('src', $(this).attr('animated'));
		// Another animation is used to make the image slightly larger than the rest
		$(this).animate({ width: '33vh' });
		// This was the last image that was clicked
		lastImageClicked = this;
		// A gif has now been clicked, another one cannot be clicked and expanded upon
		gifClicked = true;
	}
	// Else, if the last image that was clicked was this one...
	else if (lastImageClicked === this) {
		// Animate it back to original width
		$(this).animate({ width: '21vh' });
		// Change the 'src' attrib to still - stops animation
		$(this).attr('src', $(this).attr('still'));
		// No gif is now clicked
		gifClicked = false;
	} else {
		// Animate down to normal size, unanimate, no gif has been clicked.
		$(lastImageClicked).animate({ width: '21vh' });
		$(lastImageClicked).attr('src', $(lastImageClicked).attr('still'));
		gifClicked = false;
		// This one is now animated and enlarged.
		$(this).animate({ width: '33vh' });
		$(this).attr('src', $(this).attr('animated'));
	}

});

// Procedurally generate the buttons for search terms
function createButtons(searchTerm) {
	// Trim the search term to make it more basic
	var searchTerm = $.trim(searchTerm);
	// Check to make sure that there is a searchTerm and the 'search' array does not already include it
	if (arguments.length > 0 && !search.includes(searchTerm)) {
		// Check to make sure the searchTerm isn't empty from trimming
		if (searchTerm !== '') {
			// Push the searchTerm to the 'search' array
			search.push(searchTerm);
		}
	}

	// Refresh all the buttons on the search bar when a new one is added.
	$('#buttons').empty();

	$.each(search, function (index, current) {
		var term = current.replace(/\s/g, '-');

		// Create a div and fill it with everything that makes a search button
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

	appendImages();
}

function generateImages() {
	for (var i = 0; i < 10; ++i) {
		getImage(searchTerm);
	}

}

function appendImages() {

	$('.images').empty();
	$.each(images, function (index, current) {
		$('.images').append(current);

	});
}