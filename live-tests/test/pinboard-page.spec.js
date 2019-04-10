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

const geographicData = [
  {
    'date': '2008-05-27',
    'crid': '1016899',
    'category': 'Illegal Search',
    'coaccused_count': 13,
    'kind': 'CR',
    'victims': [
      {
        'gender': 'Female',
        'race': 'Black'
      },
      {
        'gender': 'Female',
        'race': 'Black'
      }
    ]
  },
  {
    'date': '1981-05-31',
    'crid': 'C147074',
    'category': 'Use Of Force',
    'coaccused_count': 3,
    'kind': 'CR',
    'point': {
      'lon': -87.6183565,
      'lat': 41.8095411
    },
    'victims': []
  },
  {
    'date': '1981-05-31',
    'crid': 'C147074',
    'category': 'Use Of Force',
    'coaccused_count': 3,
    'kind': 'CR',
    'point': {
      'lon': -87.6183565,
      'lat': 41.8095411
    },
    'victims': []
  },
  {
    'date': '1986-02-15',
    'crid': 'C150021',
    'category': 'Drug / Alcohol Abuse',
    'coaccused_count': 1,
    'kind': 'CR',
    'point': {
      'lon': -87.6276846,
      'lat': 41.8683196
    },
    'victims': []
  },
  {
    'date': '1987-05-21',
    'crid': 'C156113',
    'category': 'False Arrest',
    'coaccused_count': 4,
    'kind': 'CR',
    'point': {
      'lon': -87.705456,
      'lat': 41.873988
    },
    'victims': []
  },
  {
    'trr_id': 2188,
    'date': '2004-07-03',
    'kind': 'FORCE',
    'taser': false,
    'firearm_used': false,
    'point': {
      'lon': -87.613242,
      'lat': 41.6445969
    }
  },
  {
    'trr_id': 6238,
    'date': '2005-01-21',
    'kind': 'FORCE',
    'taser': false,
    'firearm_used': false,
    'point': {
      'lon': -87.6013364,
      'lat': 41.6936152
    }
  },
];

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
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/geographic-data/', 200, geographicData);

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

      pinboardPage.expect.section('@pinboardPaneMenu').to.be.visible;
      pinboardPage.expect.section('@pinboardPaneMenu').text.to.contain('NETWORK');
      pinboardPage.expect.section('@pinboardPaneMenu').text.to.contain('GEOGRAPHIC');
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
      pinboardPage.waitForElementVisible('@startDate', TIMEOUT);

      client.waitForText(pinboardPage.section.currentDate.selector, (text) => {
        return text === '1994-01-10';
      }, 2000, 'expected timeline reaches specific date after 0.9s');

      pinboardPage.section.timeline.click('@toggleTimelineButton');

      const graphNodes = pinboardPage.section.graphNodes;
      client.elements(graphNodes.locateStrategy, graphNodes.selector, function (graphNodes) {
        assert.equal(graphNodes.value.length, 20);
      });
      const graphLinks = pinboardPage.section.graphLinks;
      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        assert.equal(graphLinks.value.length, 10);
      });

      pinboardPage.section.timeline.click('@toggleTimelineButton');
      client.waitForText(pinboardPage.section.currentDate.selector, (text) => {return text === '2008-01-11';}, 15000);
      client.elements(graphNodes.locateStrategy, graphNodes.selector, function (graphNodes) {
        assert.equal(graphNodes.value.length, 20);
      });
      client.elements(graphLinks.locateStrategy, graphLinks.selector, function (graphLinks) {
        assert.equal(graphLinks.value.length, 37);
      });
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

  context('Geographic section', function () {
    it('should render geographic section', function () {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.section('@pinboardPaneMenu').to.be.visible;
      pinboardPage.section.pinboardPaneMenu.click('@geographicPaneName');

      pinboardPage.expect.element('@complaintText').text.to.equal('Complaint');
      pinboardPage.expect.element('@complaintNumber').text.to.equal('5');
      pinboardPage.expect.element('@trrText').text.to.equal('Use of Force Report');
      pinboardPage.expect.element('@trrNumber').text.to.equal('2');
    });
  });
});
