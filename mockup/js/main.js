/* globals window:true, jQuery:true */
jQuery(function ($) {
  "use strict";
  
  // home page jumbo slider
  $('header .slides').each(function () {
     var $slider = $(this),
         $items = $slider.find('ul.items'),
         $slides = $items.children('li'),
         $prev = $slider.find('a.slider-prev'),
         $next = $slider.find('a.slider-next'),
         $pager = $slider.find('.slider-pages'),
         current = 0;
    
    if ($pager.length)
      $pager
          .append( new Array($slides.length + 1).join('<a href="">&bull;</a>') )
          .children('a:first').toggleClass('active');
    
    
  });
  
  // list slider behavior
  $('.list.slider').each(function () {
    function scrollBy(offset) {
      var index = Math.max(0, Math.min($slides.length, current + offset));
      if (index != current)
        $items.stop(true).animate({
          scrollLeft: (current = index) * $slides.first().outerWidth(true)
        });
      
      $prev.toggleClass('disabled', !current);
      $next.toggleClass('disabled', current + visible >= $slides.length);
    }
    
    var $slider = $(this),
        $items = $slider.find('ul.items'),
        $slides = $items.children('li'),
        $prev = $slider.find('a.slider-prev'),
        $next = $slider.find('a.slider-next'),
        current = 0,
        visible = 0;

    $prev.on('click', function (e) {
        e.preventDefault();
        scrollBy(-1);
      });
    
    $next.on('click', function (e) {
        e.preventDefault();
        scrollBy(1);
      });
    
    $(window).on('resize', function () {
        // calculate number of visible items
        visible = ($items.outerWidth() / $slides.first().outerWidth(true))|0;
        
        // fix first visible item
        $items.stop(true).scrollLeft(current * $slides.first().outerWidth(true));
      
        // update controls
        scrollBy(0);
      }).trigger('resize');
  });
  
});