import { spy } from 'sinon';

import { trackOpenExplainer } from 'utils/google_analytics_tracking';


describe('trackOpenExplainer', function () {
  beforeEach(function () {
    spy(window, 'ga');
  });

  afterEach(function () {
    window.ga.restore();
  });

  it('should call ga correctly', function () {
    trackOpenExplainer(123);

    window.ga.calledWith('send', {
      hitType: 'event',
      eventCategory: 'visual_token_explainer',
      eventAction: 'open',
      eventValue: 123
    }).should.be.true();
  });
});
