var assert = require('assert');

function isInViewport(currentPosition, elementSize, windowSize) {
  return currentPosition.x > 0 && currentPosition.x + elementSize.width < windowSize.width &&
    currentPosition.y > 0 && currentPosition.y + elementSize.height < windowSize.height;
}

exports.command = function (selector, selectorType='css selector', inViewport=true) {
  let currentPosition, elementSize, windowSize;

  this.windowSize('current', windowSizeResult => windowSize = windowSizeResult.value)
    .getElementSize(selectorType, selector, elementSizeResult => elementSize = elementSizeResult.value)
    .getLocation(selectorType, selector, locationResult => currentPosition = locationResult.value)
    .perform(() => {
      assert.equal(
        isInViewport(currentPosition, elementSize, windowSize),
        inViewport,
        `Expect Element ${selector} to be ${inViewport ? '' : 'not '}in viewport.`
      );
    });
};
