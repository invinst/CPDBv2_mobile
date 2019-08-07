'use strict';

var _ = require('lodash');
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');
const { getPaginationResponse } = require(__dirname + '/../utils/getPaginationResponse');
var pinboardMockData = require(__dirname + '/../mock-data/pinboard-page');


const generateRelevantDocument = (id) => ({
  id,
  'preview_image_url': 'http://via.placeholder.com/121x157',
  'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
  'allegation': {
    'crid': '1079876',
    'category': 'Operations/Personnel Violation',
    'incident_date': '2014-05-02',
    'officers': []
  }
});

const generateRelevantCoaccusal = (id) => ({
  id,
  'rank': 'Officer',
  'full_name': 'Baudilio Lopez',
  'coaccusal_count': 47,
});

const generateRelevantComplaint = crid => ({
  crid,
  'category': 'Operations/Personnel Violation',
  'incident_date': '2014-05-02',
  'point': { lat: 45, lon: -87 },
  'officers': []
});

function mockPinboard(pinboardId, mockPinboard) {
  api.mock('GET', `/api/v2/mobile/pinboards/${pinboardId}/`, 200, mockPinboard);
  api.mock('GET', `/api/v2/mobile/pinboards/${pinboardId}/complaints/`, 200, []);
  api.mock('GET', `/api/v2/mobile/pinboards/${pinboardId}/officers/`, 200, []);
  api.mock('GET', `/api/v2/mobile/pinboards/${pinboardId}/trrs/`, 200, []);
  api.mock('GET', `/api/v2/mobile/social-graph/network/?pinboard_id=${pinboardId}`, 200, {});
  api.mock('GET', `/api/v2/mobile/social-graph/geographic/?pinboard_$id=${pinboardId}`, 200, []);

  const baseRelevantDocumentsUrl = `/api/v2/mobile/pinboards/${pinboardId}/relevant-documents/?`;
  const relevantDocumentsResponse = getPaginationResponse(
    baseRelevantDocumentsUrl,
    (number) => _.range(0, number).map(generateRelevantDocument),
    4, 0, 4
  );
  api.mock('GET', baseRelevantDocumentsUrl, 200, relevantDocumentsResponse);

  const baseRelevantCoaccusalsUrl = `/api/v2/mobile/pinboards/${pinboardId}/relevant-coaccusals/?`;
  const relevantCoaccusalsResponse = getPaginationResponse(
    `/api/v2/mobile/pinboards/${pinboardId}/relevant-documents/?`,
    (number) => _.range(0, number).map(generateRelevantCoaccusal),
    4, 0, 4
  );
  api.mock('GET', baseRelevantCoaccusalsUrl, 200, relevantCoaccusalsResponse);

  const baseRelevantComplaintsUrl = `/api/v2/mobile/pinboards/${pinboardId}/relevant-complaints/?`;
  const relevantComplaintsResponse = getPaginationResponse(
    baseRelevantComplaintsUrl,
    (number) => _.range(0, number).map(generateRelevantComplaint),
    4, 0, 4
  );
  api.mock('GET', baseRelevantComplaintsUrl, 200, relevantComplaintsResponse);
}

const emptyPinboardId = '11613bb2';
const emptyPinboard = {
  'id': '11613bb2',
  'title': 'Empty Pinboard',
  'description': 'Pinboard with no pinned items',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'example_pinboards': [{
    'description': 'Officers with at least 10 complaints against them generate 64% of all complaints.',
    'id': 'b20c2c36',
    'title': 'Watts Crew',
  }, {
    'description': 'It is a nickname given to a group of five Chicago Police officers in a...',
    'id': '22e66085',
    'title': 'Skullcap Crew',
  }]
};

const skullcapPinboardId = '22e66085';
const copyOfSkullcapPinboard = {
  'id': '44ab6189',
  'title': 'Skullcap Crew',
  'description': '',
  'officer_ids': [25503, 25962, 32384, 25732, 27439],
  'crids': [],
  'trr_ids': [],
};

const wattsPinboardId = 'b20c2c36';
const copyOfWattsPinboard = {
  'id': 'e71c3c78',
  'title': 'Watts Crew',
  'description': '',
  'officer_ids': [
    30215, 19331, 2334, 13777, 20481, 10330,
    16181, 15883, 31456, 23933, 27871, 7771,
    3584, 24403, 3564, 26902, 27101
  ],
  'crids': [],
  'trr_ids': [],
};

function mockCMS() {
  api.mock('GET', '/api/v2/cms-pages/pinboard-page/', 200, pinboardMockData.mockCMSPinboardPage);
}

describe('Empty Pinboard Page', function () {
  beforeEach(function (client, done) {
    api.cleanMock();

    mockPinboard(emptyPinboardId, emptyPinboard);
    mockPinboard(skullcapPinboardId, copyOfSkullcapPinboard);
    mockPinboard(wattsPinboardId, copyOfWattsPinboard);
    mockCMS();

    this.emptyPinboardPage = client.page.emptyPinboardPage();
    this.emptyPinboardPage.navigate(this.emptyPinboardPage.url(emptyPinboardId));
    client.waitForElementVisible('body', TIMEOUT);
    done();
  });

  it('should go to Watts Crew Pinboard when clicking on Repeaters row ', function (client) {
    this.emptyPinboardPage.expect.element('@title').text.to.equal('Get started');
    this.emptyPinboardPage.expect.element('@description').text.to.equal(
      'Use search to find officers and individual complaint records ' +
      'and press the plus button to add cards to your pinboard.\n\n' +
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.'
    );
    this.emptyPinboardPage.expect.element('@firstExamplePinboardRow').text.to.contain('Watts Crew');
    this.emptyPinboardPage.expect.element('@firstExamplePinboardRow').text.to.contain('Officers with at');

    this.emptyPinboardPage.click('@firstExamplePinboardRow');

    client.assert.urlContains('/pinboard/e71c3c78/watts-crew/');

    client.back();

    this.emptyPinboardPage.waitForElementVisible('@title', TIMEOUT);
    this.emptyPinboardPage.expect.element('@title').text.to.equal('Get started');
    client.assert.urlContains(`/pinboard/${emptyPinboardId}/empty-pinboard/`);
  });

  it('should go to Skullcap Crew Pinboard when clicking on Skullcap crew row ', function (client) {
    this.emptyPinboardPage.expect.element('@title').text.to.equal('Get started');
    this.emptyPinboardPage.expect.element('@description').text.to.equal(
      'Use search to find officers and individual complaint records ' +
      'and press the plus button to add cards to your pinboard.\n\n' +
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.'
    );
    this.emptyPinboardPage.expect.element('@secondExamplePinboardRow').text.to.contain('Skullcap Crew');
    this.emptyPinboardPage.expect.element('@secondExamplePinboardRow').text.to.contain('It is a nickname');

    this.emptyPinboardPage.click('@secondExamplePinboardRow');

    client.assert.urlContains('/pinboard/44ab6189/skullcap-crew/');

    client.back();

    this.emptyPinboardPage.waitForElementVisible('@title', TIMEOUT);
    this.emptyPinboardPage.expect.element('@title').text.to.equal('Get started');
    client.assert.urlContains(`/pinboard/${emptyPinboardId}/empty-pinboard/`);
  });
});


describe('No Id Pinboard Page', function () {
  beforeEach(function (client, done) {
    api.cleanMock();
    mockCMS();

    mockPinboard(emptyPinboardId, emptyPinboard);
    mockPinboard(skullcapPinboardId, copyOfSkullcapPinboard);
    mockPinboard(wattsPinboardId, copyOfWattsPinboard);

    done();
  });

  it('should open empty pinboard page if no recent pinboard', function (client) {
    api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true', 200, emptyPinboard);
    this.noIdPinboardPage = client.page.emptyPinboardPage();
    this.noIdPinboardPage.navigate(this.noIdPinboardPage.url());
    client.waitForElementVisible('body', TIMEOUT);

    this.noIdPinboardPage.expect.element('@title').text.to.equal('Get started');
    this.noIdPinboardPage.expect.element('@description').text.to.equal(
      'Use search to find officers and individual complaint records ' +
      'and press the plus button to add cards to your pinboard.\n\n' +
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.'
    );
    this.noIdPinboardPage.expect.element('@firstExamplePinboardRow').text.to.contain('Watts Crew');
    this.noIdPinboardPage.expect.element('@firstExamplePinboardRow').text.to.contain('Officers with at');
    this.noIdPinboardPage.expect.element('@secondExamplePinboardRow').text.to.contain('Skullcap Crew');
    this.noIdPinboardPage.expect.element('@secondExamplePinboardRow').text.to.contain('It is a nickname');
  });

  it('should open a pinboard page if it is lasted pinboard', function (client) {
    api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true', 200, copyOfSkullcapPinboard);
    this.noIdPinboardPage = client.page.pinboardPage();
    this.noIdPinboardPage.navigate(this.noIdPinboardPage.url());
    client.waitForElementVisible('body', TIMEOUT);

    this.noIdPinboardPage.expect.element('@searchBar').to.be.visible;
    this.noIdPinboardPage.expect.element('@header').to.be.visible;
    this.noIdPinboardPage.expect.element('@pinboardTitle').text.to.equal('Skullcap Crew');
  });
});
