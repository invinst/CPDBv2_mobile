require('should');

import landingPage from '../page-objects/landing-page';
import api from '../../integration-test/mock-api';
import { mockLandingPageCms } from '../../integration-test/mock-data/main-page';


describe('landing page', function () {
  beforeEach(function () {
    api.clean();
    api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
    api.onGet('/api/v2/cms-pages/landing-page/').reply(200, mockLandingPageCms);

    landingPage.open();
    landingPage.title.waitForDisplayed();
  });

  it('should open landing page', function () {
    landingPage.title.getText().should.equal('Citizens Police Data Project');
    landingPage.description.waitForDisplayed();
  });
});
