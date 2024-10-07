(function($) {
    function fixIframeAspect() {
        $('iframe').each(function () {
            var aspect = $(this).attr('height') / $(this).attr('width');
            $(this).height($(this).width() * aspect);
        });
    }

    function framerateCallback(callback) {
        var waiting = false;
        callback = callback.bind(this);
        return function () {
            if (!waiting) {
                waiting = true;
                window.requestAnimationFrame(function () {
                    callback();
                    waiting = false;
                });
            }
        }
    }

    $(document).ready(function() {
        $('header nav').addClass('closed');

        $('header nav').click(function() {
            $(this).toggleClass('open').toggleClass('closed');
        });
        
        var expandString = Omeka.jsTranslate('Expand');
        var collapseString = Omeka.jsTranslate('Collapse');

        $('header nav ul ul').each(function(){
          var childMenu = $(this);
          var parentItem = childMenu.parent('li');
          var toggleButton = $('<button type="button" class="child-toggle"></button>');
          toggleButton.attr('aria-label', expandString);
          parentItem.addClass('parent');
          parentItem.children('a').first().wrap('<div class="parent-link"></div>');
          parentItem.find('.parent-link').append(toggleButton);
        });
        
        $('header nav ul button.child-toggle').on('click', function(){
            var parent = jQuery(this).parents('.parent-link');
            jQuery('+ ul', parent).slideToggle(300);
        });
        
        // $('header nav').on('click', '.child-toggle', function(e) {
        //   e.stopPropagation();
        //   var childToggle = $(this);
        //   var childMenu = childToggle.parents('.parent').first().find('ul').first();
        //   childMenu.toggleClass('open');
        //   if (childMenu.hasClass('open')) {
        //     childToggle.attr('aria-label', collapseString);
        //   } else {
        //     childToggle.attr('aria-label', expandString);
        //   }
        // });
        
        // Maintain iframe aspect ratios
        $(window).on('load resize', framerateCallback(fixIframeAspect));
        fixIframeAspect();
        
        $('header').on('click', '#search:not(.active) button', function(e){
            
            e.preventDefault();
            
            $('#search').addClass('active');
            $('#search input').focus();
            
            return false;
            
        });
        
        $('#search input').on('click', function(e){
                    
            e.stopPropagation();
            
        });
        
        $('html').on('click', function(e){
            $('#search').removeClass('active');
        });
        
        $('.contact-us-block input[type="checkbox"]').each(function(){
            $(this).parents('.field').addClass('checkbox');
        });
        
        $('.contact-us-block input[type="radio"]').each(function(){
            $(this).parents('.field').addClass('radio');
        });
        
        $('#mobile-menu-button').on('click', function(){
            jQuery('html').toggleClass('mobile-open');
        });
        
        setTimeout(function(){
            
            if ( $('.slick-initialized').length) { 
            
                $('.slick-initialized').slick('slickSetOption', {
                   responsive: [
                       {
                         breakpoint: 1070,
                         settings: {
                            slidesToShow: 2
                         }
                       },
                       {
                         breakpoint: 600,
                         settings: {
                            slidesToShow: 1
                         }
                       }
                     ]
                }, true);
                
            }
            
        }, 500);

    });
})(jQuery);
