import { spy } from 'sinon';

import { showIntercomLauncher } from 'utils/intercom';


describe('Intercom utils', function () {
  let oldIntercom;

  beforeEach(function () {
    oldIntercom = window.Intercom;
    window.Intercom = function () {};
    spy(window, 'Intercom');
  });

  afterEach(function () {
    window.Intercom.restore();
    window.Intercom = oldIntercom;
  });

  it('showIntercomLauncher should call Intercom correctly', function () {
    showIntercomLauncher(true);
    window.Intercom.calledWith('update', { 'hide_default_launcher': false }).should.be.true();
  });
});