/**
 * --------------------------------------------------------------------
 * jQuery iOS Scrollbar
 * Author: Justin Jones, justin@jstnjns.com
 * Version: 0.0.1
 * Copyright (c) 2011 Justin Jones
 *
 * Write description
 *
 * --------------------------------------------------------------------
 */
(function($) {
  var elements = {},
      methods = {
      init : function() {
        return $(this).each(function() {
          var contents  = $(this).contents(),
              $wrapper  = $(this).addClass('ui-iosscrollbar'),
              $content  = $('<div />', { 'class' : 'ui-iosscrollbar-content' })
                            .append(contents)
                            .appendTo($wrapper),
              $gutter   = $('<div />', { 'class' : 'ui-iosscrollbar-gutter' })
                            .appendTo($wrapper),
              $handle   = $('<div />', { 'class' : 'ui-iosscrollbar-handle' })
                            .appendTo($gutter);
            
              console.log(contents);
              
        });
      }
  };


  $.fn.iOSScrollbar = function(method) {
   
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }
   
  };
})(jQuery);