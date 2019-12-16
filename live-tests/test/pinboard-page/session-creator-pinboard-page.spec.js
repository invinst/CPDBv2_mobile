'use strict';

var api = require(__dirname + '/../../mock-api');
const { TIMEOUT } = require(__dirname + '/../../constants');

var mockData = require(__dirname + '/../../mock-data/pinboard-page');

describe('Session Creator Pinboard Page', function () {
  beforeEach(function (client, done) {
    api.cleanMock();

    api.mockPost(
      '/api/v2/mobile/pinboards/',
      200,
      mockData.createPinboardeeee7777Params,
      mockData.createPinboardeeee7777Data,
    );
    api.mock('GET', '/api/v2/mobile/pinboards/eeee7777/complaints/', 200, mockData.pinboardeeee7777CRsData);
    api.mock('GET', '/api/v2/mobile/pinboards/eeee7777/officers/', 200, mockData.pinboardeeee7777OfficersData);
    api.mock('GET', '/api/v2/mobile/pinboards/eeee7777/trrs/', 200, mockData.pinboardeeee7777TRRsData);

    api.mockPost(
      '/api/v2/mobile/pinboards/',
      200,
      mockData.createPinboardffff6666Params,
      mockData.createPinboardffff6666Data,
    );
    api.mock('GET', '/api/v2/mobile/pinboards/ffff6666/complaints/', 200, mockData.pinboardffff6666CRsData);
    api.mock('GET', '/api/v2/mobile/pinboards/ffff6666/officers/', 200, mockData.pinboardffff6666OfficersData);
    api.mock('GET', '/api/v2/mobile/pinboards/ffff6666/trrs/', 200, mockData.pinboardffff6666TRRsData);

    api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true', 200, mockData.pinboardData);

    this.pinboardPage = client.page.pinboardPage();
    done();
  });

  const showingPinboardffff6666 = (client, pinboardPage) => {
    pinboardPage.expect.element('@body').to.be.present;
    client.assert.urlContains('/pinboard/ffff6666/');

    const pinnedSection = pinboardPage.section.pinnedSection;
    const officers = pinnedSection.section.officers;
    const crs = pinnedSection.section.crs;
    const trrs = pinnedSection.section.trrs;

    client.assertCount(officers.section.card.selector, 2);
    client.assertCount(crs.section.card.selector, 1);
    client.assertCount(trrs.section.card.selector, 2);
  };

  it('should create new pinboard by query', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(undefined, '?officer-ids=1,2&crids=5678123&trr-ids=3,2'));
    showingPinboardffff6666(client, this.pinboardPage);
  });

  it('should create new pinboard by query with some not-found items', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(undefined, '?officer-ids=1,2&crids=987654,5678123&trr-ids=9,7'));
    this.pinboardPage.expect.element('@body').to.be.present;
    client.assert.urlContains('/pinboard/eeee7777/');

    this.pinboardPage.expect.element('@firstToast').text.to.equal(
      '1 out of 2 allegations were added to this pinboard. 1 out of 2 allegation IDs could not be recognized (987654).'
    ).before(TIMEOUT);
    this.pinboardPage.expect.element('@secondToast').text.to.equal(
      '2 out of 2 TRR IDs could not be recognized (9, 7).'
    ).before(TIMEOUT);

    const pinnedSection = this.pinboardPage.section.pinnedSection;
    const officers = pinnedSection.section.officers;
    const crs = pinnedSection.section.crs;
    const trrs = pinnedSection.section.trrs;

    client.assertCount(officers.section.card.selector, 2);
    client.assertCount(crs.section.card.selector, 1);
    client.assertCount(trrs.section.card.selector, 0);
  });

  it('should accept params without s', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(undefined, '?officer-id=1,2&crid=5678123&trr-id=3,2'));
    showingPinboardffff6666(client, this.pinboardPage);
  });

  it('should accept params with under score', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(undefined, '?officer_ids=1,2&crid=5678123&trr_id=3,2'));
    showingPinboardffff6666(client, this.pinboardPage);
  });

  it('should accept camelCase params', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(undefined, '?officerIds=1,2&crids=5678123&trrId=3,2'));
    showingPinboardffff6666(client, this.pinboardPage);
  });

  it('should accept params with some capitalizing mistakes', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(undefined, '?officerID=1,2&CRids=5678123&tRRIds=3,2'));
    showingPinboardffff6666(client, this.pinboardPage);
  });

  it('should skip invalid param and show invalid param message', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(
      undefined, '?officer_ids=1,2&crid=5678123&trr_id=3,2&invalid-param=1,2')
    );
    showingPinboardffff6666(client, this.pinboardPage);

    this.pinboardPage.expect.element('@firstToast').text.to.equal('invalid-param is not recognized.');
  });

  it('should skip invalid params and show invalid params message', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(
      undefined, '?officer_ids=1,2&crid=5678123&trr_id=3,2&invalid-param-a=1,2&invalid-param-b=1,2')
    );
    showingPinboardffff6666(client, this.pinboardPage);

    this.pinboardPage.expect.element('@firstToast').text.to.equal(
      'invalid-param-a, invalid-param-b are not recognized.'
    );
  });

  it('should show redirect message and redirect to latest pinboard if no valid params', function (client) {
    this.pinboardPage.navigate(this.pinboardPage.url(undefined, '?invalid-param-a=1,2&invalid-param-b=1,2'));
    client.assert.urlContains('/pinboard/5cd06f2b/');

    this.pinboardPage.expect.element('@firstToast').text.to.equal(
      'invalid-param-a, invalid-param-b are not recognized.'
    );
    this.pinboardPage.expect.element('@secondToast').text.to.equal('Redirected to latest pinboard.');
  });
});
