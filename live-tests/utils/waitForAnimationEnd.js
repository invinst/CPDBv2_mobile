const util = require('util');
const events = require('events');
const assert = require('assert');


const CHECK_INTERVAL = 100;

function checker(previousPosition, currentPosition) {
  return previousPosition && previousPosition.x === currentPosition.x && previousPosition.y === currentPosition.y;
}

function WaitForAnimationEnd() {
  events.EventEmitter.call(this);
  this.startTimeInMilliseconds = null;
}

util.inherits(WaitForAnimationEnd, events.EventEmitter);

WaitForAnimationEnd.prototype.command = function (element, timeoutInMilliseconds) {
  this.startTimeInMilliseconds = new Date().getTime();
  const self = this;

  if (typeof timeoutInMilliseconds !== 'number') {
    timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
  }

  this.check(element, function (result) {
    assert.equal(
      result,
      true,
      'waitForAnimationEnd: ' + element + '. Expression wasn\'t true in ' + timeoutInMilliseconds + ' ms.'
    );
    self.emit('complete');
  }, timeoutInMilliseconds);

  return this;
};

WaitForAnimationEnd.prototype.check = function (element, callback, maxTimeInMilliseconds, currentPosition = null) {
  const self = this;

  this.api.getLocation(element, function (result) {
    const now = new Date().getTime();
    if (result.status === 0 && checker(currentPosition, result.value)) {
      callback(true, now);
    } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
      this.currentPosition = result.value;
      setTimeout(function () {
        self.check(element, callback, maxTimeInMilliseconds, result.value);
      }, CHECK_INTERVAL);
    } else {
      callback(false);
    }
  });
};

module.exports = WaitForAnimationEnd;
