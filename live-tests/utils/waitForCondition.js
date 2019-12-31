const events = require('events');
const assert = require('assert');

const CHECK_INTERVAL = 100;


class WaitForCondition extends events.EventEmitter {
  constructor() {
    super();
    this.startTimeInMilliseconds = null;
  }

  command(condition, timeoutInMilliseconds=null) {
    this.startTimeInMilliseconds = new Date().getTime();

    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }

    this.repeatedlyCheckCondition(
      condition,
      result => {
        assert.equal(
          result,
          true,
          `Expression wasn't true in ${timeoutInMilliseconds} ms.`
        );
        this.emit('complete');
      },
      timeoutInMilliseconds
    );

    return this;
  }

  repeatedlyCheckCondition(condition, callback, maxTimeInMilliseconds) {
    const now = new Date().getTime();
    if (condition()) {
      callback(true);
    } else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
      setTimeout(
        () => this.repeatedlyCheckCondition(condition, callback, maxTimeInMilliseconds),
        CHECK_INTERVAL
      );
    } else {
      callback(false);
    }
  }
}

module.exports = WaitForCondition;
