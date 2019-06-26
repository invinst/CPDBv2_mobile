'use strict';

var _ = require('lodash');
var assert = require('assert');
var api = require(__dirname + '/../../mock-api');
const { TIMEOUT } = require(__dirname + '/../../constants');

var mockData = require(__dirname + '/../../mock-data/pinboard-page');


function waitForGraphAnimationEnd(client, pinboardPage) {
  client.waitForElementVisible(pinboardPage.section.currentDate.selector, TIMEOUT);
  client.waitForText(
    pinboardPage.section.currentDate.selector,
    (text) => {return text === '2008-01-11';},
    3000,
    'expected timeline reaches end date after 1.65s'
  );
}

function checkGraphGroupColors(client, graphNodes, expectedGroupColors) {
  let groupsColors = [];
  client.elements(graphNodes.locateStrategy, graphNodes.selector, function (graphNodes) {
    assert.equal(graphNodes.value.length, 20);

    graphNodes.value.forEach((graphNode) => {
      client.elementIdCssProperty(graphNode.ELEMENT, 'fill', (fillColor) => {
        groupsColors.push(fillColor.value);
      });
    });
  }).perform(function () {
    const groupsCount = _.values(_.countBy(groupsColors));
    assert.equal(groupsCount.sort((a, b) => a - b), expectedGroupColors);
  });
}

describe('Pinboard Social Graph', function () {
  afterEach(function (client, done) {
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
      api.mock('GET', '/api/v2/mobile/social-graph/geographic/?pinboard_id=5cd06f2b', 200, mockData.geographicData);

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
      client.waitForElementVisible('body', TIMEOUT);
      done();
    });

    it('should render correctly', function (client) {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.element('@startDate').to.be.visible;
      pinboardPage.expect.element('@startDate').text.to.equal('1990-01-09');
      pinboardPage.expect.element('@endDate').text.to.equal('2008-01-11');
      waitForGraphAnimationEnd(client, pinboardPage);
      const graphNodes = pinboardPage.section.graphNodes;

      checkGraphGroupColors(client, graphNodes, [3, 5, 6, 6]);
      const graphLinks = pinboardPage.section.graphLinks;
      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        assert.equal(graphLinks.value.length, 37);
      });
    });

    it('should show connected nodes when double click on a node', function (client) {
      const pinboardPage = this.pinboardPage;
      waitForGraphAnimationEnd(client, pinboardPage);

      const graphNodes = pinboardPage.section.graphNodes;
      const graphLinks = pinboardPage.section.graphLinks;

      const biggestNode = pinboardPage.section.biggestGraphNode;
      client.moveToElement(biggestNode.selector);
      client.doubleClick();

      client.elements(graphNodes.locateStrategy, graphNodes.selector, function (graphNodes) {
        let hideGraphNodes = _.filter(graphNodes, graphNode => client.cssProperty(graphNode.selector, 'opacity', 0.1));
        let visibleGraphNodes = _.filter(graphNodes, graphNode => client.cssProperty(graphNode.selector, 'opacity', 1));
        assert.equal(hideGraphNodes.value.length, 9);
        assert.equal(visibleGraphNodes.value.length, 11);
      });

      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        let hideGraphLinks = _.filter(graphLinks, graphLink => client.cssProperty(graphLink.selector, 'opacity', 0.1));
        let visibleGraphLinks = _.filter(graphLinks, graphLink => client.cssProperty(graphLink.selector, 'opacity', 1));
        assert.equal(hideGraphLinks.value.length, 27);
        assert.equal(visibleGraphLinks.value.length, 10);
      });

      client.moveToElement(biggestNode.selector);
      client.doubleClick();

      client.elements(graphNodes.locateStrategy, graphNodes.selector, function (graphNodes) {
        let hideGraphNodes = _.filter(graphNodes, graphNode => client.cssProperty(graphNode.selector, 'opacity', 0.1));
        let visibleGraphNodes = _.filter(graphNodes, graphNode => client.cssProperty(graphNode.selector, 'opacity', 1));
        assert.equal(hideGraphNodes.value.length, 0);
        assert.equal(visibleGraphNodes.value.length, 20);
      });

      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        let hideGraphLinks = _.filter(graphLinks, graphLink => client.cssProperty(graphLink.selector, 'opacity', 0.1));
        let visibleGraphLinks = _.filter(graphLinks, graphLink => client.cssProperty(graphLink.selector, 'opacity', 1));
        assert.equal(hideGraphLinks.value.length, 0);
        assert.equal(visibleGraphLinks.value.length, 37);
      });
    });

    it('should pause timeline when click on toggle timeline button', function (client) {
      const pinboardPage = this.pinboardPage;
      const timeline = pinboardPage.section.timeline;
      waitForGraphAnimationEnd(client, pinboardPage);

      client.waitForAttribute('.toggle-timeline-btn', 'class', function (className) {
        return className === 'toggle-timeline-btn play-icon';
      });

      timeline.click('@toggleTimelineButton');
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

      client.waitForAttribute('.toggle-timeline-btn', 'class', function (className) {
        return className === 'toggle-timeline-btn pause-icon';
      });

      client.waitForText(pinboardPage.section.currentDate.selector, (text) => {
        return middleDays.indexOf(text) !== -1;
      });

      timeline.click('@toggleTimelineButton');
      client.waitForAttribute('.toggle-timeline-btn', 'class', function (className) {
        return className === 'toggle-timeline-btn play-icon';
      });

      timeline.click('@toggleTimelineButton');
      waitForGraphAnimationEnd(client, pinboardPage);
    });

    it('should change the graph when click on specific part of the timeline', function (client) {
      const pinboardPage = this.pinboardPage;
      waitForGraphAnimationEnd(client, pinboardPage);

      const graphNodes = pinboardPage.section.graphNodes;
      client.elements(graphNodes.locateStrategy, graphNodes.selector, function (graphNodes) {
        assert.equal(graphNodes.value.length, 20);
      });
      const graphLinks = pinboardPage.section.graphLinks;
      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        assert.equal(graphLinks.value.length, 37);
      });

      client.moveToElement(pinboardPage.section.timelineSlider.selector);
      client.mouseButtonClick(0);

      checkGraphGroupColors(client, graphNodes, [3, 3, 3, 11]);

      client.elements(graphNodes.locateStrategy, graphNodes.selector, function (graphNodes) {
        assert.equal(graphNodes.value.length, 20);
      });

      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        assert.equal(graphLinks.value.length, 14);
      });
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
      client.waitForElementVisible('body', TIMEOUT);

      client.waitForAttribute('.toggle-timeline-btn', 'class', function (className) {
        return className === 'toggle-timeline-btn pause-icon';
      });

      client.execute('scrollTo(0, 3000)');
      client.waitForAttribute('.toggle-timeline-btn', 'class', function (className) {
        return className === 'toggle-timeline-btn play-icon';
      });

      client.execute('scrollTo(0, -3000)');
      client.waitForAttribute('.toggle-timeline-btn', 'class', function (className) {
        return className === 'toggle-timeline-btn pause-icon';
      });
    });
  });
});
