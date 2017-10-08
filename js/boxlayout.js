var Boxlayout = (function() {

    var $el = $('#bl-main'),
        $sections = $el.children('section'),
        // works section
        $sectionWork = $('#bl-work-section'),
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        // transition end event name
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        // support css transitions
        supportTransitions = Modernizr.csstransitions;

    function init() {
        initEvents();
    }

    function unDoTransition(index, $section) {
        for (var child = 0; child < $el[0].children.length; child++) {
            $el[0].children[child].removeAttribute("style");
        }
    }

    function doTransition(index, $section) {
        console.log(index)
        switch (index) {
            case "menu":
                var adjusent = [0, 1, 2, 4],
                    subAdjusentDownX, subAdjusentDownY = 7,
                    fadex0y0 = [],
                    fadex1y0 = [],
                    fadex0y1 = [3, 6],
                    fadex1y1 = [5, 8];
                break;
            case "about":
                var adjusent = [0, 3, 4, 6],
                    subAdjusentDownX = 5,
                    subAdjusentDownY, fadex0y0 = [],
                    fadex1y0 = [1, 2],
                    fadex0y1 = [],
                    fadex1y1 = [7, 8];
                break;
            case "csr":
                var adjusent = [2, 4, 5, 8],
                    subAdjusentUpX = 3,
                    subAdjusentDownY, fadex0y0 = [0, 1],
                    fadex1y0 = [],
                    fadex0y1 = [6, 7],
                    fadex1y1 = [];
                break;
            case "contact":
                var adjusent = [4, 6, 7, 8],
                    subAdjusentDownX, subAdjusentUpY = 1,
                    fadex0y0 = [0, 3],
                    fadex1y0 = [2, 5],
                    fadex0y1 = [],
                    fadex1y1 = [];
                break;
        }

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

        if (!$section.data('open')) {
            $section.data('open', true).addClass('bl-expand bl-expand-top');
            $el.addClass('bl-expand-item');
            $el.parent().addClass('bl-expand-item-parent');

            $('.bl-expand-top .bl-content').slimscroll({
                height: 'calc( 100% - 60px )',
                color: '#f3bb4e',
                size: '10px',
                alwaysVisible: true
            })
        }

    }

    function initEvents() {
        var toggleEle = $(".togglecontainer > span");
        var block = $("#bl-main");
        toggleContainer = function() {
            toggleEle.find("i").toggleClass("fa fa-expand fa fa-compress");
            block.toggleClass("full-width");
        }
        toggleEle.on("click", toggleContainer);

        $sections.each(function(index) {

            var $section = $(this);
            if (window.location.href.split("#").length > 1 && window.location.href.split("#")[1].length > 1) {
                switch (window.location.hash) {
                    case "#menu":
                        if (index == 1)
                            doTransition("menu", $section);
                        break;
                    case "#about":
                        if (index == 3)
                            doTransition("about", $section);
                        break;
                    case "#csr":
                        if (index == 5)
                            doTransition("csr", $section);
                        break;
                    case "#contact":
                        if (index == 7)
                            doTransition("contact", $section);
                        break;
                }

            }

            // expand the clicked section and scale down the others
            $section.on('click', function() {
                switch (index) {
                    case 1:
                        window.location.hash = "menu";
                        doTransition("menu", $section);
                        break;
                    case 3:
                        window.location.hash = "about";
                        doTransition("about", $section);
                        break;
                    case 5:
                        window.location.hash = "csr";
                        doTransition("csr", $section);
                        break;
                    case 7:
                        window.location.hash = "contact";
                        doTransition("contact", $section);
                        break;
                }


            }).find('span.kat-close').on('click', function() {

                window.location.hash = "";
                unDoTransition(index + 1, $section)
                // close the expanded section and scale up the others
                $section.data('open', false).removeClass('bl-expand').on(transEndEventName, function(event) {
                    if (!$(event.target).is('section')) return false;
                    $(this).off(transEndEventName).removeClass('bl-expand-top');
                });

                if (!supportTransitions) {
                    $section.removeClass('bl-expand-top');
                }

                $el.removeClass('bl-expand-item');
                $el.parent().removeClass('bl-expand-item-parent');

                return false;

            });

        });


    }

    return { init: init };

})();