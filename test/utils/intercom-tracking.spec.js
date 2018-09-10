import { spy } from 'sinon';

import { trackOpenExplainer } from 'utils/intercom-tracking';


describe('IntercomTracking', function () {
  beforeEach(function () {
    spy(window, 'Intercom');
  });

  afterEach(function () {
    window.Intercom.restore();
  });

  it('trackOpenExplainer should call Intercom correctly', function () {
    trackOpenExplainer(123);

    window.Intercom.calledWith('trackEvent', 'visual_token_explainer', { officerId: 123 }).should.be.true();
  });
});
