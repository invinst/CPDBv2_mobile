import officerPage from '../page-objects/officer-page';
import searchPage from '../page-objects/search-page';
import pinboardPage from '../page-objects/pinboard-page';
import landingPage from '../page-objects/landing-page';
import api from '../../integration-test/mock-api';
import { TIMEOUT, PINBOARD_INTRODUCTION_DELAY } from '../constants';
const pinboardMockData = require(__dirname + '/../../integration-test/mock-data/pinboard-page');
import {
  createPinboardWithRecentItemsParams,
  createPinboardWithRecentItemsResponse,
  mockSearchQueryResponse,
  mockSearchQueryResponseForRecentItems,
  mockSearchQueryResponseWithDate,
  mockOfficerSearchQueryResponse,
  mockFirstOfficersSearchQueryResponse,
  mockSecondOfficersSearchQueryResponse,
  mockDateOfficerSearchQueryResponse,
  mockInvestigatorCRSearchResponse,
  emptyPinboard,
  createPinboardResponse,
  createEmptyPinboardResponse,
  mockNewRecentSearchItemsResponse,
  officer8562,
  cr1002144,
  trr14487,
  lawsuit00L5230,
  mockNewCreatedPinboard,
  mockPinboardComplaint,
  mockComplaintPinnedItemPinboard,
  mockUpdatedComplaintPinnedItemPinboard,
  mockPinboardComplaints,
  mockSearchQueryLongResponse,
} from '../mock-data/search-page';
import { mockCommonApi } from '../mock-data/utils';


describe('SearchPageTest', function () {
  beforeEach(function () {
    api.clean();
    mockCommonApi();
    api.onGet('/api/v2/search-mobile/').reply(200, {});
    api.onGet('/api/v2/search-mobile/?term=123').reply(200, mockSearchQueryResponseForRecentItems);
    searchPage.open();
    searchPage.body.waitForExist();
    searchPage.queryInput.waitForDisplayed();
  });

  it('should show recent items', function () {
    api
      .onGet('/api/v2/search-mobile/recent-search-items/?' +
        'officer_ids[]=8562&crids[]=1002144&trr_ids[]=14487&lawsuit_ids[]=234567')
      .reply(200, mockNewRecentSearchItemsResponse);
    api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
    api.onGet('/api/v2/mobile/cr/1002144/').reply(200, cr1002144);
    api.onGet('/api/v2/mobile/trr/14487/').reply(200, trr14487);
    api.onGet('/api/v2/lawsuit/00-L-5230/').reply(200, lawsuit00L5230);
    browser.clearReduxStore();
    searchPage.queryInput.waitForDisplayed();

    searchPage.queryInput.setValue('123');
    searchPage.lawsuits.firstRow.itemTitle.click();

    searchPage.searchBreadcrumb.click();
    searchPage.officers.firstRow.itemTitle.click();

    searchPage.searchBreadcrumb.click();
    searchPage.crs.firstRow.itemTitle.click();

    searchPage.searchBreadcrumb.click();
    searchPage.trrs.firstRow.itemTitle.click();

    searchPage.searchBreadcrumb.click();
    // Empty value doesn't trigger change -> Set short query to show recent
    searchPage.queryInput.setValue('1');

    searchPage.recentHeader.waitForExist();
    let recentItems = searchPage.recent;

    recentItems.firstRecentItem.itemTitle.getText().should.equal('TRR');
    recentItems.firstRecentItem.itemSubtitle.getText().should.equal('14487');
    recentItems.secondRecentItem.itemTitle.getText().should.equal('False Arrest');
    recentItems.secondRecentItem.itemSubtitle.getText().should.equal('CRID 1002144 • 05/29/2006');
    recentItems.thirdRecentItem.itemTitle.getText().should.equal('Jerome Finnigan');
    recentItems.thirdRecentItem.itemSubtitle.getText().should.equal('Badge #5167');
    recentItems.fourthRecentItem.itemTitle.getText().should.equal('EXCESSIVE FORCE/MINOR');
    recentItems.fourthRecentItem.itemSubtitle.getText().should.equal('00-L-5230 • 09/11/2016');
    browser.pause(PINBOARD_INTRODUCTION_DELAY);
    recentItems.thirdRecentItem.pinButtonIntroduction.waitForDisplayed();

    searchPage.pinboardBar.waitForDisplayed(TIMEOUT, true);
    recentItems.firstRecentItem.pinButton.click();
    recentItems.secondRecentItem.pinButton.click();
    recentItems.thirdRecentItem.pinButton.click();
    searchPage.pinboardBar.waitForDisplayed();
    searchPage.pinboardBar.getText().should.equal('Pinboard (3)');

    recentItems.firstRecentItem.pinButton.click();
    recentItems.secondRecentItem.pinButton.click();
    recentItems.thirdRecentItem.pinButton.click();
    searchPage.pinboardBar.waitForDisplayed(TIMEOUT, true);

    searchPage.open();
    recentItems.firstRecentItem.itemTitle.getText().should.equal('TRR');
    recentItems.firstRecentItem.itemSubtitle.getText().should.equal('14487');
    recentItems.secondRecentItem.itemTitle.getText().should.equal('False Arrest');
    recentItems.secondRecentItem.itemSubtitle.getText().should.equal('CRID 1002144 • 05/29/2010');
    recentItems.thirdRecentItem.itemTitle.getText().should.equal('Jerome Finnigan');
    recentItems.thirdRecentItem.itemSubtitle.getText().should.equal('Badge #123456');
    recentItems.fourthRecentItem.itemTitle.getText().should.equal('EXCESSIVE FORCE/MINOR');
    recentItems.fourthRecentItem.itemSubtitle.getText().should.equal('00-L-5230 • 09/11/2016');
  });

  it('should go to detail page when click on recent items', function () {
    api
      .onGet('/api/v2/search-mobile/recent-search-items/?' +
        'officer_ids[]=8562&crids[]=1002144&trr_ids[]=14487&lawsuit_ids[]=234567')
      .reply(200, mockNewRecentSearchItemsResponse);
    api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
    api.onGet('/api/v2/mobile/cr/1002144/').reply(200, cr1002144);
    api.onGet('/api/v2/mobile/trr/14487/').reply(200, trr14487);
    api.onGet('/api/v2/lawsuit/00-L-5230/').reply(200, lawsuit00L5230);
    browser.clearReduxStore();
    searchPage.queryInput.waitForDisplayed();

    searchPage.queryInput.setValue('123');
    searchPage.lawsuits.firstRow.itemTitle.click();

    searchPage.searchBreadcrumb.click();
    searchPage.officers.firstRow.itemTitle.click();

    searchPage.searchBreadcrumb.click();
    searchPage.crs.firstRow.itemTitle.click();

    searchPage.searchBreadcrumb.click();
    searchPage.trrs.firstRow.itemTitle.click();

    searchPage.searchBreadcrumb.click();
    // Empty value doesn't trigger change -> Set short query to show recent
    searchPage.queryInput.setValue('1');

    searchPage.recentHeader.waitForExist();
    let recentItems = searchPage.recent;

    recentItems.firstRecentItem.itemTitle.getText().should.equal('TRR');
    recentItems.firstRecentItem.itemSubtitle.getText().should.equal('14487');
    recentItems.secondRecentItem.itemTitle.getText().should.equal('False Arrest');
    recentItems.secondRecentItem.itemSubtitle.getText().should.equal('CRID 1002144 • 05/29/2006');
    recentItems.thirdRecentItem.itemTitle.getText().should.equal('Jerome Finnigan');
    recentItems.thirdRecentItem.itemSubtitle.getText().should.equal('Badge #5167');
    recentItems.fourthRecentItem.itemTitle.getText().should.equal('EXCESSIVE FORCE/MINOR');
    recentItems.fourthRecentItem.itemSubtitle.getText().should.equal('00-L-5230 • 09/11/2016');

    recentItems.firstRecentItem.itemTitle.click();
    browser.getUrl().should.containEql('/trr/14487');
    searchPage.searchBreadcrumb.click();
    recentItems.secondRecentItem.itemTitle.click();
    browser.getUrl().should.containEql('/complaint/1002144');
    searchPage.searchBreadcrumb.click();
    recentItems.thirdRecentItem.itemTitle.click();
    browser.getUrl().should.containEql('/officer/8562/jerome-finnigan');
    searchPage.searchBreadcrumb.click();
    recentItems.fourthRecentItem.itemTitle.click();
    browser.getUrl().should.containEql('/lawsuit/00-L-5230');
  });

  it('should keep search results after coming back from other page', function () {
    api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
    const firstOfficerRow = searchPage.officers.firstRow;
    searchPage.queryInput.setValue('123');

    firstOfficerRow.itemTitle.waitForDisplayed();
    firstOfficerRow.itemTitle.getText().should.equal('Jerome Finnigan');

    searchPage.officers.firstRow.itemTitle.click();
    searchPage.searchBreadcrumb.click();

    searchPage.queryInput.getValue().should.equal('123');
    firstOfficerRow.itemTitle.waitForDisplayed();
    firstOfficerRow.itemTitle.getText().should.equal('Jerome Finnigan');
  });

  it('should clear search results after coming back from landing page', function () {
    searchPage.queryInput.setValue('123');
    searchPage.closeButton.click();

    landingPage.title.waitForDisplayed();
    landingPage.searchLink.click();

    searchPage.queryInput.waitForDisplayed();
    searchPage.queryInput.getText().should.equal('');
  });

  describe('Cancel button', function () {
    it('should go back to landing page', function () {
      searchPage.closeButton.waitForDisplayed();
      searchPage.closeButton.click();

      landingPage.currentBasePath.should.equal('/');
    });

    it('should go to pinboard page if search page was opened via pinboard page', function () {
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/').reply(200, pinboardMockData.pinboardData);
      pinboardPage.open('5cd06f2b');
      pinboardPage.searchBar.waitForDisplayed();
      pinboardPage.searchBar.click();

      searchPage.closeButton.waitForDisplayed();
      searchPage.closeButton.click();

      browser.getUrl().should.containEql('/pinboard/5cd06f2b/');
    });

    it('should go to officer page if search page was opened via breadcrumbs on officer page', function () {
      api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
      searchPage.queryInput.setValue('123');
      searchPage.officers.firstRow.itemTitle.waitForDisplayed();
      searchPage.officers.firstRow.itemTitle.click();

      officerPage.searchBreadcrumb.waitForDisplayed();
      browser.getUrl().should.containEql('/officer/8562/jerome-finnigan/');
      officerPage.searchBreadcrumb.click();

      searchPage.closeButton.waitForDisplayed();
      browser.getUrl().should.containEql('/search/');
      searchPage.closeButton.click();

      browser.getUrl().should.containEql('/officer/8562/jerome-finnigan/');
    });
  });

  context('search for wh', function () {
    beforeEach(function () {
      api.onGet('/api/v2/search-mobile/?term=wh').reply(200, mockSearchQueryResponse);
    });

    it('should show results that match search query', function () {
      searchPage.queryInput.setValue('wh');

      searchPage.officersHeader.getText().should.equal('OFFICERS');

      let officers = searchPage.officers;

      officers.firstRow.itemTitle.getText().should.equal('John Wang');
      officers.firstRow.itemSubtitle.getText().should.equal('Badge #9999');
    });

    it('should navigate to officer summary page when tapped', function () {
      searchPage.queryInput.setValue('wh');
      searchPage.officers.firstRow.itemTitle.waitForDisplayed();
      searchPage.officers.firstRow.itemTitle.click();
      browser.getUrl().should.containEql('/officer/9876/');
    });
  });

  context('search for Kelvin', function () {
    beforeEach(function () {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
    });

    it('should show results that match search query', function () {
      searchPage.queryInput.setValue('Kelvin');

      searchPage.investigatorCRsHeader.getText().should.equal('INVESTIGATOR → CR');

      const investigatorCRs = searchPage.investigatorCRs;
      investigatorCRs.firstRow.itemTitle.getText().should.equal('Criminal Misconduct');
      investigatorCRs.firstRow.itemSubtitle.getText().should.equal('CRID 123456 • 06/13/2009');
      investigatorCRs.secondRow.itemTitle.getText().should.equal('Domestic');
      investigatorCRs.secondRow.itemSubtitle.getText().should.equal('CRID 654321 • 10/13/2011');
      investigatorCRs.thirdRow.mainElement.isExisting().should.be.false();
    });

    it('should able to show INVESTIGATOR > CR results via query parameter', function () {
      searchPage.open('Kelvin');

      searchPage.investigatorCRsHeader.getText().should.equal('INVESTIGATOR → CR');

      const investigatorCRs = searchPage.investigatorCRs;

      investigatorCRs.firstRow.itemTitle.getText().should.equal('Criminal Misconduct');
      investigatorCRs.firstRow.itemSubtitle.getText().should.equal('CRID 123456 • 06/13/2009');
      investigatorCRs.secondRow.itemTitle.getText().should.equal('Domestic');
      investigatorCRs.secondRow.itemSubtitle.getText().should.equal('CRID 654321 • 10/13/2011');
      investigatorCRs.thirdRow.mainElement.isExisting().should.be.false();
    });
  });

  context('search for "2004-04-23 ke"', function () {
    beforeEach(function () {
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
    });

    it('should show date > cr and date > trr results that match search query', function () {
      searchPage.queryInput.setValue('2004-04-23 ke');

      const dateCRs = searchPage.dateCRs;
      searchPage.dateCRsHeader.waitForDisplayed(TIMEOUT);
      searchPage.dateCRsHeader.getText().should.equal('DATE → COMPLAINT RECORDS');
      dateCRs.firstRow.itemTitle.getText().should.equal('Domestic');
      dateCRs.firstRow.itemSubtitle.getText().should.equal('CRID 297449 • 10/13/2011');
      dateCRs.secondRow.itemTitle.getText().should.equal('Use Of Force');
      dateCRs.secondRow.itemSubtitle.getText().should.equal('CRID 297473 • 06/13/2009');
      dateCRs.thirdRow.mainElement.isExisting().should.be.false();

      searchPage.dateTRRsHeader.getText().should.equal('DATE → TACTICAL RESPONSE REPORTS');
      const dateTRRs = searchPage.dateTRRs;
      dateTRRs.firstRow.itemTitle.getText().should.equal('TRR');
      dateTRRs.firstRow.itemSubtitle.getText().should.equal('767');
      dateTRRs.secondRow.itemTitle.getText().should.equal('TRR');
      dateTRRs.secondRow.itemSubtitle.getText().should.equal('773');
      dateTRRs.thirdRow.mainElement.isExisting().should.be.false();

      searchPage.officersHeader.getText().should.equal('OFFICERS');
      const officers = searchPage.officers;
      officers.firstRow.itemTitle.getText().should.equal('William Eaker');
      officers.firstRow.itemSubtitle.getText().should.equal('Badge #6056');

      searchPage.crsHeader.getText().should.equal('COMPLAINT RECORDS (CRs)');
      const crs = searchPage.crs;
      crs.firstRow.itemTitle.getText().should.equal('Unknown');
      crs.firstRow.itemSubtitle.getText().should.equal('CRID 397449 • 06/13/2009');
      crs.secondRow.itemTitle.getText().should.equal('Domestic');
      crs.secondRow.itemSubtitle.getText().should.equal('CRID 397473 • 10/13/2011');
      crs.thirdRow.mainElement.isExisting().should.be.false();

      searchPage.trrsHeader.getText().should.equal('TACTICAL RESPONSE REPORTS');
      const trrs = searchPage.trrs;
      trrs.firstRow.itemTitle.getText().should.equal('TRR');
      trrs.firstRow.itemSubtitle.getText().should.equal('867');
      trrs.secondRow.itemTitle.getText().should.equal('TRR');
      trrs.secondRow.itemSubtitle.getText().should.equal('873');
      trrs.thirdRow.mainElement.isExisting().should.be.false();
    });

    it('should able to show DATE > OFFICERS results', function () {
      searchPage.queryInput.setValue('2004-04-23 ke');

      const dateOfficers = searchPage.dateOfficers;
      searchPage.dateCRsHeader.waitForDisplayed(TIMEOUT);
      searchPage.dateOfficersHeader.getText().should.equal('DATE → OFFICERS');
      dateOfficers.firstRow.itemTitle.getText().should.equal('Jerome Finnigan');
      dateOfficers.firstRow.itemSubtitle.getText().should.equal('Badge #6789');
    });
  });

  context('single search', function () {
    it('should show single search result when click on "ALL"', function () {
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=OFFICER')
        .reply(200, mockOfficerSearchQueryResponse);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=DATE+%3E+OFFICERS')
        .reply(200, mockDateOfficerSearchQueryResponse);

      searchPage.queryInput.setValue('2004-04-23 ke');

      searchPage.dateCRsHeader.waitForExist(TIMEOUT);
      searchPage.dateTRRsHeader.waitForExist();
      searchPage.dateOfficersHeader.waitForExist();
      searchPage.crsHeader.waitForExist();
      searchPage.trrsHeader.waitForExist();
      searchPage.officersHeader.waitForExist();

      const officersRows = searchPage.officers.rows;
      officersRows.count.should.equal(1);

      searchPage.officers.allLink.click();

      searchPage.dateCRsHeader.waitForExist(TIMEOUT, true);
      searchPage.dateTRRsHeader.isExisting().should.be.false();
      searchPage.dateOfficersHeader.isExisting().should.be.false();
      searchPage.crsHeader.isExisting().should.be.false();
      searchPage.trrsHeader.isExisting().should.be.false();
      searchPage.officersHeader.waitForExist();

      searchPage.queryInput.getValue().should.equal('officer:2004-04-23 ke');

      officersRows.count.should.equal(2);

      searchPage.backToFullSearchLink.click();
      searchPage.dateCRsHeader.waitForExist(TIMEOUT);
      searchPage.dateTRRsHeader.waitForExist();
      searchPage.dateOfficersHeader.waitForExist();
      searchPage.crsHeader.waitForExist();
      searchPage.trrsHeader.waitForExist();
      searchPage.officersHeader.waitForExist();

      searchPage.queryInput.getValue().should.equal('2004-04-23 ke');

      searchPage.dateOfficers.allLink.click();

      searchPage.dateCRsHeader.waitForExist(TIMEOUT, true);
      searchPage.dateTRRsHeader.isExisting().should.be.false();
      searchPage.crsHeader.isExisting().should.be.false();
      searchPage.trrsHeader.isExisting().should.be.false();
      searchPage.officersHeader.isExisting().should.be.false();
      searchPage.dateOfficersHeader.waitForExist();

      searchPage.queryInput.getValue().should.equal('date-officer:2004-04-23 ke');

      const dateOfficersRows = searchPage.dateOfficers.rows;

      dateOfficersRows.count.should.equal(3);
    });

    it('should able to load more when scrolling down', function () {
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=OFFICER')
        .reply(200, mockFirstOfficersSearchQueryResponse);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=OFFICER&offset=30')
        .reply(200, mockSecondOfficersSearchQueryResponse);

      searchPage.queryInput.setValue('2004-04-23 ke');

      searchPage.dateCRsHeader.waitForDisplayed(TIMEOUT);
      searchPage.dateTRRsHeader.waitForExist();
      searchPage.dateOfficersHeader.waitForExist();
      searchPage.crsHeader.waitForExist();
      searchPage.trrsHeader.waitForExist();
      searchPage.officersHeader.waitForExist();

      const officersRows = searchPage.officers.rows;
      officersRows.count.should.equal(1);

      searchPage.officers.allLink.click();

      searchPage.dateCRsHeader.waitForExist(TIMEOUT, true);
      searchPage.dateTRRsHeader.isExisting().should.be.false();
      searchPage.dateOfficersHeader.isExisting().should.be.false();
      searchPage.crsHeader.isExisting().should.be.false();
      searchPage.trrsHeader.isExisting().should.be.false();
      searchPage.officersHeader.waitForExist();

      searchPage.queryInput.getValue().should.equal('officer:2004-04-23 ke');

      officersRows.count.should.equal(30);

      browser.scroll(0, 3000);
      browser.waitUntil(function () {
        return searchPage.officers.rows.count === 35;
      }, 2000, 'expected officer suggestions are 25');
    });

    it('should match result with search query prefix', function () {
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);

      searchPage.queryInput.setValue('officer:2004-04-23 ke');

      searchPage.officersHeader.waitForDisplayed(TIMEOUT);
      searchPage.dateCRsHeader.isExisting().should.be.false();
      searchPage.dateTRRsHeader.isExisting().should.be.false();
      searchPage.dateOfficersHeader.isExisting().should.be.false();
      searchPage.crsHeader.isExisting().should.be.false();
      searchPage.trrsHeader.isExisting().should.be.false();
    });

    context('should match result with search term from url', function () {
      beforeEach(function () {
        api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
      });

      it('should search with correct query using q', function () {
        api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);

        searchPage.open('officer:2004-04-23 ke');

        searchPage.officersHeader.waitForDisplayed(TIMEOUT);
        searchPage.dateCRsHeader.isExisting().should.be.false();
        searchPage.dateTRRsHeader.isExisting().should.be.false();
        searchPage.dateOfficersHeader.isExisting().should.be.false();
        searchPage.crsHeader.isExisting().should.be.false();
        searchPage.trrsHeader.isExisting().should.be.false();

        searchPage.queryInput.getValue().should.equal('officer:2004-04-23 ke');
      });

      it('should search with correct query using terms', function () {
        api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);

        searchPage.openWithTerms('officer:2004-04-23 ke');

        searchPage.officersHeader.waitForDisplayed(TIMEOUT);
        searchPage.dateCRsHeader.isExisting().should.be.false();
        searchPage.dateTRRsHeader.isExisting().should.be.false();
        searchPage.dateOfficersHeader.isExisting().should.be.false();
        searchPage.crsHeader.isExisting().should.be.false();
        searchPage.trrsHeader.isExisting().should.be.false();

        searchPage.queryInput.getValue().should.equal('officer:2004-04-23 ke');
      });
    });
  });

  context('pinboard functionalities', function () {
    beforeEach(function () {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true').reply(200, emptyPinboard);
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .reply(201, createPinboardResponse);
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: [], 'trr_ids': [] })
        .reply(201, createEmptyPinboardResponse);
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: [], 'trr_ids': [], title: '', description: '' }
        )
        .reply(200, emptyPinboard);
    });

    it('should display pinboard button with correct text when items are added/removed', function () {
      searchPage.queryInput.setValue('Kelvin');

      const investigatorCRs = searchPage.investigatorCRs;
      investigatorCRs.firstRow.pinButton.waitForDisplayed(TIMEOUT);
      searchPage.pinboardBar.waitForDisplayed(TIMEOUT, true);

      investigatorCRs.firstRow.pinButton.click();
      searchPage.pinboardBar.waitForDisplayed(TIMEOUT);
      searchPage.pinboardBar.getText().should.equal('Pinboard (1)');

      investigatorCRs.firstRow.pinButton.click();
      searchPage.pinboardBar.waitForDisplayed(TIMEOUT, true);
    });

    it('should display pinboard button that links to pinboard page when pinboard is not empty', function () {
      searchPage.queryInput.setValue('Kelvin');

      searchPage.investigatorCRs.firstRow.pinButton.waitForDisplayed(TIMEOUT);
      searchPage.investigatorCRs.firstRow.pinButton.click();
      searchPage.pinboardBar.waitForDisplayed(TIMEOUT);
      searchPage.pinboardBar.click();
      browser.getUrl().should.containEql('/pinboard/5cd06f2b/untitled-pinboard/');

      pinboardPage.pinboardTitle.waitForDisplayed(TIMEOUT);
    });

    it('should display toast in few seconds when items are added/removed', function () {
      searchPage.queryInput.setValue('Kelvin');

      const investigatorCRs = searchPage.investigatorCRs;
      investigatorCRs.firstRow.pinButton.waitForDisplayed(TIMEOUT);
      investigatorCRs.firstRow.pinButton.click();
      searchPage.toast.waitForDisplayed(TIMEOUT);
      searchPage.toast.waitForText('CR #123456 added to pinboard\nGo to pinboard');

      searchPage.toast.waitForDisplayed(TIMEOUT, true);
      investigatorCRs.firstRow.pinButton.click();
      searchPage.toast.waitForDisplayed(TIMEOUT);
      searchPage.toast.waitForText('CR #123456 removed from pinboard\nGo to pinboard');
    });
  });

  context('create new pinboard', function () {
    beforeEach(function () {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true').reply(200, mockNewCreatedPinboard);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/complaints/').reply(200, mockPinboardComplaint);
    });

    it('should go to pinboard detail page when clicking on success added toast', function () {
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .reply(201, createPinboardResponse);

      const crs = pinboardPage.pinnedSection.crs;
      searchPage.queryInput.setValue('Kelvin');

      searchPage.investigatorCRs.firstRow.pinButton.waitForDisplayed(TIMEOUT);
      searchPage.investigatorCRs.firstRow.pinButton.click();
      searchPage.toast.waitForDisplayed(TIMEOUT);
      searchPage.toast.waitForText('CR #123456 added to pinboard\nGo to pinboard');

      searchPage.toast.click();
      browser.getUrl().should.containEql('/pinboard/5cd06f2b/untitled-pinboard/');
      crs.cards.waitForCount(1, 30000);
    });

    it('should go to pinboard detail page when clicking on error added toast', function () {
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .reply(500, {});
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .reply(201, createPinboardResponse);

      const crs = pinboardPage.pinnedSection.crs;
      searchPage.queryInput.setValue('Kelvin');
      searchPage.investigatorCRs.firstRow.pinButton.waitForDisplayed(TIMEOUT);
      searchPage.investigatorCRs.firstRow.pinButton.click();
      searchPage.toast.waitForDisplayed(TIMEOUT);
      searchPage.toast.waitForText('CR #123456 added to pinboard\nGo to pinboard');

      searchPage.toast.click();
      browser.getUrl().should.containEql('/pinboard/');
      browser.waitForUrl(url => url.should.containEql('/pinboard/5cd06f2b/untitled-pinboard'), 1500);
      crs.cards.waitForCount(1, 30000);
    });

    it('should go to pinboard detail page when clicking on long api call added toast', function () {
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .delay(1000)
        .reply(201, createPinboardResponse);

      const crs = pinboardPage.pinnedSection.crs;
      searchPage.queryInput.setValue('Kelvin');
      searchPage.investigatorCRs.firstRow.pinButton.waitForDisplayed(TIMEOUT);
      searchPage.investigatorCRs.firstRow.pinButton.click();
      searchPage.toast.waitForDisplayed(TIMEOUT);
      searchPage.toast.waitForText('CR #123456 added to pinboard\nGo to pinboard');

      searchPage.toast.click();
      browser.getUrl().should.containEql('/pinboard/');
      browser.waitForUrl(url => url.should.containEql('/pinboard/5cd06f2b/untitled-pinboard/'), 1500);
      crs.cards.waitForCount(1, 30000);
    });
  });

  context('update current pinboard', function () {
    beforeEach(function () {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      api
        .onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false')
        .reply(200, mockComplaintPinnedItemPinboard);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/complaints/').reply(200, mockPinboardComplaints);
      searchPage.open();
      searchPage.body.waitForExist();
    });

    it('should go to pinboard detail page when clicking on success removed toast', function () {
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: ['123456', '654321'], 'trr_ids': [], title: '', description: '' }
        )
        .reply(200, mockUpdatedComplaintPinnedItemPinboard);

      const crs = pinboardPage.pinnedSection.crs;
      searchPage.queryInput.setValue('Kelvin');
      searchPage.investigatorCRs.secondRow.pinButton.click();
      searchPage.toast.waitForDisplayed(TIMEOUT);
      searchPage.toast.waitForText('CR #654321 added to pinboard\nGo to pinboard');

      searchPage.toast.click();
      browser.waitForUrl(url => url.should.containEql('/pinboard/5cd06f2b/untitled-pinboard/'), 1000);
      crs.cards.waitForCount(2, 30000);
    });

    it('should go to pinboard detail page when clicking on error added toast', function () {
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: ['123456', '654321'], 'trr_ids': [], title: '', description: '' }
        )
        .reply(500, {},);
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: ['123456', '654321'], 'trr_ids': [], title: '', description: '' }
        )
        .reply(200, mockUpdatedComplaintPinnedItemPinboard,);

      const crs = pinboardPage.pinnedSection.crs;
      searchPage.queryInput.setValue('Kelvin');
      searchPage.investigatorCRs.secondRow.pinButton.waitForDisplayed(TIMEOUT);
      searchPage.investigatorCRs.secondRow.pinButton.click();
      searchPage.toast.waitForDisplayed(TIMEOUT);
      searchPage.toast.waitForText('CR #654321 added to pinboard\nGo to pinboard');

      searchPage.toast.click();
      browser.waitForUrl(url => url.should.containEql('/pinboard/5cd06f2b/untitled-pinboard/'), 1000);
      crs.cards.waitForCount(2, 30000);
    });

    it('should go to pinboard detail page when clicking on long api call added toast', function () {
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: ['123456', '654321'], 'trr_ids': [], title: '', description: '' }
        )
        .delay(1000)
        .reply(200, mockUpdatedComplaintPinnedItemPinboard);

      const crs = pinboardPage.pinnedSection.crs;
      searchPage.queryInput.setValue('Kelvin');
      searchPage.investigatorCRs.secondRow.pinButton.waitForDisplayed(TIMEOUT);
      searchPage.investigatorCRs.secondRow.pinButton.click();
      searchPage.toast.waitForDisplayed(TIMEOUT);
      searchPage.toast.waitForText('CR #654321 added to pinboard\nGo to pinboard');

      searchPage.toast.click();
      browser.waitForUrl(url => url.should.containEql('/pinboard/5cd06f2b/untitled-pinboard/'), 1000);
      crs.cards.waitForCount(2, 30000);
    });
  });

  it('should have clicky installed', function () {
    searchPage.clickyScript.waitForExist();
    searchPage.clickySiteIdsScript.waitForExist();
    searchPage.clickyNoJavascriptGIF.waitForExist();
  });

  context('Pinboard introduction', function () {
    beforeEach(function () {
      browser.clearReduxStore(true);
      searchPage.queryInput.waitForDisplayed();
    });

    it('should display pinboard introduction on first visited', function () {
      searchPage.pinboardIntroduction.content.waitForDisplayed();
    });

    it('should not display pinboard introduction if search query is long enough', function () {
      searchPage.pinboardIntroduction.content.waitForDisplayed();
      searchPage.queryInput.setValue('long');
      searchPage.pinboardIntroduction.content.waitForExist(TIMEOUT, true);
      searchPage.queryInput.setValue('1');
      searchPage.pinboardIntroduction.content.waitForDisplayed();
    });

    it('should display again after user remove all pinned items', function () {
      api
        .onPost('/api/v2/mobile/pinboards/', createPinboardWithRecentItemsParams)
        .reply(201, createPinboardWithRecentItemsResponse);
      api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
      searchPage.queryInput.setValue('123');
      searchPage.officers.firstRow.itemTitle.click();

      searchPage.searchBreadcrumb.click();
      searchPage.queryInput.waitForDisplayed();
      // Empty value doesn't trigger change -> Set short query to show recent
      searchPage.queryInput.setValue('1');

      searchPage.recentHeader.waitForExist();
      let recentItems = searchPage.recent;

      recentItems.firstRecentItem.pinButton.click();
      searchPage.pinboardIntroduction.content.waitForExist(TIMEOUT, true);

      recentItems.firstRecentItem.pinButton.click();
      searchPage.pinboardIntroduction.content.waitForDisplayed(1000);
    });

    it('should close pinboard introduction after click close', function () {
      searchPage.pinboardIntroduction.content.waitForDisplayed(1000);
      searchPage.pinboardIntroduction.closeButton.click();
      searchPage.pinboardIntroduction.content.waitForExist(TIMEOUT, true);
      browser.refresh();
      searchPage.body.waitForDisplayed();
      searchPage.pinboardIntroduction.content.waitForExist(TIMEOUT, true);
    });

    it('should close pinboard introduction and redirect to pinboard page after click Get Started', function () {
      searchPage.pinboardIntroduction.content.waitForDisplayed(1000);
      searchPage.pinboardIntroduction.getStartedButton.click();
      pinboardPage.searchBar.waitForExist();
      searchPage.open();
      searchPage.body.waitForExist();
      searchPage.pinboardIntroduction.content.waitForExist(TIMEOUT, true);
    });
  });

  context('PinButton introduction', function () {
    beforeEach(function () {
      api.onGet('/api/v2/search-mobile/?term=intr').reply(200, mockSearchQueryLongResponse);
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=OFFICER')
        .reply(200, mockFirstOfficersSearchQueryResponse);
      browser.clearReduxStore(true);
      searchPage.queryInput.waitForDisplayed();
    });

    context('search result have less than 3 results', function () {
      it('should display PinButtonIntroduction last pinnable search result', function () {
        const pinButtonIntroduction = searchPage.pinButtonIntroduction;
        searchPage.queryInput.setValue('intr');
        const officersRows = searchPage.officers.rows;
        const firstOfficerRow = searchPage.officers.firstRow;

        firstOfficerRow.itemTitle.waitForDisplayed();
        officersRows.count.should.equal(2);
        const crsRows = searchPage.crs.rows;
        crsRows.count.should.equal(2);
        const trrsRows = searchPage.crs.rows;
        trrsRows.count.should.equal(2);
        searchPage.officers.secondRow.pinButtonIntroduction.waitForDisplayed(PINBOARD_INTRODUCTION_DELAY);
        pinButtonIntroduction.count.should.equal(1);
      });
    });

    context('search result have more than 3 results', function () {
      it('should display PinButtonIntroduction third search result', function () {
        const pinButtonIntroduction = searchPage.pinButtonIntroduction;
        searchPage.queryInput.setValue('2004-04-23 ke');
        searchPage.officers.allLink.waitForDisplayed();
        searchPage.officers.allLink.click();

        const thirdOfficerRow = searchPage.officers.thirdRow;
        thirdOfficerRow.pinButtonIntroduction.waitForDisplayed();
        pinButtonIntroduction.count.should.equal(1);
      });
    });

    it('should not display PinButtonIntroduction after click on that result item', function () {
      searchPage.queryInput.setValue('intr');
      const secondOfficerRow = searchPage.officers.secondRow;
      secondOfficerRow.pinButtonIntroduction.waitForDisplayed();
      secondOfficerRow.itemIndicator.click();

      searchPage.open();
      searchPage.queryInput.waitForExist();
      searchPage.queryInput.setValue('intr');
      secondOfficerRow.pinButton.waitForDisplayed(TIMEOUT);
      browser.pause(PINBOARD_INTRODUCTION_DELAY);
      secondOfficerRow.pinButtonIntroduction.waitForExist(TIMEOUT, true);
    });

    it('should dismiss PinButtonIntroduction after click on introduction', function () {
      searchPage.queryInput.setValue('123');
      const firstOfficerRow = searchPage.officers.firstRow;
      firstOfficerRow.itemTitle.waitForDisplayed();
      firstOfficerRow.pinButtonIntroduction.waitForDisplayed();
      firstOfficerRow.pinButtonIntroduction.click();
      browser.pause(PINBOARD_INTRODUCTION_DELAY);
      browser.getUrl().should.containEql('/search/');
      firstOfficerRow.pinButtonIntroduction.waitForExist(TIMEOUT, true);

      searchPage.open();
      searchPage.queryInput.waitForExist();
      searchPage.queryInput.setValue('123');
      firstOfficerRow.pinButton.waitForDisplayed(TIMEOUT);
      browser.pause(PINBOARD_INTRODUCTION_DELAY);
      firstOfficerRow.pinButtonIntroduction.waitForExist(TIMEOUT, true);
    });

    it('should not display PinButtonIntroduction after click current PinButton', function () {
      const pinButtonIntroduction = searchPage.pinButtonIntroduction;

      searchPage.queryInput.setValue('intr');
      const secondOfficerRow = searchPage.officers.secondRow;
      secondOfficerRow.pinButtonIntroduction.waitForDisplayed();
      secondOfficerRow.pinButton.click();
      secondOfficerRow.pinButtonIntroduction.waitForExist(TIMEOUT, true);
      pinButtonIntroduction.isExisting().should.be.false();

      searchPage.open();
      searchPage.queryInput.waitForExist();
      searchPage.queryInput.setValue('intr');
      secondOfficerRow.pinButton.waitForDisplayed(TIMEOUT);
      browser.pause(PINBOARD_INTRODUCTION_DELAY);
      secondOfficerRow.pinButtonIntroduction.waitForExist(TIMEOUT, true);
      pinButtonIntroduction.isExisting().should.be.false();
    });

    it('should not display PinButtonIntroduction after click other PinButton', function () {
      const pinButtonIntroduction = searchPage.pinButtonIntroduction;

      searchPage.queryInput.setValue('intr');
      const firstOfficerRow = searchPage.officers.firstRow;
      const secondOfficerRow = searchPage.officers.secondRow;
      secondOfficerRow.pinButtonIntroduction.waitForDisplayed();
      firstOfficerRow.pinButton.click();
      secondOfficerRow.pinButtonIntroduction.waitForExist(TIMEOUT, true);
      pinButtonIntroduction.isExisting().should.be.false();

      searchPage.open();
      searchPage.queryInput.waitForExist();
      searchPage.queryInput.setValue('intr');
      secondOfficerRow.pinButton.waitForDisplayed(TIMEOUT);
      browser.pause(PINBOARD_INTRODUCTION_DELAY);
      secondOfficerRow.pinButtonIntroduction.waitForExist(TIMEOUT, true);
      pinButtonIntroduction.isExisting().should.be.false();
    });

    it('should display PinButtonIntroduction on recent', function () {
      api
        .onGet('/api/v2/search-mobile/recent-search-items/?officer_ids[]=8562&crids[]=1002144&trr_ids[]=14487')
        .reply(200, mockNewRecentSearchItemsResponse,);
      api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
      api.onGet('/api/v2/mobile/cr/1002144/').reply(200, cr1002144);
      api.onGet('/api/v2/mobile/trr/14487/').reply(200, trr14487);
      searchPage.queryInput.setValue('123');
      searchPage.officers.firstRow.itemTitle.click();

      searchPage.searchBreadcrumb.click();
      searchPage.crs.firstRow.itemTitle.waitForDisplayed();
      searchPage.crs.firstRow.itemTitle.click();

      searchPage.searchBreadcrumb.click();
      searchPage.trrs.firstRow.itemTitle.waitForDisplayed();
      searchPage.trrs.firstRow.itemTitle.click();

      searchPage.searchBreadcrumb.click();
      searchPage.queryInput.waitForDisplayed();
      // Empty value doesn't trigger change -> Set short query to show recent
      searchPage.queryInput.setValue('1');

      searchPage.recentHeader.waitForExist();
      let recentItems = searchPage.recent;
      browser.pause(PINBOARD_INTRODUCTION_DELAY);
      recentItems.thirdRecentItem.pinButtonIntroduction.waitForDisplayed();
    });
  });
});
