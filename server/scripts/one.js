
/*
 * Sidr
 * https://github.com/artberri/sidr
 *
 * Copyright (c) 2013 Alberto Varela
 * Licensed under the MIT license.
 */

;(function( $ ){

  var sidrMoving = false,
      sidrOpened = false;

  // Private methods
  var privateMethods = {
    // Check for valids urls
    // From : http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
    isUrl: function (str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if(!pattern.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    // Loads the content into the menu bar
    loadContent: function($menu, content) {
      $menu.html(content);
    },
    // Add sidr prefixes
    addPrefix: function($element) {
      var elementId = $element.attr('id'),
          elementClass = $element.attr('class');

      if(typeof elementId === 'string' && '' !== elementId) {
        $element.attr('id', elementId.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-id-$1'));
      }
      if(typeof elementClass === 'string' && '' !== elementClass && 'sidr-inner' !== elementClass) {
        $element.attr('class', elementClass.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-class-$1'));
      }
      $element.removeAttr('style');
    },
    execute: function(action, name, callback) {
      // Check arguments
      if(typeof name === 'function') {
        callback = name;
        name = 'sidr';
      }
      else if(!name) {
        name = 'sidr';
      }

      // Declaring
      var $menu = $('#' + name),
          $body = $($menu.data('body')),
          $html = $('html'),
          menuWidth = $menu.outerWidth(true),
          speed = $menu.data('speed'),
          side = $menu.data('side'),
          displace = $menu.data('displace'),
          onOpen = $menu.data('onOpen'),
          onClose = $menu.data('onClose'),
          bodyAnimation,
          menuAnimation,
          scrollTop,
          bodyClass = (name === 'sidr' ? 'sidr-open' : 'sidr-open ' + name + '-open');

      // Open Sidr
      if('open' === action || ('toggle' === action && !$menu.is(':visible'))) {
        // Check if we can open it
        if( $menu.is(':visible') || sidrMoving ) {
          return;
        }

        // If another menu opened close first
        if(sidrOpened !== false) {
          methods.close(sidrOpened, function() {
            methods.open(name);
          });

          return;
        }

        // Lock sidr
        sidrMoving = true;

        // Left or right?
        if(side === 'left') {
          bodyAnimation = {left: menuWidth + 'px'};
          menuAnimation = {left: '0px'};
        }
        else {
          bodyAnimation = {right: menuWidth + 'px'};
          menuAnimation = {right: '0px'};
        }

        // Prepare page if container is body
        if($body.is('body')){
          scrollTop = $html.scrollTop();
          $html.css('overflow-x', 'hidden').scrollTop(scrollTop);
        }

        // Open menu
        if(displace){
          $body.addClass('sidr-animating').css({
            width: $body.width(),
            position: 'absolute'
          }).animate(bodyAnimation, speed, function() {
            $(this).addClass(bodyClass);
          });
        }
        else {
          setTimeout(function() {
            $(this).addClass(bodyClass);
          }, speed);
        }
        $menu.css('display', 'block').animate(menuAnimation, speed, function() {
          sidrMoving = false;
          sidrOpened = name;
          // Callback
          if(typeof callback === 'function') {
            callback(name);
          }
          $body.removeClass('sidr-animating');
        });

        // onOpen callback
        onOpen();
      }
      // Close Sidr
      else {
        // Check if we can close it
        if( !$menu.is(':visible') || sidrMoving ) {
          return;
        }

        // Lock sidr
        sidrMoving = true;

        // Right or left menu?
        if(side === 'left') {
          bodyAnimation = {left: 0};
          menuAnimation = {left: '-' + menuWidth + 'px'};
        }
        else {
          bodyAnimation = {right: 0};
          menuAnimation = {right: '-' + menuWidth + 'px'};
        }

        // Close menu
        if($body.is('body')){
          scrollTop = $html.scrollTop();
          $html.removeAttr('style').scrollTop(scrollTop);
        }
        $body.addClass('sidr-animating').animate(bodyAnimation, speed).removeClass(bodyClass);
        $menu.animate(menuAnimation, speed, function() {
          $menu.removeAttr('style').hide();
          $body.removeAttr('style');
          $('html').removeAttr('style');
          sidrMoving = false;
          sidrOpened = false;
          // Callback
          if(typeof callback === 'function') {
            callback(name);
          }
          $body.removeClass('sidr-animating');
        });

        // onClose callback
        onClose();
      }
    }
  };

  // Sidr public methods
  var methods = {
    open: function(name, callback) {
      privateMethods.execute('open', name, callback);
    },
    close: function(name, callback) {
      privateMethods.execute('close', name, callback);
    },
    toggle: function(name, callback) {
      privateMethods.execute('toggle', name, callback);
    },
    // I made a typo, so I mantain this method to keep backward compatibilty with 1.1.1v and previous
    toogle: function(name, callback) {
      privateMethods.execute('toggle', name, callback);
    }
  };

  $.sidr = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    else if ( typeof method === 'function' || typeof method === 'string' || ! method ) {
      return methods.toggle.apply( this, arguments );
    }
    else {
      $.error( 'Method ' + method + ' does not exist on jQuery.sidr' );
    }

  };

  $.fn.sidr = function( options ) {

    var settings = $.extend( {
      name          : 'sidr',         // Name for the 'sidr'
      speed         : 200,            // Accepts standard jQuery effects speeds (i.e. fast, normal or milliseconds)
      side          : 'left',         // Accepts 'left' or 'right'
      source        : null,           // Override the source of the content.
      renaming      : true,           // The ids and classes will be prepended with a prefix when loading existent content
      body          : 'body',         // Page container selector,
      displace: true, // Displace the body content or not
      onOpen        : function() {},  // Callback when sidr opened
      onClose       : function() {}   // Callback when sidr closed
    }, options);

    var name = settings.name,
        $sideMenu = $('#' + name);

    // If the side menu do not exist create it
    if( $sideMenu.length === 0 ) {
      $sideMenu = $('<div />')
        .attr('id', name)
        .appendTo($('body'));
    }

    // Adding styles and options
    $sideMenu
      .addClass('sidr')
      .addClass(settings.side)
      .data({
        speed          : settings.speed,
        side           : settings.side,
        body           : settings.body,
        displace      : settings.displace,
        onOpen         : settings.onOpen,
        onClose        : settings.onClose
      });

    // The menu content
    if(typeof settings.source === 'function') {
      var newContent = settings.source(name);
      privateMethods.loadContent($sideMenu, newContent);
    }
    else if(typeof settings.source === 'string' && privateMethods.isUrl(settings.source)) {
      $.get(settings.source, function(data) {
        privateMethods.loadContent($sideMenu, data);
      });
    }
    else if(typeof settings.source === 'string') {
      var htmlContent = '',
          selectors = settings.source.split(',');

      $.each(selectors, function(index, element) {
        htmlContent += '<div class="sidr-inner">' + $(element).html() + '</div>';
      });

      // Renaming ids and classes
      if(settings.renaming) {
        var $htmlContent = $('<div />').html(htmlContent);
        $htmlContent.find('*').each(function(index, element) {
          var $element = $(element);
          privateMethods.addPrefix($element);
        });
        htmlContent = $htmlContent.html();
      }
      privateMethods.loadContent($sideMenu, htmlContent);
    }
    else if(settings.source !== null) {
      $.error('Invalid Sidr Source');
    }

    return this.each(function(){
      var $this = $(this),
          data = $this.data('sidr');

      // If the plugin hasn't been initialized yet
      if ( ! data ) {

        $this.data('sidr', name);
        if('ontouchstart' in document.documentElement) {
          $this.bind('touchstart', function(e) {
            var theEvent = e.originalEvent.touches[0];
            this.touched = e.timeStamp;
          });
          $this.bind('touchend', function(e) {
            var delta = Math.abs(e.timeStamp - this.touched);
            if(delta < 200) {
              e.preventDefault();
              methods.toggle(name);
            }
          });
        }
        else {
          $this.click(function(e) {
            e.preventDefault();
            methods.toggle(name);
          });
        }
      }
    });
  };

})( jQuery );

/*

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)
SMINT V3.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/


(function(){


	$.fn.smint = function( options ) {

		var settings = $.extend({
			'scrollSpeed'  : 500,
			'mySelector'     : 'div'
		}, options);

		// adding a class to users div
		$(this).addClass('smint');


				
		
		//Set the variables needed
		var optionLocs = new Array(),
			lastScrollTop = 0,
			menuHeight = $(".smint").height(),
			smint = $('.smint'),
        	smintA = $('.smint a'),
        	myOffset = smint.height();

      



		if ( settings.scrollSpeed ) {
				var scrollSpeed = settings.scrollSpeed
			}

		if ( settings.mySelector ) {
				var mySelector = settings.mySelector
		};



		return smintA.each( function(index) {
            
			var id = $(this).attr('href').split('#')[1];

			if (!$(this).hasClass("extLink")) {
				$(this).attr('id', id);
			}

			
			//Fill the menu
			optionLocs.push(Array(
				$(mySelector+"."+id).position().top-menuHeight, 
				$(mySelector+"."+id).height()+$(mySelector+"."+id).position().top, id)
			);

			///////////////////////////////////

			// get initial top offset for the menu 
			var stickyTop = smint.offset().top;	

			// check position and make sticky if needed
			var stickyMenu = function(direction){

				// current distance top
				var scrollTop = $(window).scrollTop()+myOffset; 

				// if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
				if (scrollTop > stickyTop+myOffset) { 
					smint.css({ 'position': 'fixed', 'top':0,'left':0 }).addClass('fxd');

					// add padding to the body to make up for the loss in heigt when the menu goes to a fixed position.
					// When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
					$('body').css('padding-top', menuHeight );	
				} else {
					smint.css( 'position', 'relative').removeClass('fxd'); 
					//remove the padding we added.
					$('body').css('padding-top', '0' );	
				}   

				// Check if the position is inside then change the menu
				// Courtesy of Ryan Clarke (@clarkieryan)
				if(optionLocs[index][0] <= scrollTop && scrollTop <= optionLocs[index][1]){	
					if(direction == "up"){
						$("#"+id).addClass("active");
						$("#"+optionLocs[index+1][2]).removeClass("active");
					} else if(index > 0) {
						$("#"+id).addClass("active");
						$("#"+optionLocs[index-1][2]).removeClass("active");
					} else if(direction == undefined){
						$("#"+id).addClass("active");
					}
					$.each(optionLocs, function(i){
						if(id != optionLocs[i][2]){
							
							$("#"+optionLocs[i][2]).removeClass("active");
						}
					});
				}
			};

			// run functions
			stickyMenu();

			// run function every time you scroll
			$(window).scroll(function() {
				//Get the direction of scroll
				var st = $(this).scrollTop()+myOffset;
				if (st > lastScrollTop) {
				    direction = "down";
				} else if (st < lastScrollTop ){
				    direction = "up";
				}
				lastScrollTop = st;
				stickyMenu(direction);

				// Check if at bottom of page, if so, add class to last <a> as sometimes the last div
				// isnt long enough to scroll to the top of the page and trigger the active state.

				if($(window).scrollTop() + $(window).height() == $(document).height()) {
	       			smintA.removeClass('active')
	       			$(".smint a:not('.extLink'):last").addClass('active')
	       			
   				} else {
   					smintA.last().removeClass('active')
   				}
			});

			///////////////////////////////////////
        
        	$(this).on('click', function(e){
				// gets the height of the users div. This is used for off-setting the scroll so the menu doesnt overlap any content in the div they jst scrolled to
				var myOffset = smint.height();   

        		// stops hrefs making the page jump when clicked
				e.preventDefault();
				
				// get the hash of the button you just clicked
				var hash = $(this).attr('href').split('#')[1];

				

				var goTo =  $(mySelector+'.'+ hash).offset().top-myOffset;
				
				// Scroll the page to the desired position!
				$("html, body").stop().animate({ scrollTop: goTo }, scrollSpeed);
				
				// if the link has the '.extLink' class it will be ignored 
		 		// Courtesy of mcpacosy ‏(@mcpacosy)
				if ($(this).hasClass("extLink"))
                {
                    return false;
                }

			});	


			//This lets yo use links in body text to scroll. Just add the class 'intLink' to your button and it will scroll

			$('.intLink').on('click', function(e){
				var myOffset = smint.height();   

				e.preventDefault();
				
				var hash = $(this).attr('href').split('#')[1];

				if (smint.hasClass('fxd')) {
					var goTo =  $(mySelector+'.'+ hash).position().top-myOffset;
				} else {
					var goTo =  $(mySelector+'.'+ hash).position().top-myOffset*2;
				}
				
				$("html, body").stop().animate({ scrollTop: goTo }, scrollSpeed);

				if ($(this).hasClass("extLink"))
                {
                    return false;
                }

			});	
		});

	};

	$.fn.smint.defaults = { 'scrollSpeed': 500, 'mySelector': 'div'};
})(jQuery);