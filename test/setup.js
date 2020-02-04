import 'should-sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';

window.Intercom = function () {};
window.ga = function () {};
window.clicky = { log: function () {} };
configure({ adapter: new Adapter() });

mocha.suite.afterEach(function () {
  sinon.restore();
});
