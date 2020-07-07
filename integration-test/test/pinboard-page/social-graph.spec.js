'use strict';

const _ = require('lodash');
const api = require(__dirname + '/../../mock-api');
const assert = require('assert');
const { TIMEOUT } = require(__dirname + '/../../constants');
const mockData = require(__dirname + '/../../mock-data/pinboard-page');
const { mockGetAppConfig } = require(__dirname + '/../../mock-data/app-config');


function waitForGraphAnimationEnd(pinboardPage, client) {
  pinboardPage.waitForElementVisible('@socialGraph', TIMEOUT);
  const graphLinks = pinboardPage.section.graphLinks;
  let graphLinksLength;
  const checkGraphLinksLength = () => {
    client.elements(graphLinks.locateStrategy, graphLinks.selector, (result) => graphLinksLength = result.value.length);
    return graphLinksLength === 37;
  };

  client.waitForCondition(checkGraphLinksLength, 3000);
}

function checkGraphGroupColors(client, graphNodes, expectedNodeGroupColors) {
  let groupsColors = [];
  client.elements(graphNodes.locateStrategy, graphNodes.selector, function (graphNodes) {
    client.assert.equal(graphNodes.value.length, 20);

    graphNodes.value.forEach((graphNode) => {
      client.elementIdCssProperty(graphNode.ELEMENT, 'fill', (fillColor) => {
        groupsColors.push(fillColor.value);
      });
    });
  }).perform(function () {
    const nodeGroupColors = _.countBy(groupsColors);
    client.assert.deepEqual(nodeGroupColors, expectedNodeGroupColors);
  });
}

describe('Pinboard Social Graph', function () {
  beforeEach(function (client, done) {
    api.clean();
    done();
  });

  context('animatedSocialgraph section', function () {
    beforeEach(function (client, done) {
      api.onGet('/api/v2/app-config/').reply(200, mockGetAppConfig);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/').reply(200, mockData.pinboardData);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/complaints/').reply(200, mockData.pinboardCRsData);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/officers/').reply(200, mockData.pinboardOfficersData);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/trrs/').reply(200, mockData.pinboardTRRsData);
      api.onGet('/api/v2/mobile/social-graph/network/?pinboard_id=5cd06f2b').reply(200, mockData.socialGraphData);
      api
        .onGet('/api/v2/mobile/social-graph/geographic-crs/?pinboard_id=5cd06f2b')
        .reply(200, mockData.geographicCrsData);
      api
        .onGet('/api/v2/mobile/social-graph/geographic-trrs/?pinboard_id=5cd06f2b')
        .reply(200, mockData.geographicTrrsData);

      api.onGet(mockData.baseRelevantDocumentsUrl).reply(200, mockData.firstRelevantDocumentsResponse);
      api
        .onGet(`${mockData.baseRelevantDocumentsUrl}limit=4&offset=4`)
        .reply(200, mockData.secondRelevantDocumentsResponse);
      api
        .onGet(`${mockData.baseRelevantDocumentsUrl}limit=4&offset=8`)
        .reply(200, mockData.lastRelevantDocumentsResponse);

      api.onGet(mockData.baseRelevantCoaccusalsUrl).reply(200, mockData.firstRelevantCoaccusalsResponse);
      api
        .onGet(`${mockData.baseRelevantCoaccusalsUrl}limit=4&offset=4`)
        .reply(200, mockData.secondRelevantCoaccusalsResponse);
      api
        .onGet(`${mockData.baseRelevantCoaccusalsUrl}limit=4&offset=8`)
        .reply(200, mockData.lastRelevantCoaccusalsResponse);

      api.onGet(mockData.baseRelevantComplaintsUrl).reply(200, mockData.firstRelevantComplaintsResponse);
      api
        .onGet(`${mockData.baseRelevantComplaintsUrl}limit=4&offset=4`)
        .reply(200, mockData.secondRelevantComplaintsResponse);
      api
        .onGet(`${mockData.baseRelevantComplaintsUrl}limit=4&offset=8`)
        .reply(200, mockData.lastRelevantComplaintsResponse);

      this.pinboardPage = client.page.pinboardPage();
      this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
      this.pinboardPage.expect.element('@body').to.be.present;
      done();
    });

    it('should render correctly', function (client) {
      const pinboardPage = this.pinboardPage;
      waitForGraphAnimationEnd(pinboardPage, client);
      const graphNodes = pinboardPage.section.graphNodes;

      checkGraphGroupColors(client, graphNodes, {
        'rgb(245, 37, 36)': 6,
        'rgb(255, 65, 44)': 6,
        'rgb(255, 100, 83)': 5,
        'rgb(244, 162, 152)': 1,
        'rgb(249, 211, 195)': 1,
        'rgb(245, 244, 244)': 1,
      });
      const graphLinks = pinboardPage.section.graphLinks;
      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        client.assert.equal(graphLinks.value.length, 37);
      });

      const expectedlinkGroupColors = {
        'link-group-color-1': 6,
        'link-group-color-2': 6,
        'link-group-color-3': 6,
        'link-group-color-4': 6,
        'link-group-color-5': 6,
        'link-group-color-6': 7,
      };

      let linkGroupColorsMap = [];
      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        graphLinks.value.forEach((graphLink) => {
          client.elementIdAttribute(graphLink.ELEMENT, 'class', (result) => {
            linkGroupColorsMap.push(result.value.match(/link-group-color-[\d]/));
          });
        });
      }).perform(function () {
        const linkGroupColors = _.countBy(linkGroupColorsMap);
        client.assert.deepEqual(linkGroupColors, expectedlinkGroupColors);
      });
    });

    it('should show connected nodes when double click on a node', function (client) {
      const pinboardPage = this.pinboardPage;
      waitForGraphAnimationEnd(pinboardPage, client);

      client.waitForAnimationEnd(pinboardPage.elements.biggestGraphNode.selector, 'xpath', 10000);
      pinboardPage.expect.element('@biggestGraphNode').to.be.visible;
      pinboardPage.moveToElement('@biggestGraphNode', undefined, undefined);
      client.doubleClick();

      const shownGraphNodes = pinboardPage.section.shownGraphNodes;
      const hiddenGraphNodes = pinboardPage.section.hiddenGraphNodes;
      const shownGraphLinks = pinboardPage.section.shownGraphLinks;
      const hiddenGraphLinks = pinboardPage.section.hiddenGraphLinks;

      client.assertCount(hiddenGraphNodes.selector, 9, hiddenGraphNodes.locateStrategy);
      client.assertCount(shownGraphNodes.selector, 11, shownGraphNodes.locateStrategy);

      client.assertCount(hiddenGraphLinks.selector, 27, hiddenGraphNodes.locateStrategy);
      client.assertCount(shownGraphLinks.selector, 10, shownGraphLinks.locateStrategy);

      client.pause(200);
      pinboardPage.moveToElement('@biggestGraphNode', undefined, undefined);
      client.doubleClick();

      client.assertCount(hiddenGraphNodes.selector, 0, hiddenGraphNodes.locateStrategy);
      client.assertCount(shownGraphNodes.selector, 20, shownGraphNodes.locateStrategy);

      client.assertCount(hiddenGraphLinks.selector, 0, hiddenGraphNodes.locateStrategy);
      client.assertCount(shownGraphLinks.selector, 37, shownGraphLinks.locateStrategy);
    });

    it('should start the timeline from beginning when clicking on the refresh button', function (client) {
      const pinboardPage = this.pinboardPage;
      waitForGraphAnimationEnd(pinboardPage, client);

      const graphLinks = pinboardPage.section.graphLinks;
      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (result) {
        client.assert.equal(result.value.length, 37);
      });

      pinboardPage.click('@refreshButton');

      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (result) {
        assert.notEqual(result.value.length, 37);
      });

      waitForGraphAnimationEnd(pinboardPage, client);
      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (result) {
        client.assert.equal(result.value.length, 37);
      });
    });
  });
});
