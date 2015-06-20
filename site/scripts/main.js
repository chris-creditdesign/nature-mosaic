$(function() {
	// data-spy="affix" data-offset-top="30"

	var header = $(".fixed-header");
	var nav = $("nav");
	var headerLogo = $(".header-logo");
	var headerButtons = $(".header-buttons");
	var pushLeft, pushDown;

	function adjustValues () {
		pushLeft = $("article.container").offset().left + "px";
		pushDown = parseInt(headerLogo.css("height"), 10) + parseInt(header.css("margin-bottom"), 10);
		header.css({"left": pushLeft });
	}


	header.affix({
		offset: {	top: 30,
					bottom: 65 }
	}).on("affix.bs.affix", function () {
		nav.css({"margin-bottom": pushDown});
		headerLogo.removeClass("col-md-8").addClass("col-md-9");
		headerButtons.removeClass("col-md-offset-1");
	}).on("affix-top.bs.affix", function () {
		nav.css({"margin-bottom": "0"});
		headerLogo.removeClass("col-md-9").addClass("col-md-8");
		headerButtons.addClass("col-md-offset-1");
	});


	window.addEventListener('resize', adjustValues);
	adjustValues();

});