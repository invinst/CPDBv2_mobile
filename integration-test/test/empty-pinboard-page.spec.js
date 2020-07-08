'use strict';

var _ = require('lodash');
var assert = require('assert');
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
    'officers': [],
  },
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
  'officers': [],
});

function mockPinboard(pinboardId, mockPinboard) {
  api.onGet(`/api/v2/mobile/pinboards/${pinboardId}/`).reply(200, mockPinboard);
  api.onGet(`/api/v2/mobile/pinboards/${pinboardId}/complaints/`).reply(200, []);
  api.onGet(`/api/v2/mobile/pinboards/${pinboardId}/officers/`).reply(200, []);
  api.onGet(`/api/v2/mobile/pinboards/${pinboardId}/trrs/`).reply(200, []);
  api.onGet(`/api/v2/mobile/social-graph/network/?pinboard_id=${pinboardId}`).reply(200, {});
  api.onGet(`/api/v2/mobile/social-graph/geographic/?pinboard_$id=${pinboardId}`).reply(200, []);

  const baseRelevantDocumentsUrl = `/api/v2/mobile/pinboards/${pinboardId}/relevant-documents/?`;
  const relevantDocumentsResponse = getPaginationResponse(
    baseRelevantDocumentsUrl,
    (number) => _.range(0, number).map(generateRelevantDocument),
    4, 0, 4
  );
  api.onGet(baseRelevantDocumentsUrl).reply(200, relevantDocumentsResponse);

  const baseRelevantCoaccusalsUrl = `/api/v2/mobile/pinboards/${pinboardId}/relevant-coaccusals/?`;
  const relevantCoaccusalsResponse = getPaginationResponse(
    `/api/v2/mobile/pinboards/${pinboardId}/relevant-documents/?`,
    (number) => _.range(0, number).map(generateRelevantCoaccusal),
    4, 0, 4
  );
  api.onGet(baseRelevantCoaccusalsUrl).reply(200, relevantCoaccusalsResponse);

  const baseRelevantComplaintsUrl = `/api/v2/mobile/pinboards/${pinboardId}/relevant-complaints/?`;
  const relevantComplaintsResponse = getPaginationResponse(
    baseRelevantComplaintsUrl,
    (number) => _.range(0, number).map(generateRelevantComplaint),
    4, 0, 4
  );
  api.onGet(baseRelevantComplaintsUrl).reply(200, relevantComplaintsResponse);
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
    'description': '**It will be a election** and we are going to do the best '
        + '**Lorem Ipsum is simply dummy text of the printing and typesetting industry.**'
        + 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
        + 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    'id': 'b20c2c36',
    'title': 'Watts Crew',
  }, {
    'description': 'It is a nickname given to a group of five Chicago Police officers in a.',
    'id': '22e66085',
    'title': 'Skullcap Crew',
  }],
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
    3584, 24403, 3564, 26902, 27101,
  ],
  'crids': [],
  'trr_ids': [],
};

const updatedFromSourceFirstExamplePinboard = {
  'id': '11613bb2',
  'title': 'Watts Crew',
  'officer_ids': [1],
  'crids': [],
  'trr_ids': [],
  'description': 'Officers with at least 10 complaints against them generate 64% of all complaints.',
};
const updatedFromSourceSecondExamplePinboard = {
  'id': '11613bb2',
  'title': 'Skullcap Crew',
  'officer_ids': [2],
  'crids': [],
  'trr_ids': [],
  'description': 'It is a nickname given to a group of five Chicago Police officers in a...',
};

function mockCMS() {
  api.onGet('/api/v2/cms-pages/pinboard-page/').reply(200, pinboardMockData.mockCMSPinboardPage);
}

function mockUpdateEmptyPinboard() {
  api
    .onPut('/api/v2/mobile/pinboards/11613bb2/', { 'source_pinboard_id': 'b20c2c36' })
    .reply(200, updatedFromSourceFirstExamplePinboard);
  api
    .onPut('/api/v2/mobile/pinboards/11613bb2/', { 'source_pinboard_id': '22e66085' })
    .reply(200, updatedFromSourceSecondExamplePinboard);
}

describe('Empty Pinboard Page', function () {
  beforeEach(function (client, done) {
    mockPinboard(emptyPinboardId, emptyPinboard);
    mockCMS();
    mockUpdateEmptyPinboard();

    this.emptyPinboardPage = client.page.emptyPinboardPage();
    this.pinboardPage = client.page.pinboardPage();
    this.emptyPinboardPage.navigate(this.emptyPinboardPage.url(emptyPinboardId));
    this.emptyPinboardPage.expect.element('@body').to.be.present;
    done();
  });

  it('should render correctly', function (client) {
    this.emptyPinboardPage.expect.element('@title').text.to.equal('Get started');

    this.emptyPinboardPage.expect.element('@firstExampleTitle').text.to.equal('Watts Crew');
    this.emptyPinboardPage.expect.element('@firstExampleDescription').text.to.endsWith('...');
    this.emptyPinboardPage.expect.element('@firstExampleDescription').text.to.not.contain(
      'Contrary to popular belief, Lorem Ipsum is not simply random text.'
    );
    client.getElementProperty(
      this.emptyPinboardPage.elements.firstExampleDescription.locateStrategy,
      this.emptyPinboardPage.elements.firstExampleDescription.selector,
      'innerHTML',
      function (result) {
        assert.ok(
          /.*<p><strong>It will be a election<\/strong> and we are going to do the best <strong>Lorem.*<\/strong>.*/
            .test(result.value)
        );
      },
    );

    this.emptyPinboardPage.expect.element('@secondExampleTitle').text.to.equal('Skullcap Crew');
    this.emptyPinboardPage.expect.element('@secondExampleDescription').text.to.equal(
      'It is a nickname given to a group of five Chicago Police officers in a.'
    );
  });

  it('should go to Watts Crew Pinboard when clicking on Repeaters row ', function (client) {
    this.emptyPinboardPage.click('@firstExamplePinboardRow');

    client.assert.urlContains('/pinboard/11613bb2/watts-crew/');
    this.pinboardPage.expect.element('@pinboardTitle').to.be.visible;
    this.pinboardPage.expect.element('@pinboardDescription').to.be.visible;
    this.pinboardPage.getValue('@pinboardTitle', function (result) {
      assert.equal(result.value, 'Watts Crew');
    });
    this.pinboardPage.expect.element('@pinboardDescription').text.to.equal(
      'Officers with at least 10 complaints against them generate 64% of all complaints.'
    );
  });

  it('should go to Skullcap Crew Pinboard when clicking on Skullcap crew row ', function (client) {
    this.emptyPinboardPage.expect.element('@title').text.to.equal('Get started');
    this.emptyPinboardPage.expect.element('@description').text.to.equal(
      'Use search to find officers and individual complaint records ' +
      'and press the plus button to add cards to your pinboard.\n\n' +
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.'
    );
    this.emptyPinboardPage.expect.element('@secondExamplePinboardRow').text.to.contain('Skullcap Crew');

    this.emptyPinboardPage.click('@secondExamplePinboardRow');

    client.assert.urlContains('/pinboard/11613bb2/skullcap-crew/');

    this.pinboardPage.expect.element('@pinboardTitle').to.be.visible;
    this.pinboardPage.expect.element('@pinboardDescription').to.be.visible;
    this.pinboardPage.getValue('@pinboardTitle', function (result) {
      assert.equal(result.value, 'Skullcap Crew');
    });
    this.pinboardPage.expect.element('@pinboardDescription').text.to.equal(
      'It is a nickname given to a group of five Chicago Police officers in a...'
    );
  });
});


describe('No Id Pinboard Page', function () {
  beforeEach(function (client, done) {
    mockCMS();

    mockPinboard(emptyPinboardId, emptyPinboard);
    mockPinboard(skullcapPinboardId, copyOfSkullcapPinboard);
    mockPinboard(wattsPinboardId, copyOfWattsPinboard);

    done();
  });

  it('should open empty pinboard page if no recent pinboard', function (client) {
    api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true').reply(200, emptyPinboard);
    this.noIdPinboardPage = client.page.emptyPinboardPage();
    this.noIdPinboardPage.navigate(this.noIdPinboardPage.url());
    client.waitForElementVisible('body', TIMEOUT);

    this.noIdPinboardPage.expect.element('@title').text.to.equal('Get started');
    this.noIdPinboardPage.expect.element('@description').text.to.equal(
      'Use search to find officers and individual complaint records ' +
      'and press the plus button to add cards to your pinboard.\n\n' +
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.'
    );
    this.noIdPinboardPage.expect.element('@firstExampleTitle').text.to.equal('Watts Crew');
    this.noIdPinboardPage.expect.element('@secondExampleTitle').text.to.contain('Skullcap Crew');
  });

  it('should open a pinboard page if it is lasted pinboard', function (client) {
    api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true').reply(200, copyOfSkullcapPinboard);
    this.noIdPinboardPage = client.page.pinboardPage();
    this.noIdPinboardPage.navigate(this.noIdPinboardPage.url());
    client.waitForElementVisible('body', TIMEOUT);

    this.noIdPinboardPage.expect.element('@searchBar').to.be.visible;
    this.noIdPinboardPage.expect.element('@header').to.be.visible;
    this.noIdPinboardPage.expect.element('@pinboardTitle').text.to.equal('Skullcap Crew');
  });
});
