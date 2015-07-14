function Cards() {
	var self = this;
	var touch = true;
	element = $("#card-container");

	var nextBtn = $("#card-next");
	var prevBtn = $("#card-prev");
	var nextTocBtn = $("#card-toc-next");
	var prevTocBtn = $("#card-toc-prev");
	var infoBtn = $("#card-info");
	var cardToc = $("#card-toc");
	var container = $("#card-container ol");
	var panes = $("#card-container li");
	var tocList = $("#card-toc ol");
	var tocButtons;
	var cardCounter = $("#card-counter");
	var cardTotal = $("#card-total");

	/*	Array used to keep track of the article straps */
	var strapArray = [];

	var pane_width = 0;
	var pane_count = panes.length;
	var current_pane = 0;

	var hammerEvents = "panend panleft panright swipeleft swiperight";



	/* Initial */
	this.init = function() {
		setPaneDimensions();
		var that = this;

		panes.each(function () {
			var strap = $(this).find("header h2").text();
			var head = $(this).find("header h1").text();
			var number = $(this).index();

			if (strapArray.indexOf(strap) == -1 && (strap.length > 0)) {
				/* This is the first instance of the strap */
				tocList.append("<li><strong>" + strap + "</strong></li>");
				tocList.append("<li><button id='#card" + number + "'>" + head + "</button></li>");
				strapArray.push(strap);
			} else {
				/* The strap has alread been used */
				tocList.append("<li><button id='#card" + number + "'>" + head + "</button></li>");
			}
		});

		tocButtons = $("#card-toc").find("li button");

		tocButtons.click(function () {
			var num = $(this).attr("id");
			that.showPane(parseInt(num.slice(5), 10), true);
		});

		cardTotal.text(pane_count);
		
		$(window).on("load resize orientationchange", function() {
			setPaneDimensions();
			that.showPane(current_pane);
		});
	};

	/* Set the pane dimensions and scale the container */
	function setPaneDimensions() {
		pane_width = element.width();
		panes.each(function() {
			$(this).width(pane_width);
			$(this).height($(window).height() - 40);
		});
		cardToc.height($(window).height() - 40);
   		container.width(pane_width * pane_count);
	}

	/* Show pane by index */
	this.showPane = function(index, animate) {
		/*	Make sure that the current pain is allways between 0
			and the pane_count -1 */
		current_pane = Math.max(0, Math.min(index, pane_count-1));
	
		/* Work out the necessary offset as a percentage */
		var offset = -((100/pane_count)*current_pane);
		
		setContainerOffset(offset, animate);
		tocButtons.each(function () {
			$(this).removeClass("active");
		});
		tocButtons.eq(current_pane).addClass("active");
		
		cardToc.removeClass("overlay");

		cardCounter.text(current_pane + 1);
	};

	function setContainerOffset(percent, animate) {
		container.removeClass("animate");

		if(animate) {
			container.addClass("animate");
		}

		/* jQuery will automatically add the -webkit- prefix for iOS devices */
		container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
	}

	this.next = function() {
		return self.showPane(current_pane+1, true); 
	};
	
	this.prev = function() { 
		return self.showPane(current_pane-1, true); 
	};

	function handleHammer(ev) {
    	// disable browser scrolling - Not sure if this is necessary
		ev.preventDefault();
		var sideways = true;

		// DIRECTION_LEFT	== 2
		// DIRECTION_RIGHT	== 4

	    switch(ev.type) {
			case 'panright':
			case 'panleft':
				
				/*	Sticky fingaz */
				/*	Make the pane follow the cursor/finger */
				var pane_offset = -(100/pane_count)*current_pane;
				var drag_offset = ((100/pane_width)*ev.deltaX) / pane_count;
					
				/* Slow down at the first and last pane */
				if((current_pane === 0 && ev.direction === 4) ||
					(current_pane === (pane_count - 1) && ev.direction === 2)) {
					drag_offset *= 0.4;
				}

				setContainerOffset(drag_offset + pane_offset);
				break;

			case 'swipeleft':
				self.next();
				ev.preventDefault();
		        break;

			case 'swiperight':
				self.prev();
				ev.preventDefault();
		        break;

		case 'panend':
			/*	If we've swipped further than 50% moved
				navigate to the next pane */
			if(Math.abs(ev.deltaX) > pane_width/2) {
				if(ev.direction == 4) {
					self.prev();
				} else {
					self.next();
				}
			} else {
				self.showPane(current_pane, true);
	        }
	        break;
	    }

		
	}

	nextBtn.click(this.next);
	prevBtn.click(this.prev);
	nextTocBtn.click(this.next);
	prevTocBtn.click(this.prev);

	infoBtn.click(function () {
		cardToc.toggleClass("overlay");
	});


	try {
		document.createEvent("TouchEvent");
		new Hammer(element[0], { dragLockToAxis: true }).on(hammerEvents, handleHammer);
	}
	catch (e) {
		touch = false;
	}

}


(function() {

	var init = function($) {

			var card = new Cards();
			card.init();
			card.showPane(0);

	};

	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {
			init(jQuery);
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);
})();

