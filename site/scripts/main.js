$(function() {

	var header = $(".fixed-header");
	var offset = header.offset().top;
	var nav = $("nav");
	var headerLogo = $(".header-logo");
	var headerButtons = $(".header-buttons");
	var pushLeft, pushDown;
	/*	Store mouse possition for tweet button on 
	 	content select */
	var mouseX = 0;
	var mouseY = 0;
	var tweetButton = $("#tweetbutton");
	var url = encodeURI(document.URL);
	var selectedText = "";

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

	/*	Toggle the like button on and off */
	$(".article-like-icon").click(function() {
		if ($(this).attr("class") === "article-like-icon") {
			$(this).attr("class", "article-like-icon liked");
		} else {
			$(this).attr("class", "article-like-icon");
		}
	});

	$("body").keypress(function (event) {

		if (event.keyCode === 113) {
			$(this).removeClass("source-sans").toggleClass("minion");
		} else if (event.keyCode === 119) {
			$(this).removeClass("minion").toggleClass("source-sans");
		}
	});


	window.addEventListener('resize', adjustValues);
	adjustValues();

	function getSelectionText() {
	    var text = "";
	    if (window.getSelection) {
	        text = window.getSelection().toString();
	    } else if (document.selection && document.selection.type != "Control") {
	        text = document.selection.createRange().text;
	    }
	    return text;
	}

    $('body').mouseup(function (e) {
	    mouseX = e.pageX;
	    mouseY = e.pageY;

        if (getSelectionText() !== "") {
        	selectedText = encodeURI(getSelectionText());

            tweetButton.attr("href", 'https://twitter.com/intent/tweet?text=' + selectedText + '&url=' + url);
            tweetButton.attr("target", '_blank');
            tweetButton.css({
                'top': mouseY - 10,
                'left': mouseX
            }).fadeIn();
        } else {
        	tweetButton.hide();
        }
    });

    tweetButton.mouseup(function (e) {
        tweetButton.hide();
    });

});
