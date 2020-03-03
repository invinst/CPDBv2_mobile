import { spy } from 'sinon';

import * as IntercomTracking from 'utils/intercom-tracking';


describe('IntercomTracking', function () {
  beforeEach(function () {
    spy(window, 'Intercom');
  });

  describe('trackOpenExplainer', function () {
    it('should call Intercom correctly', function () {
      IntercomTracking.trackOpenExplainer(123);

      window.Intercom.calledWith('trackEvent', 'visual_token_explainer', { officerId: 123 }).should.be.true();
    });
  });

  describe('trackSearchPage', function () {
    it('should call Intercom correctly', function () {
      IntercomTracking.trackSearchPage();

      window.Intercom.calledWith('trackEvent', 'search_page').should.be.true();
    });
  });
});
