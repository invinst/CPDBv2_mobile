'use strict';

const _ = require('lodash');
const api = require(__dirname + '/../../mock-api');
const { TIMEOUT } = require(__dirname + '/../../constants');

const mockData = require(__dirname + '/../../mock-data/pinboard-page');


function waitForGraphAnimationEnd(pinboardPage) {
  pinboardPage.waitForElementVisible('@currentDate', TIMEOUT);
  pinboardPage.expect.element('@currentDate').text.to.equal('2008-01-11').after(3000);
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
    api.cleanMock();
    done();
  });

  context('animatedSocialgraph section', function () {
    beforeEach(function (client, done) {
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

      api.mock('GET', mockData.baseRelevantDocumentsUrl, 200, mockData.firstRelevantDocumentsResponse);
      api.mock(
        'GET', `${mockData.baseRelevantDocumentsUrl}limit=4&offset=4`, 200, mockData.secondRelevantDocumentsResponse
      );
      api.mock(
        'GET', `${mockData.baseRelevantDocumentsUrl}limit=4&offset=8`, 200, mockData.lastRelevantDocumentsResponse
      );

      api.mock('GET', mockData.baseRelevantCoaccusalsUrl, 200, mockData.firstRelevantCoaccusalsResponse);
      api.mock(
        'GET', `${mockData.baseRelevantCoaccusalsUrl}limit=4&offset=4`, 200, mockData.secondRelevantCoaccusalsResponse
      );
      api.mock(
        'GET', `${mockData.baseRelevantCoaccusalsUrl}limit=4&offset=8`, 200, mockData.lastRelevantCoaccusalsResponse
      );

      api.mock('GET', mockData.baseRelevantComplaintsUrl, 200, mockData.firstRelevantComplaintsResponse);
      api.mock(
        'GET', `${mockData.baseRelevantComplaintsUrl}limit=4&offset=4`, 200, mockData.secondRelevantComplaintsResponse
      );
      api.mock(
        'GET', `${mockData.baseRelevantComplaintsUrl}limit=4&offset=8`, 200, mockData.lastRelevantComplaintsResponse
      );

      this.pinboardPage = client.page.pinboardPage();
      this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
      this.pinboardPage.expect.element('@body').to.be.present;
      done();
    });

    it('should render correctly', function (client) {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.element('@startDate').to.be.visible;
      pinboardPage.expect.element('@startDate').text.to.equal('1990-01-09');
      pinboardPage.expect.element('@endDate').text.to.equal('2008-01-11');
      waitForGraphAnimationEnd(pinboardPage);
      const graphNodes = pinboardPage.section.graphNodes;

      checkGraphGroupColors(client, graphNodes, {
        'rgb(253, 94, 76)': 6,
        'rgb(244, 162, 152)': 6,
        'rgb(249, 211, 195)': 5,
        'rgb(243, 42, 41)': 1,
        'rgb(255, 80, 80)': 1,
        'rgb(243, 173, 173)': 1,
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
      waitForGraphAnimationEnd(pinboardPage);

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

    it('should pause timeline when click on toggle timeline button', function (client) {
      const pinboardPage = this.pinboardPage;
      const timeline = pinboardPage.section.timeline;
      waitForGraphAnimationEnd(pinboardPage);

      timeline.expect.element('@toggleTimelineButton').to.have.attribute('class', 'toggle-timeline-btn play-icon');

      client.pause(100);
      timeline.click('@toggleTimelineButton');
      timeline.expect.element('@toggleTimelineButton').to.have.attribute('class', 'toggle-timeline-btn pause-icon');
      pinboardPage.expect.element('@currentDate').text.to.not.equal('2008-01-11').after(200);
      pinboardPage.expect.element('@currentDate').text.to.not.equal('1990-01-09').after(200);

      timeline.click('@toggleTimelineButton');

      let currentDateText = '';
      const middleDays = [
        '1992-03-08',
        '1994-01-10',
        '1994-03-07',
        '1994-03-12',
        '1994-04-17',
        '1998-11-17',
        '1999-02-08',
        '1999-07-22',
        '2006-03-15'
      ];
      pinboardPage.getText('@currentDate', result => {
        currentDateText = result.value;

        client.assert.notEqual(middleDays.indexOf(currentDateText), -1, 'Current Date should be on the list');
      }).perform(function () {
        client.pause(1000);

        pinboardPage.expect.element('@currentDate').text.to.equal(currentDateText);
        timeline.expect.element('@toggleTimelineButton').to.have.attribute('class', 'toggle-timeline-btn play-icon');

        timeline.click('@toggleTimelineButton');
        waitForGraphAnimationEnd(pinboardPage);
      });
    });

    it('should change the graph when click on specific part of the timeline', function (client) {
      const pinboardPage = this.pinboardPage;
      waitForGraphAnimationEnd(pinboardPage);

      const graphNodes = pinboardPage.section.graphNodes;
      const graphLinks = pinboardPage.section.graphLinks;
      client.assertCount(graphNodes.selector, 20, graphNodes.locateStrategy);
      client.assertCount(graphLinks.selector, 37, graphLinks.locateStrategy);

      client.pause(100);
      pinboardPage.moveToElement('@timelineSlider', undefined, undefined);
      client.mouseButtonClick(0);

      checkGraphGroupColors(client, graphNodes, {
        'rgb(253, 94, 76)': 6,
        'rgb(244, 162, 152)': 6,
        'rgb(249, 211, 195)': 5,
        'rgb(243, 42, 41)': 1,
        'rgb(255, 80, 80)': 1,
        'rgb(243, 173, 173)': 1,
      });

      client.assertCount(graphNodes.selector, 20, graphNodes.locateStrategy);
      client.assertCount(graphLinks.selector, 14, graphLinks.locateStrategy);
    });
  });

  context('animatedSocialgraph off screen feature', function () {
    it('should pause the timeline when invisible and continue to play when visible', function (client) {
      api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/', 200, mockData.pinboardData);
      api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/complaints/', 200, mockData.pinboardCRsData);
      api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/officers/', 200, mockData.pinboardOfficersData);
      api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/trrs/', 200, mockData.pinboardTRRsData);
      api.mock('GET', '/api/v2/mobile/social-graph/network/?pinboard_id=5cd06f2b', 200, mockData.socialGraphBigData);

      api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/relevant-documents/', 200,
        mockData.firstRelevantDocumentsResponse);
      api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/relevant-coaccusals/', 200,
        mockData.firstRelevantCoaccusalsResponse);
      api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/relevant-complaints/', 200,
        mockData.firstRelevantComplaintsResponse);

      this.pinboardPage = client.page.pinboardPage();
      this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
      this.pinboardPage.expect.element('@body').to.be.present;

      const timeline = this.pinboardPage.section.timeline;
      timeline.expect.element('@toggleTimelineButton').to.have.attribute('class', 'toggle-timeline-btn pause-icon');

      client.execute('scrollTo(0, 3000)');
      timeline.expect.element('@toggleTimelineButton').to.have.attribute('class', 'toggle-timeline-btn play-icon');

      client.execute('scrollTo(0, -3000)');
      timeline.expect.element('@toggleTimelineButton').to.have.attribute('class', 'toggle-timeline-btn pause-icon');
    });
  });
});
