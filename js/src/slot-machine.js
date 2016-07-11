var Display = require('./display.js');
var Reel = require('./reel.js');
var Button = require('./button.js');

/**
 * Represent a slot machine for generating random beverage choices
 *
 * @constructor
 * @param {Object} args
 */
var SlotMachine = function (args) {
  var settings = $.extend({
    container: '#slot-machine'
  }, args||{});

  this.container = $(settings.container);

  // Instrument display
  this.display = new Display({
    container: this.container.find('.display')
  });

  // Instrument left reel
  this.leftReel = new Reel({
    container: this.container.find('.reel--left')
  });

  // Instrument middle reel
  this.middleReel = new Reel({
    container: this.container.find('.reel--middle')
  });

  // Instrument right reel
  this.rightReel = new Reel({
    container: this.container.find('.reel--right')
  });

  // Instrument start button
  this.startButton = new Button ({
    container: this.container.find('.start-btn'),
    parent: this
  });
};

/**
 * Constant value for cofee
 *
 * @const {Number}
 */
SlotMachine.COFFEE = 1;

/**
 * Constant value for tea
 *
 * @const {Number}
 */
SlotMachine.TEA = 2;

/**
 * Constant value for espresso
 *
 * @const {Number}
 */
SlotMachine.ESPRESSO = 3;

/**
 * Spin machine reels n times
 *
 * @param {Number} n
 * @returns {Promise}
 */
SlotMachine.prototype.spin = function (n) {
  var deferred = $.Deferred();
  
  // Display message
  this.display.show('Making beverage...');

  var self = this;
  $.when(
    this.leftReel.spin(n),    // Spin left reel
    this.middleReel.spin(n),  // Spin middle reel
    this.rightReel.spin(n)    // Spin right reel
  ).then(function () {
    var left = self.leftReel.value();
    var middle = self.middleReel.value();
    var right = self.rightReel.value();

    // Check if reels are lined up
    if (left == middle && middle == right) {
      var message = '';

      switch (left) {
        case SlotMachine.COFFEE:
          message = 'Cup of coffee!';
          break;
        case SlotMachine.TEA:
          message = 'Cup of tea!';
          break;
        case SlotMachine.ESPRESSO:
          message = 'Cup of espresso!';
          break;
      }

      // Show success message
      self.display.show(message);
    }
    else {
      // Show not successful message
      self.display.show('Try again!');
    }

    // Resolve promise
    deferred.resolve();
  });
 
  // Return promise
  return deferred.promise();
};

module.exports = SlotMachine;

