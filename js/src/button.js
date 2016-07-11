/**
 * Represent the start button in the slot machine
 *
 * @constructor
 * @param {Object} args
 */
var Button = function (args) {
  var settings = $.extend({
    container: '#button-container',
    parent: {}
  }, args||{});

  this.container = $(settings.container);
  this.parent = settings.parent;

  // Set event bindings
  this.onClick();
};

/**
 * Number of spins per reel
 *
 * @const {Number}
 */
Button.SPINS = 3;

/**
 * Spin the machine reels when clicking button
 */
Button.prototype.onClick = function () {
  var self = this;
  this.container.on('click', function () {
    // Disable button
    self.container.attr('disabled', true);

    // Update button text 
    self.container.text('Wait...');

    // Spin reels three times
    self.parent.spin(Button.SPINS)
      .then(function () {
        // Enable button
        self.container.attr('disabled', false);

        // Reset button text
        self.container.text('Start');
      });
  });
};

module.exports = Button;

