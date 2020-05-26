import 'should-sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import appConfig from 'utils/app-config';
import { softBlackColor } from 'utils/styles';


window.Intercom = function () {};
window.ga = function () {};
window.clicky = { log: function () {} };
configure({ adapter: new Adapter() });

mocha.suite.beforeEach(function () {
  appConfig.set({
    'VISUAL_TOKEN_COLORS': [
      { lower: 0, upper: 5, backgroundColor: '#F5F4F4', textColor: softBlackColor },
      { lower: 5, upper: 30, backgroundColor: '#F9D3C3', textColor: softBlackColor },
      { lower: 30, upper: 50, backgroundColor: '#F4A298', textColor: softBlackColor },
      { lower: 50, upper: 70, backgroundColor: '#FF6453', textColor: softBlackColor },
      { lower: 70, upper: 90, backgroundColor: '#FF412C', textColor: softBlackColor },
      { lower: 90, upper: 100, backgroundColor: '#F52524', textColor: '#DFDFDF' },
    ],
  });
});

mocha.suite.afterEach(function () {
  sinon.restore();
});
