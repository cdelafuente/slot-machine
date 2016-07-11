/**
 * Represent the display section of the slot machine
 * 
 * @constructor
 * @param {Object} args
 */
var Display = function (args) {
  var settings = $.extend({
    container: '#display-container'
  }, args||{});

  this.container = $(settings.container);
};

/**
 * Show message on display
 */
Display.prototype.show = function (message) {
  this.container.find('.display__message').text(message);
};

module.exports = Display;

