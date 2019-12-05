const events = require('events');
const assert = require('assert');

const CHECK_INTERVAL = 100;

function isSamePosition(previousPosition, currentPosition) {
  return previousPosition && previousPosition.x === currentPosition.x && previousPosition.y === currentPosition.y;
}

class WaitForAnimationEnd extends events.EventEmitter {
  constructor() {
    super();
    this.startTimeInMilliseconds = null;
  }

  command(element, timeoutInMilliseconds) {
    this.startTimeInMilliseconds = new Date().getTime();

    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }

    this.repeatedlyCheckPosition(
      element,
      result => {
        assert.equal(
          result,
          true,
          `waitForAnimationEnd: ${element}. Expression wasn't true in ${timeoutInMilliseconds} ms.`
        );
        this.emit('complete');
      },
      timeoutInMilliseconds
    );

    return this;
  }

  repeatedlyCheckPosition(element, callback, maxTimeInMilliseconds, previousPosition = null) {
    this.api.getLocation(
      element,
      result => {
        const now = new Date().getTime();
        if (result.status === 0 && isSamePosition(previousPosition, result.value)) {
          callback(true);
        } else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
          setTimeout(
            () => this.repeatedlyCheckPosition(element, callback, maxTimeInMilliseconds, result.value),
            CHECK_INTERVAL
          );
        } else {
          callback(false);
        }
      }
    );
  }
}

module.exports = WaitForAnimationEnd;
