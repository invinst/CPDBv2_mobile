'use strict';

var _ = require('lodash');
var assert = require('assert');
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');

const pinboardData = {
  'id': '5cd06f2b',
  'title': 'Pinboard Title',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': 'Pinboard Description',
};

const socialGraphData = {
  'officers': [
    { 'full_name': 'Glenn Evans', id: 8138 },
    { 'full_name': 'Isaac Lee', id: 15956 },
    { 'full_name': 'Thomas Kampenga', id: 14045 },
    { 'full_name': 'Melvin Ector', id: 31945 },
    { 'full_name': 'Sean Brandon', id: 2671 },
    { 'full_name': 'Estella Perez-Stanford', id: 22297 },
    { 'full_name': 'Johnny Cavers', id: 4269 },
    { 'full_name': 'Gilbert Cobb', id: 4881 },
    { 'full_name': 'John Hart', id: 11580 },
    { 'full_name': 'William Roberison', id: 24157 },
    { 'full_name': 'Francis Higgins', id: 12176 },
    { 'full_name': 'David Portis', id: 22861 },
    { 'full_name': 'Eugene Offett', id: 21194 },
    { 'full_name': 'Joseph Blaye', id: 2171 },
    { 'full_name': 'Charles Toussas', id: 28805 },
    { 'full_name': 'Bennie Watson', id: 30209 },
    { 'full_name': 'Tracy Hughes', id: 12737 },
    { 'full_name': 'Donnell Calhoun', id: 3663 },
    { 'full_name': 'Hardy White', id: 30466 },
    { 'full_name': 'Matthew Brandon', id: 2675 }
  ],
  'coaccused_data': [
    { 'officer_id_1': 2675, 'officer_id_2': 24157, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 22861, 'officer_id_2': 30466, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 22861, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 7 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 5 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 5 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 6 },
    { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 6 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 5 },
    { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 7 },
    { 'officer_id_1': 4269, 'officer_id_2': 30209, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 6 },
    { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 30209, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 30466, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 30209, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 30209, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 6 },
    { 'officer_id_1': 12176, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 8 },
    { 'officer_id_1': 14045, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 8 },
    { 'officer_id_1': 3663, 'officer_id_2': 8138, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 8138, 'officer_id_2': 30466, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 12176, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 4881, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 4881, 'officer_id_2': 14045, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 5 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 4881, 'officer_id_2': 21194, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 4881, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 4269, 'officer_id_2': 4881, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 21194, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 4269, 'officer_id_2': 21194, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 6 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 4 },
    { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
    { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 7 },
    { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 3 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 6 }
  ],
  'list_event': [
    '1990-01-09 00:00:00+00:00',
    '1992-03-08 00:00:00+00:00',
    '1994-01-10 00:00:00+00:00',
    '1994-03-07 00:00:00+00:00',
    '1994-03-12 00:00:00+00:00',
    '1994-04-17 00:00:00+00:00',
    '1998-11-17 00:00:00+00:00',
    '1999-02-08 00:00:00+00:00',
    '1999-07-22 00:00:00+00:00',
    '2006-03-15 00:00:00+00:00',
    '2008-01-11 00:00:00+00:00'
  ],
};

function waitForGraphAnimationEnd(client, pinboardPage) {
  pinboardPage.expect.section('@currentDate').to.be.visible;
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

describe('Pinboard Page', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/', 200, pinboardData);
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/social-graph/', 200, socialGraphData);

    this.pinboardPage = client.page.pinboardPage();
    this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
    client.waitForElementVisible('body', TIMEOUT);
    done();
  });

  afterEach(function (client, done) {
    done();
  });

  context('pinboard section', function () {
    it('should render correctly', function () {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.element('@pinboardTitle').to.be.visible;
      pinboardPage.expect.element('@pinboardDescription').to.be.visible;
      pinboardPage.expect.element('@pinboardTitle').text.to.equal('Pinboard Title');
      pinboardPage.expect.element('@pinboardDescription').text.to.equal('Pinboard Description');
    });
  });

  context('animatedSocialgraph section', function () {
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

    it('should be able to search', function (client) {
      const pinboardPage = this.pinboardPage;
      const searchInput = pinboardPage.section.searchInput;
      pinboardPage.expect.section('@searchInput').to.be.visible;
      client.setValue(searchInput.selector, 'Tho');
      pinboardPage.expect.section('@firstSearchResultSuggestion').to.be.visible;
      client.click(pinboardPage.section.firstSearchResultSuggestion.selector);
      client.getValue(searchInput.selector, function (result) {
        assert.equal(result.value, 'Thomas Kampenga');
      });
    });
  });
});
