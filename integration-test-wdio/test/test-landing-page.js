// import searchPage from '../page-objects/search-page';
import landingPage from '../page-objects/landing-page';
// import pinboardPage from '../page-objects/pinboard-page';
import api from '../../integration-test/mock-api';
import { TIMEOUT } from '../constants';
const {
  mockLandingPageCms,
  mockTopOfficersByAllegation,
  mockRecentActivities,
  mockNewDocuments,
  mockComplaintSummaries,
  mockTopLawsuits,
} = require(__dirname + '/../../integration-test/mock-data/main-page');
// import {
//   emptyPinboard,
//   emptyPinboardData,
//   pinTopOfficerRequestData,
//   pinRecentActivityOfficerRequestData,
//   pinNewDocumentRequestData,
//   pinComplaintRequestData,
// } from '../mock-data/landing-page';
import { mockCommonApi } from '../mock-data/utils';


describe('LandingPage test', function () {
  beforeEach(function () {
    api.clean();
    mockCommonApi();
    api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
    api.onGet('/api/v2/cms-pages/landing-page/').reply(200, mockLandingPageCms);
    api.onGet('/api/v2/officers/top-by-allegation/').reply(200, mockTopOfficersByAllegation);
    api.onGet('/api/v2/activity-grid/').reply(200, mockRecentActivities);
    api.onGet('/api/v2/cr/list-by-new-document/').reply(200, mockNewDocuments);
    api.onGet('/api/v2/cr/complaint-summaries/').reply(200, mockComplaintSummaries);
    api.onGet('/api/v2/lawsuit/top-lawsuits/').reply(200, mockTopLawsuits);

    landingPage.open();
    landingPage.body.waitForExist();
  });

  it('should show homepage with logo and navigation links', function () {
    landingPage.title.getText().should.containEql('Citizens Police Data Project');
    landingPage.searchLink.waitForDisplayed();
  });

  it('should navigate to Search page when user clicks on fake search box', function () {
    landingPage.searchLink.click();
    browser.getUrl().should.containEql('/search');
  });

  it('should show footer link and invist logo', function () {
    const footer = landingPage.footer;

    footer.github.getText().should.equal('Github');
    footer.github.getAttribute('href').should.equal('https://github.com/invinst/');
    footer.logo.getAttribute('href').should.equal('https://invisible.institute/cpdp');
  });

  it('should open and close legal modal', function () {
    const footer = landingPage.footer;
    const legalModal = landingPage.legalModal;

    footer.legal.click();
    legalModal.content.waitForDisplayed();
    legalModal.closeButton.click();
    legalModal.content.waitForExist(TIMEOUT, true);

    footer.legal.click();
    legalModal.content.waitForDisplayed();
    legalModal.understandButton.click();
    legalModal.content.waitForExist(TIMEOUT, true);
  });

  it('should go to the landing page when the url does not match any route', function () {
    landingPage.open('/url-mediator/session-builder/');
    landingPage.currentBasePath.should.equal('/');

    landingPage.open('/something/really/wrong/');
    landingPage.currentBasePath.should.equal('/');
  });

  // describe('Recent Activity carousel', function () {
  //   it('should render correct colors for radar chart', function () {
  //     const topOfficersByAllegation = landingPage.topOfficersByAllegation;
  //     topOfficersByAllegation.firstRadarChart.getCSSProperty('background-color')
  //       .value.should.equal('rgba(245,37,36,1)');
  //     topOfficersByAllegation.secondRadarChart.getCSSProperty('background-color')
  //       .value.should.equal('rgba(255,65,44,1)');
  //     topOfficersByAllegation.thirdRadarChart.getCSSProperty('background-color')
  //       .value.should.equal('rgba(255,100,83,1)');
  //     topOfficersByAllegation.forthRadarChart.getCSSProperty('background-color')
  //       .value.should.equal('rgba(244,162,152,1)');
  //     topOfficersByAllegation.fifthRadarChart.getCSSProperty('background-color')
  //       .value.should.equal('rgba(249,211,195,1)');
  //   });

    it('should go to officer summary page when clicking on officer card', function () {
      landingPage.recentActivities.cards.count.should.equal(2);
      landingPage.recentActivities.firstCard.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/?$/);
    });
  });

  describe('Officers By Allegation carousel', function () {
    it('should go to officer summary page when click to card', function () {
      landingPage.topOfficersByAllegation.cards.count.should.equal(5);
      landingPage.topOfficersByAllegation.firstCard.click();
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/?$/);
    });
  });

  describe('Recent Document Carousel', function () {
    it('should go to cr page when click to card', function () {
      landingPage.newDocumentAllegations.cards.count.should.equal(2);
      landingPage.newDocumentAllegations.firstCard.click();
      browser.getUrl().should.containEql('/complaint/170123/');
    });
  });

  // describe('Complaint Summaries Carousel', function () {
  //   it('should go to cr page when click to card', function () {
  //     landingPage.complaintSummaries.cards.count.should.equal(2);
  //     landingPage.complaintSummaries.firstCard.click();
  //     browser.getUrl().should.match(/\/complaint\/\w+\/$/);
  //   });
  // });

  describe('Top Lawsuits Carousel', function () {
    it('should go to lawsuit page when click to card', function () {
      landingPage.topLawsuits.cards.count.should.equal(2);
      landingPage.topLawsuits.firstCard.click();
      browser.getUrl().should.containEql('/lawsuit/00-L-1234');
    });
  });

  // describe('Pinboard function', function () {
  //   it('should display toast when pinning cards', function () {
  //     api
  //       .onPost('/api/v2/mobile/pinboards/', emptyPinboardData)
  //       .reply(201, emptyPinboard);
  //     api
  //       .onPost('/api/v2/mobile/pinboards/', pinTopOfficerRequestData)
  //       .reply(201, pinTopOfficerRequestData);
  //     api
  //       .onPut('/api/v2/mobile/pinboards/5cd06f2b/', pinRecentActivityOfficerRequestData)
  //       .reply(200, pinRecentActivityOfficerRequestData);
  //     api
  //       .onPut('/api/v2/mobile/pinboards/5cd06f2b/', pinNewDocumentRequestData)
  //       .reply(200, pinNewDocumentRequestData);
  //     api
  //       .onPut('/api/v2/mobile/pinboards/5cd06f2b/', pinComplaintRequestData)
  //       .reply(200, pinComplaintRequestData);

  //     const checkPinToast = (parentSelector, messagePrefix) => {
  //       //Pin item
  //       parentSelector.pinButton.waitForExist();
  //       parentSelector.pinButton.scrollIntoView();
  //       parentSelector.pinButton.moveTo();
  //       parentSelector.pinButton.click();

  //       //Check toast
  //       landingPage.lastToast.waitForDisplayed();
  //       landingPage.lastToast.waitForText(
  //         `${messagePrefix} added to pinboard\nGo to pinboard`,
  //         TIMEOUT
  //       );

  //       //Go to Search Page and check for pinboard item counts
  //       landingPage.searchLink.scrollIntoView();
  //       landingPage.searchLink.moveTo();
  //       landingPage.lastToast.waitForDisplayed(TIMEOUT, true);
  //       landingPage.searchLink.click();
  //       searchPage.pinboardBar.waitForText('Pinboard (1)', TIMEOUT);
  //       browser.back();

  //       //Unpin item
  //       parentSelector.pinButton.waitForExist();
  //       parentSelector.pinButton.scrollIntoView();
  //       parentSelector.pinButton.moveTo();
  //       parentSelector.pinButton.click();

  //       //Check toast
  //       landingPage.lastToast.waitForDisplayed();
  //       landingPage.lastToast.waitForText(
  //         `${messagePrefix} removed from pinboard\nGo to pinboard`,
  //         TIMEOUT
  //       );

  //       //Go to Search Page and check for pinboard item counts
  //       landingPage.searchLink.scrollIntoView();
  //       landingPage.searchLink.moveTo();
  //       landingPage.lastToast.waitForDisplayed(TIMEOUT, true);
  //       landingPage.searchLink.click();

  //       searchPage.queryInput.waitForExist();
  //       searchPage.pinboardBar.waitForDisplayed(TIMEOUT, true);
  //       browser.back();
  //     };

  //     checkPinToast(landingPage.topOfficersByAllegation, 'Broderick Jones');
  //     checkPinToast(landingPage.recentActivities, 'Broderick Jones');
  //     checkPinToast(landingPage.newDocumentAllegations, 'CR #170123');
  //     checkPinToast(landingPage.complaintSummaries, 'CR #123');
  //   });
  // });

  it('should have clicky installed ', function () {
    landingPage.clickyScript.waitForExist();
    landingPage.clickySiteIdsScript.waitForExist();
    landingPage.clickyNoJavascriptGIF.waitForExist();
  });

  // describe('Pinboard Introduction', function () {
  //   beforeEach(function () {
  //     browser.clearReduxStore(true);
  //     landingPage.body.waitForDisplayed();
  //   });

  //   it('should display Pinboard introduction on first visited', function () {
  //     landingPage.pinboardButtonIntroduction.introductionContent.waitForExist(PINBOARD_INTRODUCTION_DELAY);
  //   });

  //   it('should not display Pinboard introduction after click close button', function () {
  //     landingPage.pinboardButtonIntroduction.introductionContent.waitForExist(PINBOARD_INTRODUCTION_DELAY);
  //     landingPage.pinboardButtonIntroduction.closeButton.click();
  //     browser.pause(PINBOARD_INTRODUCTION_DELAY);
  //     landingPage.pinboardButtonIntroduction.introductionContent.waitForExist(TIMEOUT, true);
  //     browser.refresh();
  //     landingPage.body.waitForExist();
  //     browser.pause(PINBOARD_INTRODUCTION_DELAY);
  //     landingPage.pinboardButtonIntroduction.introductionContent.waitForExist(TIMEOUT, true);
  //   });

  //   it('should not display Pinboard introduction after click try it', function () {
  //     landingPage.pinboardButtonIntroduction.introductionContent.waitForExist(PINBOARD_INTRODUCTION_DELAY);
  //     landingPage.pinboardButtonIntroduction.tryItButton.click();
  //     pinboardPage.searchBar.waitForExist();
  //     landingPage.open();
  //     landingPage.body.waitForExist();
  //     browser.pause(PINBOARD_INTRODUCTION_DELAY);
  //     landingPage.pinboardButtonIntroduction.introductionContent.waitForExist(TIMEOUT, true);
  //   });

  //   it('should not display Pinboard introduction after click Pinboard button', function () {
  //     landingPage.pinboardButtonIntroduction.introductionContent.waitForExist(PINBOARD_INTRODUCTION_DELAY);
  //     landingPage.pinboardButton.click();
  //     pinboardPage.searchBar.waitForExist();
  //     landingPage.open();
  //     landingPage.body.waitForExist();
  //     browser.pause(PINBOARD_INTRODUCTION_DELAY);
  //     landingPage.pinboardButtonIntroduction.introductionContent.waitForExist(TIMEOUT, true);
  //   });
  // });
});
