/**
 * Represents a reel in the slot machine
 *
 * @constructor
 * @param {Object} args
 */
var Reel = function (args) {
  var settings = $.extend({
    container: '#reel-container'
  }, args||{});

  this.container = $(settings.container);
};

/**
 * Delay for spin animation
 *
 * @const {Number}
 */
Reel.DELAY = 500;

/**
 * Event name for spin end
 *
 * @const {String}
 */
Reel.SPIN_END_EVT = 'reel.spin.end';

/**
 * Make reel to give a complete spin
 */
Reel.prototype._spin = function () {
  var deferred = $.Deferred();

  // Spin reel
  var self = this;
  this.container.animate({ top: '-612px' }, Reel.DELAY, 'linear', function () {
    // Reset position
    self.container.css({ top: 0 });

    // Resolve promise
    deferred.resolve();
  });

  // Return promise
  return deferred.promise();
};


/**
 * Spin reel n times
 *
 * @param {Number} n
 * @returns {Promise}
 */
Reel.prototype.spin = function (n) {
  var deferred = $.Deferred();

  // Spin reel n times
  var self = this;
  this._spin().then(function () {
    var promise;
    for (var i = n - 1; i > 0; i--) {
      promise = self._spin();
    }

    promise.then(function () {
      // Generate random choice
      var position = 204 + (204 * Math.floor(Math.random() * 3));

      // Make final spin
      var top = '-' + position + 'px';
      self.container.animate({ top: top }, Reel.DELAY, 'linear', function () {
        deferred.resolve();
      });
    }); 
  });

  return deferred.promise();
};

/**
 * Get the value of current value on the reel
 *
 * @returns {String}
 */
Reel.prototype.value = function () {
  var position = this.container.position();
  var top = position.top < 0 ? position.top * -1 : position.top;
  var index = top / 204;
  var item = this.container.find('.reel__item').eq(index);
  
  return item.data('value');
};

module.exports = Reel;

