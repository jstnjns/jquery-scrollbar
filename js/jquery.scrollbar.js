/**
 * --------------------------------------------------------------------
 * jQuery  Scrollbar
 * Author: Justin Jones, justin@jstnjns.com
 * Version: 0.0.1
 * Copyright (c) 2011 Justin Jones
 *
 * A simple, flexible, and stylable scrollbar widget
 *
 * --------------------------------------------------------------------
 */
(function($) {

  $.widget('jstnjns.scrollbar', {
    options : {
      wrapperClass : 'ui-scrollbar',
      contentClass : 'ui-scrollbar-content',
      gutterClass : 'ui-scrollbar-gutter',
      handleClass : 'ui-scrollbar-handle'
    },

    _create : function() {
      self = this;

      this.percent = 0;
      this.contents = this.element.contents();

      this.$wrapper = $(this.element).addClass(this.options.wrapperClass),
      this.$content = $('<div>', {
                          'class' : this.options.contentClass
                        })
                          .append(this.contents)
                          .appendTo(this.$wrapper),
      this.$gutter = $('<div>', {
                          'class' : this.options.gutterClass
                        })
                          .hide()
                          .appendTo(this.$wrapper),
      this.$handle = $('<a>', {
                          'class' : this.options.handleClass
                        })
                          .draggable({
                            'axis' : 'y',
                            'containment' : this.$gutter,

                            'drag' : function(e) {
                              self._drag(e);
                            }
                          })
                          .appendTo(this.$gutter);
    },

    _init : function() {
      var self = this;

      $(window)
        .bind('resize', function() { self._resize(); })
        .trigger('resize');

      this.$gutter.show();
    },

    _getHandleHeight : function() {
      return this.$wrapper.outerHeight() /
        this.$content.outerHeight() *
        this.$gutter.outerHeight();
    },

    _getHandlePosition : function() {
      return this.percent = this.$handle.position().top /
        (this.$gutter.outerHeight() - this.$handle.outerHeight());
    },

    _setContentPosition : function(percent) {
      var dimension = this.$content.outerHeight() - this.$wrapper.outerHeight();

      this.$content.css('top', -percent * dimension);
    },

    _setHandlePosition : function(percent) {
      var dimension = this.$gutter.outerHeight() - this.$handle.outerHeight();

      this.$handle.css('top', percent * dimension);
    },

    _drag : function() {
      var percent = this._getHandlePosition();

      this._setContentPosition(percent)
    },

    _resize : function() {
      this.$handle.css({
        'height' : this._getHandleHeight()
      });

      this.scrollto(percent);
    },

    scrollto : function(percent) {
      this._setHandlePosition(this.percent);
      this._setContentPosition(this.percent);
    }
  });

}(jQuery));