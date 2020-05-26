const events = require('events');

const CHECK_INTERVAL = 100;

class WaitForAlertText extends events.EventEmitter {
  constructor() {
    super();
    this.startTimeInMilliseconds = null;
  }

  command(callback, timeoutInMilliseconds=null) {
    this.startTimeInMilliseconds = new Date().getTime();

    if (typeof timeoutInMilliseconds !== 'number') {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }

    this.repeatedlyCheck(
      result => {
        callback(result);
        this.emit('complete');
      },
      timeoutInMilliseconds
    );

    return this;
  }

  repeatedlyCheck(callback, maxTimeInMilliseconds) {
    this.api.getAlertText(
      result => {
        const now = new Date().getTime();
        if (typeof(result.value) === 'string') {
          callback(result.value);
        } else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
          setTimeout(
            () => this.repeatedlyCheck(callback, maxTimeInMilliseconds),
            CHECK_INTERVAL
          );
        } else {
          callback(null);
        }
      }
    );
  }
}

module.exports = WaitForAlertText;
