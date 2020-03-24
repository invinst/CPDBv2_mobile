exports.command = function (cssSelector, xDistance, yDistance) {
  this
    .moveToElement(cssSelector, 50, 50)
    .mouseButtonDown(0)
    .moveToElement(cssSelector, 50 + xDistance, 50 + yDistance)
    .mouseButtonUp(0);
};
