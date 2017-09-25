var Boxlayout = (function() {

	var $el = $( '#bl-main' ),
		$sections = $el.children( 'section' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeWorkItem = $workPanelsContainer.find( 'nav > span.bl-icon-close' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function unDoTransition(index,$section) {
			for (var child = 0; child < $el[0].children.length; child++) {
				$el[0].children[child].removeAttribute("style");
			}
	}

	function doTransition(index,$section) {
		// if(index == 1){
			// var adjusent =  [0,1,3], subAdjusentDownX =  2, subAdjusentDownY =  6, fadex0y0 = [], fadex1y0 = [], fadex0y1 = [], fadex1y1 = [4,5,7,8];
		// }
		if(index == 2){
			var adjusent =  [0,1,2,4], subAdjusentDownX, subAdjusentDownY =  7, fadex0y0 =  [], fadex1y0 = [] , fadex0y1 = [3,6], fadex1y1 = [5,8];
		}
		// if(index == 3){
			// var adjusent =  [1,2,5], subAdjusentUpX = 0, subAdjusentDownY = 8, fadex0y0 =  [], fadex1y0 = [] , fadex0y1 = [3,4,6,7], fadex1y1 = [];
		// }
		if(index == 4){
			var adjusent =  [0,3,4,6], subAdjusentDownX = 5, subAdjusentDownY, fadex0y0 =  [], fadex1y0 = [1,2] , fadex0y1 = [], fadex1y1 = [7,8];
		}
		// if(index == 5){
			// var adjusent =  [1,3,4,5,7], subAdjusentUpX , subAdjusentDownY, fadex0y0 =  [0], fadex1y0 = [2] , fadex0y1 = [6], fadex1y1 = [8];
		// }
		if(index == 6){
			var adjusent =  [2,4,5,8], subAdjusentUpX = 3, subAdjusentDownY, fadex0y0 =  [0,1], fadex1y0 = [] , fadex0y1 = [6,7], fadex1y1 = [];
		}
		// if(index == 7){
			// var adjusent =  [3,6,7], subAdjusentDownX = 8, subAdjusentUpY = 0, fadex0y0 =  [], fadex1y0 = [1,2,4,5] , fadex0y1 = [], fadex1y1 = [];
		// }
		if(index == 8){
			var adjusent =  [4,6,7,8], subAdjusentDownX, subAdjusentUpY = 1, fadex0y0 =  [0,3], fadex1y0 = [2,5] , fadex0y1 = [], fadex1y1 = [];
		}
		// if(index == 9){
			// var adjusent =  [5,7,8], subAdjusentUpX = 6, subAdjusentUpY = 2, fadex0y0 =  [0,1,3,4], fadex1y0 = [] , fadex0y1 = [], fadex1y1 = [];
		// }

		for (var child = 0; child < $el[0].children.length; child++) {
			if (adjusent.indexOf(child) >= 0)
				$el[0].children[child].setAttribute("style", "width: 100%;height: 100%;top: 00%;left: 00%;");
			else if (subAdjusentUpX == child)
				$el[0].children[child].setAttribute("style", "width: 00%;height: 100%;top: 00%;left: 00%;");
			else if (subAdjusentDownX == child)
				$el[0].children[child].setAttribute("style", "width: 00%;height: 100%;top: 00%;left: 100%;");
			else if (subAdjusentDownY == child)
				$el[0].children[child].setAttribute("style", "width: 100%;height: 00%;top: 100%;left: 00%;");
			else if (subAdjusentUpY == child)
				$el[0].children[child].setAttribute("style", "width: 100%;height: 00%;top: 00%;left: 00%;");
			else if (fadex0y0.indexOf(child) >= 0) 
				$el[0].children[child].setAttribute("style", "width: 00%;height: 00%;top: 00%;left: 00%;");
			else if (fadex0y1.indexOf(child) >= 0) 
				$el[0].children[child].setAttribute("style", "width: 00%;height: 00%;top: 100%;left: 00%;");
			else if (fadex1y0.indexOf(child) >= 0) 
				$el[0].children[child].setAttribute("style", "width: 00%;height: 00%;top: 00%;left: 100%;");
			else if (fadex1y1.indexOf(child) >= 0) 
				$el[0].children[child].setAttribute("style", "width: 00%;height: 00%;top: 100%;left: 100%;");
		}

		if( !$section.data( 'open' ) ) {
			$section.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
			$el.addClass( 'bl-expand-item' );	
		}
		
	}

	function initEvents() {
		
		$sections.each( function(index) {
			
			var $section = $( this );
			if(parseInt(window.location.href.split("#")[1]) == index){
				doTransition(index+1,$section)


			}

			// expand the clicked section and scale down the others
			$section.on( 'click', function() {
				doTransition(index+1,$section)
				window.location.hash = index;

			} ).find( 'span.bl-icon-close' ).on( 'click', function() {
				
				unDoTransition(index+1,$section)
				// close the expanded section and scale up the others
				$section.data( 'open', false ).removeClass( 'bl-expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'bl-expand-top' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'bl-expand-top' );
				}

				$el.removeClass( 'bl-expand-item' );
				
				return false;

			} );

		} );


	}

	return { init : init };

})();
