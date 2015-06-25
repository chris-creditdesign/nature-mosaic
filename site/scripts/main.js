$(function() {

	// data-spy="affix" data-offset-top="30"

	var header = $(".fixed-header");
	var offset = header.offset().top;
	var nav = $("nav");
	var headerLogo = $(".header-logo");
	var headerButtons = $(".header-buttons");
	var pushLeft, pushDown;
	var figures = $("figure");

	function adjustValues () {
		pushLeft = $("article.container").offset().left + "px";
		pushDown = parseInt(headerLogo.css("height"), 10) + parseInt(header.css("margin-bottom"), 10);
		header.css({"left": pushLeft });
		offset = header.offset().top;
	}

	header.affix({
		offset: offset
	});

	/*	Apply the affix pluggin to the header and adjust the widths
		of the logo and buttons contained within */
	header.on("affix.bs.affix", function () {
		nav.css({"margin-bottom": pushDown});
		headerLogo.removeClass("col-md-8").addClass("col-md-9");
		headerButtons.removeClass("col-md-offset-1");
	}).on("affix-top.bs.affix", function () {
		nav.css({"margin-bottom": "0"});
		headerLogo.removeClass("col-md-9").addClass("col-md-8");
		headerButtons.addClass("col-md-offset-1");
	});

	/*	Adjust the positions of the social icons within fifures
		so that they sit at the bottom right of the image */
	figures.each(function (index) {
		var captionHeight = $(this).children("figcaption").height();
		var nudge = (captionHeight + 60 ) + "px";
		var icon = $(this).children(".img-tools");
		
		icon.css({"bottom": nudge});
	});

	/*	Toggle the like button on and off */
	$(".article-like-icon").click(function() {
		if ($(this).attr("class") === "article-like-icon") {
			$(this).attr("class", "article-like-icon liked");
		} else {
			$(this).attr("class", "article-like-icon");
		}
	});


	window.addEventListener('resize', adjustValues);
	adjustValues();

});
