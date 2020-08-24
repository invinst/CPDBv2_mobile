import complaintPage from '../page-objects/complaint-page';
import searchPage from '../page-objects/search-page';
import landingPage from '../page-objects/landing-page';
import pinboardPage from '../page-objects/pinboard-page';
import api from '../../integration-test/mock-api';
import { TIMEOUT } from '../constants';
const {
  pinboards,
  updatedPinboards,
  updateRequestParams,
  createdPinboards,
  createPinboardRequestParams,
  createdPinboardsComplaintsData,
} = require(__dirname + '/../../integration-test/mock-data/pinboard-page').pinboardsMenu;
import { complaintData } from '../mock-data/complaint-page';
import { mockCommonApi } from '../mock-data/utils';


describe('ComplaintPageTest', function () {
  beforeEach(function () {
    api.clean();
    mockCommonApi();
    api.onGet('/api/v2/mobile/cr/1053667/').reply(200, complaintData);
    api
      .onPost('/api/v2/mobile/cr/1053667/request-document/', { email: 'valid@email.com' })
      .reply(200, { 'message': 'Thanks for subscribing.', crid: 1053667 });
    api
      .onPost('/api/v2/mobile/cr/1053667/request-document/', { email: 'invalid#email.com' })
      .reply(400, { 'message': 'Sorry, we can not subscribe your email' });
  });

  context('complaint page content', function () {
    beforeEach(function () {
      complaintPage.open('1053667');
      complaintPage.body.waitForExist();
    });

    it('should show proper header with CR title', function () {
      const comlaintCategory = complaintPage.complaintCategory;
      comlaintCategory.category.waitForDisplayed(TIMEOUT);
      comlaintCategory.category.getText().should.containEql('Operation/Personnel Violations');
      comlaintCategory.subcategory.getText().should.containEql('Inventory Procedures');
    });

    it('should show proper coaccusals', function () {
      const coaccusals = complaintPage.coaccusals;
      coaccusals.header.getText().should.containEql('3 ACCUSED OFFICERS');
      coaccusals.showAll.isDisplayed().should.be.true();
      coaccusals.paddingBottom.isExisting().should.be.false();
      coaccusals.firstRadarChart.getCSSProperty('background-color')
        .value.should.equal('rgba(244,162,152,1)');

      coaccusals.showAll.click();
      coaccusals.showAll.isExisting().should.be.false();
      coaccusals.paddingBottom.isDisplayed().should.be.true();

      const firstCoaccusal = complaintPage.firstCoaccusal;
      firstCoaccusal.rank.getText().should.containEql('Police Officer');
      firstCoaccusal.name.getText().should.containEql('Donovan Markiewicz');
      firstCoaccusal.category.getText().should.containEql('Excessive Force');
      firstCoaccusal.findingOutcome.getText().should.containEql('Sustained');
    });

    it('should show proper cr info', function () {
      complaintPage.victims.getText().should.containEql('Black, Male, Age 45');
      complaintPage.complainants.getText().should.containEql('White, Male, Age 57');
      complaintPage.summary.getText().should.containEql('summary');
      complaintPage.investigatorTimeline.getText().should.containEql(
        'Apr 30, 2012\nIncident Occurs\nInvestigation Begins\nInvestigation Closed'
      );
      complaintPage.firstInvestigator.getText().should.containEql('Peter Parker');
      complaintPage.incidentDate.getText().should.equal('APR 30, 2012');
    });

    it('should go to officer page when click on investigator which is an officer', function () {
      complaintPage.firstInvestigator.click();
      browser.getUrl().should.containEql('/officer/1/peter-parker');
    });

    it('should show proper investigator which is an officer', function () {
      const policeWitnessSection = complaintPage.policeWitnesses;
      policeWitnessSection.firstRadarChart.getCSSProperty('background-color')
        .value.should.equal('rgba(245,37,36,1)');
      policeWitnessSection.secondRadarChart.getCSSProperty('background-color')
        .value.should.equal('rgba(255,65,44,1)');
      policeWitnessSection.thirdRadarChart.getCSSProperty('background-color')
        .value.should.equal('rgba(255,100,83,1)');
      policeWitnessSection.forthRadarChart.getCSSProperty('background-color')
        .value.should.equal('rgba(244,162,152,1)');
      policeWitnessSection.fifthRadarChart.getCSSProperty('background-color')
        .value.should.equal('rgba(249,211,195,1)');
    });

    it('should go to search page when click on investigator which is not an officer', function () {
      complaintPage.secondInvestigator.click();
      browser.getUrl().should.containEql('/search/?q=Edward%20May');
    });

    it('should show proper cr location', function () {
      const location = complaintPage.location;
      location.address.getText().should.containEql('2459 WESTERN AVE, CHICAGO IL 60608');
      location.type.getText().should.containEql('Building');
      location.beat.getText().should.containEql('1034');
    });

    it('should show request document modal when clicks on "Request Document"', function () {
      complaintPage.requestDocumentForm.emailInput.isExisting().should.be.false();

      complaintPage.requestDocumentButton.click();
      complaintPage.requestDocumentForm.emailInput.waitForDisplayed();

      complaintPage.requestDocumentForm.cancelButton.click();
      complaintPage.requestDocumentForm.emailInput.isExisting().should.be.false();
    });

    it('should accept valid email, and close modal after 1.5s', function () {
      complaintPage.requestDocumentButton.getText().should.equal('Request Documents');
      complaintPage.requestDocumentButton.click();
      complaintPage.requestDocumentForm.emailInput.waitForDisplayed();

      const requestDocumentForm = complaintPage.requestDocumentForm;
      requestDocumentForm.emailInput.setValue('valid@email.com');
      requestDocumentForm.requestButton.click();
      requestDocumentForm.messageBox.waitForDisplayed(TIMEOUT);
      requestDocumentForm.messageBox.getText().should.equal('Thanks for subscribing.');

      complaintPage.requestDocumentForm.emailInput.waitForDisplayed(2000, true);
      complaintPage.requestDocumentButton.getText().should.equal('Documents Requested✔');
    });

    it('should ignore invalid email', function () {
      complaintPage.requestDocumentButton.click();
      complaintPage.requestDocumentForm.emailInput.waitForDisplayed();

      const requestDocumentForm = complaintPage.requestDocumentForm;
      requestDocumentForm.emailInput.setValue('invalid#email.com');
      requestDocumentForm.requestButton.click();
      requestDocumentForm.messageBox.waitForDisplayed(TIMEOUT);
      requestDocumentForm.messageBox.getText().should.equal(
        'Sorry, we can not subscribe your email'
      );
    });

    it('should have clicky installed', function () {
      complaintPage.clickyScript.waitForExist();
      complaintPage.clickySiteIdsScript.waitForExist();
      complaintPage.clickyNoJavascriptGIF.waitForExist();
    });
  });

  describe('Pinboard function', function () {
    it('should display toast when pinning a coaccusal', function () {
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});

      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          {
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
            title: '',
            description: '',
          }
        )
        .reply(
          200,
          {
            id: '5cd06f2b',
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
            title: '',
            description: '',
          },
        );

      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [6493], crids: [], 'trr_ids': [] })
        .reply(
          201,
          { id: '5cd06f2b', 'officer_ids': [6493], crids: [], 'trr_ids': [], title: '', description: '' },
        );

      complaintPage.open('1053667');
      complaintPage.body.waitForDisplayed();

      complaintPage.firstCoaccusal.pinButton.click();
      complaintPage.lastToast.waitForDisplayed();
      complaintPage.lastToast.waitForText(
        'Donovan Markiewicz added to pinboard\nGo to pinboard',
        TIMEOUT
      );

      complaintPage.landingPageBreadCrumb.click();
      landingPage.searchLink.waitForDisplayed();
      landingPage.searchLink.click();
      searchPage.pinboardBar.getText().should.equal('Pinboard (1)', TIMEOUT);
      browser.back();
      browser.back();

      complaintPage.firstCoaccusal.pinButton.click();
      complaintPage.lastToast.waitForDisplayed();
      complaintPage.lastToast.waitForText(
        'Donovan Markiewicz removed from pinboard\nGo to pinboard',
        TIMEOUT
      );

      complaintPage.landingPageBreadCrumb.click();
      landingPage.searchLink.waitForDisplayed();
      landingPage.searchLink.click();
      searchPage.queryInput.waitForExist();
      searchPage.pinboardBar.waitForDisplayed(TIMEOUT, true);
    });

    context('current complaint', function () {
      beforeEach(function () {
        api.onGet('/api/v2/mobile/pinboards/8d2daffe/').reply(200, pinboards[0]);
        api.onGet('/api/v2/mobile/pinboards/8d2daffe/complaints/').reply(200, []);
        api.onGet('/api/v2/mobile/pinboards/8d2daffe/officers/').reply(200, []);
        api.onGet('/api/v2/mobile/pinboards/8d2daffe/trrs/').reply(200, []);
      });

      context('when user has one active pinboard', function () {
        beforeEach(function () {
          api.onGet('/api/v2/mobile/pinboards/?detail=true').reply(200, [pinboards[0]]);
          api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, pinboards[0]);
          api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, pinboards[0]);
          api.onPut('/api/v2/mobile/pinboards/8d2daffe/', updateRequestParams[1]).reply(200, updatedPinboards[1]);
          complaintPage.open('1053667');
          complaintPage.body.waitForExist();
        });

        it('should display toast when pinning', function () {
          complaintPage.pinButton.click();
          complaintPage.lastToast.waitForDisplayed();
          complaintPage.lastToast.waitForText(
            'CR #1053667 added to pinboard\nGo to pinboard'
          );

          complaintPage.landingPageBreadCrumb.click();
          landingPage.searchLink.waitForDisplayed();
          landingPage.searchLink.click();
          searchPage.pinboardBar.waitForDisplayed();
          searchPage.pinboardBar.getText().should.equal('Pinboard (4)');
        });

        it('should display toast when unpinning', function () {
          complaintPage.pinButton.click();
          complaintPage.lastToast.waitForDisplayed();
          complaintPage.lastToast.waitForText(
            'CR #1053667 added to pinboard\nGo to pinboard'
          );

          complaintPage.pinButton.click();
          complaintPage.lastToast.waitForDisplayed();
          complaintPage.lastToast.waitForText(
            'CR #1053667 removed from pinboard\nGo to pinboard'
          );

          complaintPage.landingPageBreadCrumb.click();
          landingPage.searchLink.waitForDisplayed();
          landingPage.searchLink.click();
          searchPage.pinboardBar.waitForDisplayed();
          searchPage.pinboardBar.getText().should.equal('Pinboard (3)');
        });
      });

      context('when user has more than 1 pinboard', function () {
        beforeEach(function () {
          api.onGet('/api/v2/mobile/pinboards/?detail=true').reply(200, pinboards);
          api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
          api.onGet('/api/v2/mobile/pinboards/f7231a74/').reply(200, createdPinboards[0]);
          api.onGet('/api/v2/mobile/pinboards/f7231a74/complaints/').reply(200, createdPinboardsComplaintsData);
          api.onGet('/api/v2/mobile/pinboards/f7231a74/officers/').reply(200, []);
          api.onGet('/api/v2/mobile/pinboards/f7231a74/trrs/').reply(200, []);
          api.onPut('/api/v2/mobile/pinboards/8d2daffe/', updateRequestParams[1]).reply(200, updatedPinboards[1]);
          api.onPost('/api/v2/mobile/pinboards/', createPinboardRequestParams[1]).reply(200, createdPinboards[1],);
          complaintPage.open('1053667');
          complaintPage.body.waitForExist();
        });

        it('should display pinboards menu', function () {
          const pinboardsMenu = complaintPage.pinboardsMenu;
          const pinboardsMenuItems = pinboardsMenu.items;

          complaintPage.addToPinboardButton.click();
          pinboardsMenu.firstItemTitle.waitForDisplayed();

          pinboardsMenuItems.count.should.equal(5);

          pinboardsMenu.firstItemTitle.getText().should.equal('Skrull Cap');
          pinboardsMenu.firstItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
          pinboardsMenu.secondItemTitle.getText().should.equal('Watts Crew');
          pinboardsMenu.secondItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
          pinboardsMenu.thirdItemTitle.getText().should.equal('');
          pinboardsMenu.thirdItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
        });

        it('should close pinboards menu when click outside', function () {
          const pinboardsMenu = complaintPage.pinboardsMenu;

          complaintPage.addToPinboardButton.click();
          pinboardsMenu.firstItemTitle.waitForDisplayed();
          complaintPage.summary.click();
          pinboardsMenu.firstItemTitle.waitForExist(TIMEOUT, true);
        });

        it('should display toast and close pinboards menu when pinning', function () {
          const pinboardsMenu = complaintPage.pinboardsMenu;

          complaintPage.addToPinboardButton.click();
          pinboardsMenu.firstItemTitle.waitForDisplayed();

          pinboardsMenu.firstItemPinButton.click();
          complaintPage.lastToast.waitForDisplayed();
          complaintPage.lastToast.waitForText(
            'CR #1053667 added to pinboard\nGo to pinboard'
          );
          pinboardsMenu.firstItemTitle.waitForExist(TIMEOUT, true);

          complaintPage.landingPageBreadCrumb.click();
          landingPage.searchLink.waitForDisplayed();
          landingPage.searchLink.click();
          searchPage.pinboardBar.waitForDisplayed();
          searchPage.pinboardBar.getText().should.equal('Pinboard (4)');
        });

        it('should display toast when unpinning', function () {
          const pinboardsMenu = complaintPage.pinboardsMenu;

          complaintPage.addToPinboardButton.click();
          pinboardsMenu.firstItemTitle.waitForDisplayed();

          pinboardsMenu.firstItemPinButton.click();
          complaintPage.lastToast.waitForDisplayed();
          complaintPage.lastToast.waitForText(
            'CR #1053667 added to pinboard\nGo to pinboard'
          );
          pinboardsMenu.firstItemTitle.waitForExist(TIMEOUT, true);


          complaintPage.addToPinboardButton.click();
          pinboardsMenu.firstItemTitle.waitForDisplayed();
          pinboardsMenu.firstItemPinButton.click();
          complaintPage.lastToast.waitForDisplayed();
          complaintPage.lastToast.waitForText(
            'CR #1053667 removed from pinboard\nGo to pinboard'
          );
          pinboardsMenu.firstItemTitle.waitForExist(TIMEOUT, true);

          complaintPage.landingPageBreadCrumb.click();
          landingPage.searchLink.waitForDisplayed();
          landingPage.searchLink.click();
          searchPage.pinboardBar.waitForDisplayed();
          searchPage.pinboardBar.getText().should.equal('Pinboard (3)');
        });

        it('should create new pinboard with current complaint', function () {
          const pinboardsMenu = complaintPage.pinboardsMenu;

          complaintPage.addToPinboardButton.click();
          pinboardsMenu.createPinboardWithSelectionButton.waitForDisplayed();
          pinboardsMenu.createPinboardWithSelectionButton.click();

          browser.waitForUrl(url => url.should.containEql('/pinboard/f7231a74/untitled-pinboard/'), 1000);
          pinboardPage.pinnedSection.crs.cards.waitForCount(1, 3000);
          pinboardPage.pinnedSection.crs.firstCardCategory.getText().should.equal(
            'Operation/Personnel Violations'
          );
        });
      });
    });
  });
});
