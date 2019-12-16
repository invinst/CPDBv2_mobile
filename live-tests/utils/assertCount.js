var assert = require('assert');

exports.command = function (selector, count, selectorType='css selector') {
  this.elements(
    selectorType,
    selector,
    items => assert.equal(items.value.length, count)
  );
};
