// Audio video layout

var init = function($) {

		var grid = $('.grid').masonry({
			// options...
			columnWidth: ".grid-item",
			itemSelector: ".grid-item",
			gutter: ".grid-gutter",
			percentPosition: true
		});

		// layout Masonry after each image loads
		grid.imagesLoaded().progress( function() {
			grid.masonry();
		});

		var btn = $(".media-dismiss-btn");

		btn.click(function() {
			var parent = $(this).parents(".grid-item")[0];

			grid.masonry( 'remove', parent ).masonry();
		});
};


document.addEventListener('HTMLImportsLoaded', function () {
	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {
			init(jQuery);
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);
});

