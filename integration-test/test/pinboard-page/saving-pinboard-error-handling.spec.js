'use strict';

const { times } = require('lodash');

const api = require(__dirname + '/../../mock-api');

const mockData = require(__dirname + '/../../mock-data/pinboard-page');

describe('Session Creator Pinboard Page', function () {
  beforeEach(function (client, done) {
    api.cleanMock();

    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/', 200, mockData.pinboardData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/complaints/', 200, mockData.pinboardCRsData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/officers/', 200, mockData.pinboardOfficersData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/trrs/', 200, mockData.pinboardTRRsData);
    api.mock('GET', '/api/v2/mobile/social-graph/network/?pinboard_id=5cd06f2b', 200, mockData.socialGraphData);
    api.mock(
      'GET', '/api/v2/mobile/social-graph/geographic-crs/?pinboard_id=5cd06f2b', 200, mockData.geographicCrsData
    );
    api.mock(
      'GET', '/api/v2/mobile/social-graph/geographic-trrs/?pinboard_id=5cd06f2b', 200, mockData.geographicTrrsData
    );
    api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true', 200, mockData.pinboardData);

    api.mock('GET', mockData.baseRelevantCoaccusalsUrl, 200, mockData.firstRelevantCoaccusalsResponse);
    api.mock(
      'GET', `${mockData.baseRelevantCoaccusalsUrl}limit=4&offset=4`, 200, mockData.secondRelevantCoaccusalsResponse
    );
    api.mock(
      'GET', `${mockData.baseRelevantCoaccusalsUrl}limit=4&offset=8`, 200, mockData.lastRelevantCoaccusalsResponse
    );

    api.mock('GET', mockData.baseRelevantDocumentsUrl, 200, mockData.emptyPaginationResponse);
    api.mock('GET', mockData.baseRelevantComplaintsUrl, 200, mockData.emptyPaginationResponse);

    this.pinboardPage = client.page.pinboardPage();
    this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
    done();
  });

  afterEach(function (client, done) {
    api.cleanMock();
    done();
  });

  describe('Connection lost', function () {
    it('should show connection lost toast', function (client) {
      // according to this issue https://github.com/nightwatchjs/nightwatch/issues/1824
      // nightwatchjs hasn't supported network condition yet
      client.execute('navigator.__defineGetter__(\'onLine\', () => false)');

      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      const firstCoaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;

      firstCoaccusalCard.waitForElementVisible('@plusButton');
      firstCoaccusalCard.click('@plusButton');

      firstCoaccusalCard.expect.element('@undoText').to.be.present;
      firstCoaccusalCard.expect.element('@undoButton').to.be.present;
      firstCoaccusalCard.expect.element('@undoText').text.to.equal('Richard Sullivan added.');
      firstCoaccusalCard.expect.element('@undoButton').text.to.equal('Undo');
      firstCoaccusalCard.expect.element('@undoText').to.be.not.present.before(2000);

      this.pinboardPage.waitForElementVisible('@firstToast');
      this.pinboardPage.expect.element('@firstToast').text.to.equal('Connection lost. Trying to save ...').before(5000);

      times(30, () => {
        client.pause(100);
        this.pinboardPage.expect.element('@firstToast').text.to.equal('Connection lost. Trying to save ...');
      });

      client.execute('navigator.__defineGetter__(\'onLine\', () => true)');
    });

    it('should show connection lost toast and retry on click', function (client) {
      const requestBody = {
        'officer_ids': ['1234', '123'],
        crids: ['1234567'],
        'trr_ids': ['1234'],
        title: 'Pinboard Title',
        description: 'Pinboard Description',
      };
      const sideEffects = [
        ...new Array(10),
        {
          id: '5cd06f2b',
          'officer_ids': ['1234', '123'],
          crids: ['1234567'],
          'trr_ids': ['1234'],
          title: 'Pinboard Title',
          description: 'Pinboard Description',
        },
      ];
      api.mockPut(
        '/api/v2/mobile/pinboards/5cd06f2b/',
        200,
        requestBody,
        undefined,
        undefined,
        sideEffects
      );

      // according to this issue https://github.com/nightwatchjs/nightwatch/issues/1824
      // nightwatchjs hasn't supported network condition yet
      client.execute('navigator.__defineGetter__(\'onLine\', () => false)');

      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      const firstCoaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;

      firstCoaccusalCard.waitForElementVisible('@plusButton');
      firstCoaccusalCard.click('@plusButton');

      firstCoaccusalCard.expect.element('@undoText').to.be.present;
      firstCoaccusalCard.expect.element('@undoText').to.be.not.present.before(2000);

      this.pinboardPage.waitForElementVisible('@firstToast');
      this.pinboardPage.expect.element('@firstToast').text.to.equal('Connection lost. Trying to save ...').before(5000);
      client.pause(500);

      this.pinboardPage.click('@firstToast');
      this.pinboardPage.waitForElementNotPresent('@firstToast');
      this.pinboardPage.waitForElementVisible('@firstToast');
      this.pinboardPage.expect.element('@firstToast').text.to.equal('Connection lost. Trying to save ...');
      client.pause(500);

      client.execute('navigator.__defineGetter__(\'onLine\', () => true)');
      this.pinboardPage.click('@firstToast');

      this.pinboardPage.waitForElementNotPresent('@firstToast');

      times(50, () => {
        client.pause(100);
        this.pinboardPage.expect.element('@firstToast').to.be.not.present;
      });
    });

    it('should show connection lost toast and retry when online again', function (client) {
      const requestBody = {
        'officer_ids': ['1234', '123'],
        crids: ['1234567'],
        'trr_ids': ['1234'],
        title: 'Pinboard Title',
        description: 'Pinboard Description',
      };
      const sideEffects = [
        ...new Array(4),
        {
          id: '5cd06f2b',
          'officer_ids': ['1234', '123'],
          crids: ['1234567'],
          'trr_ids': ['1234'],
          title: 'Pinboard Title',
          description: 'Pinboard Description',
        },
      ];
      api.mockPut(
        '/api/v2/mobile/pinboards/5cd06f2b/',
        200,
        requestBody,
        undefined,
        undefined,
        sideEffects
      );

      // according to this issue https://github.com/nightwatchjs/nightwatch/issues/1824
      // nightwatchjs hasn't supported network condition yet
      client.execute('navigator.__defineGetter__(\'onLine\', () => false)');

      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      const firstCoaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;

      firstCoaccusalCard.waitForElementVisible('@plusButton');
      firstCoaccusalCard.click('@plusButton');

      firstCoaccusalCard.expect.element('@undoText').to.be.present;
      firstCoaccusalCard.expect.element('@undoText').to.be.not.present.before(2000);

      this.pinboardPage.waitForElementVisible('@firstToast');
      this.pinboardPage.expect.element('@firstToast').text.to.equal('Connection lost. Trying to save ...').before(5000);
      client.pause(500);

      client.execute('navigator.__defineGetter__(\'onLine\', () => true)');
      client.execute('window.dispatchEvent(new Event(\'online\'))');

      this.pinboardPage.waitForElementNotPresent('@firstToast');

      times(10, () => {
        client.pause(100);
        this.pinboardPage.expect.element('@firstToast').to.be.not.present;
      });
    });
  });

  describe('request failure', function () {
    it('should show saving failure toast', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      const firstCoaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;

      firstCoaccusalCard.waitForElementVisible('@plusButton');
      firstCoaccusalCard.click('@plusButton');

      firstCoaccusalCard.expect.element('@undoText').to.be.present;
      firstCoaccusalCard.expect.element('@undoButton').to.be.present;
      firstCoaccusalCard.expect.element('@undoText').text.to.equal('Richard Sullivan added.');
      firstCoaccusalCard.expect.element('@undoButton').text.to.equal('Undo');
      firstCoaccusalCard.expect.element('@undoText').to.be.not.present.before(2000);

      this.pinboardPage.waitForElementVisible('@firstToast');
      this.pinboardPage.expect.element('@firstToast').text.to.equal(
        'Failed to save pinboard. Click to try again!'
      ).before(5000);

      client.pause(500);
      this.pinboardPage.click('@firstToast');
      this.pinboardPage.waitForElementNotPresent('@firstToast');
      this.pinboardPage.waitForElementVisible('@firstToast');
      this.pinboardPage.expect.element('@firstToast').text.to.equal(
        'Failed to save pinboard. Click to try again!'
      );

      times(30, () => {
        client.pause(100);
        this.pinboardPage.expect.element('@firstToast').text.to.equal(
          'Failed to save pinboard. Click to try again!'
        );
      });
    });

    it('should retry on click', function (client) {
      const requestBody = {
        'officer_ids': ['1234', '123'],
        crids: ['1234567'],
        'trr_ids': ['1234'],
        title: 'Pinboard Title',
        description: 'Pinboard Description',
      };
      const sideEffects = [
        ...new Array(130),
        {
          id: '5cd06f2b',
          'officer_ids': ['1234', '123'],
          crids: ['1234567'],
          'trr_ids': ['1234'],
          title: 'Pinboard Title',
          description: 'Pinboard Description',
        },
      ];
      api.mockPut(
        '/api/v2/mobile/pinboards/5cd06f2b/',
        200,
        requestBody,
        undefined,
        undefined,
        sideEffects
      );

      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      const firstCoaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;

      firstCoaccusalCard.waitForElementVisible('@plusButton');
      firstCoaccusalCard.click('@plusButton');
      firstCoaccusalCard.expect.element('@undoText').to.be.present;
      firstCoaccusalCard.expect.element('@undoText').to.be.not.present.before(2000);

      this.pinboardPage.waitForElementVisible('@firstToast');
      this.pinboardPage.expect.element('@firstToast').text.to.equal(
        'Failed to save pinboard. Click to try again!'
      ).before(5000);
      client.pause(500);

      this.pinboardPage.click('@firstToast');
      this.pinboardPage.waitForElementNotPresent('@firstToast');
      this.pinboardPage.waitForElementVisible('@firstToast');
      this.pinboardPage.expect.element('@firstToast').text.to.equal(
        'Failed to save pinboard. Click to try again!'
      );
      client.pause(500);

      this.pinboardPage.click('@firstToast');
      this.pinboardPage.waitForElementNotPresent('@firstToast');

      times(50, () => {
        client.pause(100);
        this.pinboardPage.expect.element('@firstToast').to.be.not.present;
      });
    });
  });
});
