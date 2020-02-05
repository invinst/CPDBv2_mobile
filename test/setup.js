import 'should-sinon';
import sinon from 'sinon';

window.Intercom = function () {};
window.ga = function () {};
window.clicky = { log: function () {} };

mocha.suite.afterEach(function () {
  sinon.restore();
});
