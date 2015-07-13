function Cards(target,toc) {
	var self = this;
	element = $(target);

	var container = $(target + " ol");
	var panes = $(target + " li");
	var tocList = $(toc);
	var tocButtons;

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
			var strap = $(this).find("h2").text();
			var head = $(this).find("h1").text();
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

		tocButtons = $(toc).find("li button");

		tocButtons.click(function () {
			var num = $(this).attr("id");
			that.showPane(parseInt(num.slice(5), 10), true);
		});
		
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
		});
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

	new Hammer(element[0], { dragLockToAxis: true }).on(hammerEvents, handleHammer);
}


(function() {

	var init = function($) {

			var card = new Cards("#card-container","#card-toc");
			var nextBtn = $("#next");
			var prevBtn = $("#prev");

			card.init();
			card.showPane(0);

			nextBtn.click(card.next);
			prevBtn.click(card.prev);

	};

	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {
			init(jQuery);
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);
})();

