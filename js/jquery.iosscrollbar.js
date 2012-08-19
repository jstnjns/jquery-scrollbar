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

  $.widget('jstnjns.iosscrollbar', {
    options : {
      wrapperClass : 'ui-iosscrollbar',
      contentClass : 'ui-iosscrollbar-content',
      gutterClass : 'ui-iosscrollbar-gutter',
      handleClass : 'ui-iosscrollbar-handle',
      hiddenClass : 'ui-iosscrollbar-hidden',

      hideDelay : 1 * 1000
    },

    _create : function() {
      self = this;

      this.percent = 0;
      this.contents = this.element.contents();

      this.$wrapper = $(this.element).addClass(this.options.wrapperClass + ' ' + this.options.hiddenClass)
                        .hover(function() {
                          clearTimeout(self.hideTimer);
                          self.$wrapper.removeClass(self.options.hiddenClass);
                        }, function() {
                          self.hideTimer = setTimeout(function() {
                            self.$wrapper.addClass(self.options.hiddenClass);
                          }, self.options.hideDelay);
                        }),
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

                            'start' : function() {
                              clearTimeout(self.hideTimer);
                            },
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
      return this.$wrapper.outerHeight() / this.$content.outerHeight() * this.$gutter.outerHeight();
    },

    _getHandlePosition : function() {
      return this.percent = this.$handle.position().top / (this.$gutter.outerHeight() - this.$handle.outerHeight());
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

      this._setHandlePosition(this.percent);
      this._setContentPosition(this.percent);
    },

    scrollto : function(percent) {

    }
  });

}(jQuery));