'use strict';

var _ = require('lodash');
var assert = require('assert');
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');
const { getPaginationResponse } = require(__dirname + '/../utils/getPaginationResponse');

const pinboardData = {
  'id': '5cd06f2b',
  'title': 'Pinboard Title',
  'officer_ids': [1234],
  'crids': ['1234567'],
  'trr_ids': [1234],
  'description': 'Pinboard Description',
};

const pinboardCRsData = [
  {
    'crid': '1234567',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'most_common_category': 'Use Of Force',
  }
];

const pinboardOfficersData = [
  {
    'id': 1234,
    'full_name': 'Daryl Mack',
    'complaint_count': 10,
    'sustained_count': 0,
    'birth_year': 1975,
    'complaint_percentile': 99.3450,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Police Officer',
    'percentile': {
      'percentile_trr': '12.0000',
      'percentile_allegation': '99.3450',
      'percentile_allegation_civilian': '98.4344',
      'percentile_allegation_internal': '99.7840',
      'year': 2016,
      'id': 1,
    }
  }
];

const pinboardTRRsData = [
  {
    'id': 1234,
    'trr_datetime': '2012-01-01',
    'category': 'Impact Weapon',
    'point': { 'lon': 1.0, 'lat': 1.0 },
  }
];

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

const baseRelevantDocumentsUrl = '/api/v2/pinboards/5cd06f2b/relevant-documents/?';
const baseRelevantCoaccusalsUrl = '/api/v2/pinboards/5cd06f2b/relevant-coaccusals/?';
const baseRelevantComplaintsUrl = '/api/v2/pinboards/5cd06f2b/relevant-complaints/?';

const firstRelevantDocumentOfficer = {
  'id': 123,
  rank: 'Detective',
  'full_name': 'Richard Sullivan',
  'coaccusal_count': 53,
};
const generateRelevantDocumentOfficer = (index) => ({
  'id': index,
  rank: 'Officer',
  'full_name': 'Baudilio Lopez',
  'coaccusal_count': 47,
});
const firstRelevantDocument = {
  'id': 123,
  'preview_image_url': 'http://via.placeholder.com/121x157',
  'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
  'allegation': {
    'crid': '1071234',
    'category': 'Lockup Procedures',
    'incident_date': '2004-04-23',
    'officers': [firstRelevantDocumentOfficer].concat(_.times(9, generateRelevantDocumentOfficer))
  },
};
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
const firstRelevantDocumentsResponse = getPaginationResponse(
  baseRelevantDocumentsUrl,
  (number) => [firstRelevantDocument, ..._.range(1, number).map(generateRelevantDocument)],
  4, 0, 10
);
const secondRelevantDocumentsResponse = getPaginationResponse(
  baseRelevantDocumentsUrl,
  (number) => _.range(5, number + 5).map(generateRelevantDocument),
  4, 4, 10
);
const lastRelevantDocumentsResponse = getPaginationResponse(
  baseRelevantDocumentsUrl,
  (number) => _.range(9, number + 9).map(generateRelevantDocument),
  4, 8, 10
);

const firstRelevantCoaccusal = {
  'id': 123,
  'rank': 'Detective',
  'full_name': 'Richard Sullivan',
  'coaccusal_count': 53,
};
const generateRelevantCoaccusal = (id) => ({
  id,
  'rank': 'Officer',
  'full_name': 'Baudilio Lopez',
  'coaccusal_count': 47,
});
const firstRelevantCoaccusalsResponse = getPaginationResponse(
  baseRelevantCoaccusalsUrl,
  (number) => [firstRelevantCoaccusal, ..._.times(number - 1, index => generateRelevantCoaccusal(index))],
  4, 0, 10
);
const secondRelevantCoaccusalsResponse = getPaginationResponse(
  baseRelevantCoaccusalsUrl,
  (number) => _.times(number, index => generateRelevantCoaccusal(index + 20)),
  4, 4, 10
);
const lastRelevantCoaccusalsResponse = getPaginationResponse(
  baseRelevantCoaccusalsUrl,
  (number) => _.times(number, index => generateRelevantCoaccusal(index + 40)),
  4, 8, 10
);

const firstRelevantComplaint = {
  'crid': '1071234',
  'category': 'Lockup Procedures',
  'incident_date': '2004-04-23',
  'point': { lat: 50, lon: -87 },
  'officers': [
    {
      'id': 123,
      'rank': 'Sergeant',
      'full_name': 'Carl Suchocki',
      'coaccusal_count': 53,
    },
    ..._.times(8, index => ({
      'id': index,
      'rank': 'Police officer',
      'full_name': 'Queen Jones',
      'coaccusal_count': 47,
    }))
  ]
};
const generateRelevantComplaint = crid => ({
  crid,
  'category': 'Operations/Personnel Violation',
  'incident_date': '2014-05-02',
  'point': { lat: 45, lon: -87 },
  'officers': []
});
const firstRelevantComplaintsResponse = getPaginationResponse(
  baseRelevantComplaintsUrl,
  (number) => [firstRelevantComplaint, ..._.times(number - 1, index => generateRelevantComplaint(`${index}`))],
  4, 0, 10
);
const secondRelevantComplaintsResponse = getPaginationResponse(
  baseRelevantComplaintsUrl,
  (number) => _.times(number, index => generateRelevantComplaint(`${index + 20}`)),
  4, 4, 10
);
const lastRelevantComplaintsResponse = getPaginationResponse(
  baseRelevantComplaintsUrl,
  (number) => _.times(number, index => generateRelevantComplaint(`${index + 40}`)),
  4, 8, 10
);

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
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/complaints/', 200, pinboardCRsData);
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/officers/', 200, pinboardOfficersData);
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/trrs/', 200, pinboardTRRsData);
    api.mock('GET', '/api/v2/mobile/social-graph/network/?pinboard_id=5cd06f2b', 200, socialGraphData);
    api.mock('GET', '/api/v2/mobile/social-graph/geographic/?pinboard_id=5cd06f2b', 200, geographicData);

    api.mock('GET', baseRelevantDocumentsUrl, 200, firstRelevantDocumentsResponse);
    api.mock('GET', `${baseRelevantDocumentsUrl}limit=4&offset=4`, 200, secondRelevantDocumentsResponse);
    api.mock('GET', `${baseRelevantDocumentsUrl}limit=4&offset=8`, 200, lastRelevantDocumentsResponse);

    api.mock('GET', baseRelevantCoaccusalsUrl, 200, firstRelevantCoaccusalsResponse);
    api.mock('GET', `${baseRelevantCoaccusalsUrl}limit=4&offset=4`, 200, secondRelevantCoaccusalsResponse);
    api.mock('GET', `${baseRelevantCoaccusalsUrl}limit=4&offset=8`, 200, lastRelevantCoaccusalsResponse);

    api.mock('GET', baseRelevantComplaintsUrl, 200, firstRelevantComplaintsResponse);
    api.mock('GET', `${baseRelevantComplaintsUrl}limit=4&offset=4`, 200, secondRelevantComplaintsResponse);
    api.mock('GET', `${baseRelevantComplaintsUrl}limit=4&offset=8`, 200, lastRelevantComplaintsResponse);

    this.pinboardPage = client.page.pinboardPage();
    this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
    client.waitForElementVisible('body', TIMEOUT);
    done();
  });

  afterEach(function (client, done) {
    api.cleanMock();
    done();
  });

  it('should go to search page when search bar is clicked', function (client) {
    this.pinboardPage.click('@searchBar');
    client.useXpath();
    client.waitForElementVisible('//div[starts-with(@class, "search-page")]', TIMEOUT);
    client.useCss();
    client.assert.urlContains('/search/');
  });

  context('pinboard pinned section', function () {
    it('should render the pinned cards correctly', function (client) {
      const pinboardPage = this.pinboardPage;
      const pinnedSection = pinboardPage.section.pinnedSection;

      const officers = pinnedSection.section.officers;
      let firstCard = officers.section.firstCard;
      officers.expect.element('@title').text.to.equal('OFFICERS');
      firstCard.expect.element('@firstCardRank').text.to.equal('Police Officer');
      firstCard.expect.element('@firstCardName').text.to.equal('Daryl Mack');
      firstCard.expect.element('@firstCardCRsCount').text.to.equal('10 complaints');

      const crs = pinnedSection.section.crs;
      firstCard = crs.section.firstCard;
      crs.expect.element('@title').text.to.equal('COMPLAINTS');
      firstCard.expect.element('@firstCardDate').text.to.equal('2010-01-01');
      firstCard.expect.element('@firstCardCategory').text.to.equal('Use Of Force');

      const trrs = pinnedSection.section.trrs;
      firstCard = trrs.section.firstCard;
      trrs.expect.element('@title').text.to.equal('TACTICAL RESPONSE REPORTS');
      firstCard.expect.element('@firstCardDate').text.to.equal('2012-01-01');
      firstCard.expect.element('@firstCardCategory').text.to.equal('Impact Weapon');
    });

    it('should show undo card when click on unpin button', function () {
      const pinboardPage = this.pinboardPage;
      const pinnedSection = pinboardPage.section.pinnedSection;

      const officers = pinnedSection.section.officers;
      let firstCard = officers.section.firstCard;

      firstCard.click('@firstCardUnpinBtn');

      firstCard.expect.element('@undoCard').to.be.visible;
    });
  });

  context('pinboard section', function (client) {
    it('should render correctly', function (client) {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.element('@pinboardTitle').to.be.visible;
      pinboardPage.expect.element('@pinboardDescription').to.be.visible;
      pinboardPage.expect.element('@pinboardTitle').text.to.equal('Pinboard Title');
      pinboardPage.expect.element('@pinboardDescription').text.to.equal('Pinboard Description');

      pinboardPage.expect.section('@pinboardPaneMenu').to.be.visible;
      pinboardPage.expect.section('@pinboardPaneMenu').text.to.contain('Network');
      pinboardPage.expect.section('@pinboardPaneMenu').text.to.contain('Geographic');
    });
  });

  context('relevant documents section', function () {
    it('should render document cards', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.expect.element('@title').text.to.equal('DOCUMENTS');
      relevantDocumentsSection.expect.element('@carouselTip').text.to.equal('<< Swipe for more');

      const documentCard = relevantDocumentsSection.section.documentCard;
      client.assertCount(`${relevantDocumentsSection.selector} ${documentCard.selector}`, 4);

      const firstDocumentCard = relevantDocumentsSection.section.documentCard;
      firstDocumentCard.expect.element('@plusButton').to.be.present;
      firstDocumentCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
      firstDocumentCard.expect.element('@category').text.to.equal('Lockup Procedures');
      firstDocumentCard.expect.element('@firstTopOfficerName').text.to.equal('R. Sullivan');
      firstDocumentCard.expect.element('@secondTopOfficerName').text.to.equal('B. Lopez');
      firstDocumentCard.expect.element('@notShowingOfficerCount').text.to.equal('3+');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      const documentCard = relevantDocumentsSection.section.documentCard;
      const cardSelector = `${relevantDocumentsSection.selector} ${documentCard.selector}`;
      client.assertCount(cardSelector, 4);

      const nthCardSelector = n => relevantDocumentsSection.selector +
        ` .swiper-slide:nth-child(${n}) > div:first-child`;

      _.times(3, idx => client.dragAndDrop(nthCardSelector(idx + 2), -200, 0));
      client.assertCount(cardSelector, 8);

      _.times(4, idx => client.dragAndDrop(nthCardSelector(idx + 5), -200, 0));
      client.assertCount(cardSelector, 10);
    });

    it('should go to complaint page when clicking on category', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@category');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on incidentDate', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@incidentDate');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on topOfficers', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@topOfficers');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on remainingOfficers', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@remainingOfficers');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to document pdf link in new tab when clicking on left half of a complaint card', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@leftHalf');
      client.switchToRecentTab();
      client.assert.urlEquals(
        'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf'
      );
    });
  });

  context('relevant complaints section', function () {
    it('should render complaint cards', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.expect.element('@title').text.to.equal('COMPLAINTS');
      relevantComplaintsSection.expect.element('@carouselTip').text.to.equal('<< Swipe for more');

      const complaintCard = relevantComplaintsSection.section.complaintCard;
      client.assertCount(`${relevantComplaintsSection.selector} ${complaintCard.selector}`, 4);

      const firstComplaintCard = relevantComplaintsSection.section.complaintCard;
      firstComplaintCard.expect.element('@plusButton').to.be.present;
      firstComplaintCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
      firstComplaintCard.expect.element('@category').text.to.equal('Lockup Procedures');
      firstComplaintCard.expect.element('@firstTopOfficerName').text.to.equal('C. Suchocki');
      firstComplaintCard.expect.element('@secondTopOfficerName').text.to.equal('Q. Jones');
      firstComplaintCard.expect.element('@notShowingOfficerCount').text.to.equal('2+');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      const complaintCard = relevantComplaintsSection.section.complaintCard;
      const cardSelector = `${relevantComplaintsSection.selector} ${complaintCard.selector}`;
      client.pause(200);
      client.assertCount(cardSelector, 4);

      const nthCardSelector = n => relevantComplaintsSection.selector +
        ` .swiper-slide:nth-child(${n}) > div:first-child`;

      _.times(3, idx => client.dragAndDrop(nthCardSelector(idx + 2), -200, 0));
      client.assertCount(cardSelector, 8);

      _.times(4, idx => client.dragAndDrop(nthCardSelector(idx + 5), -200, 0));
      client.assertCount(cardSelector, 10);
    });

    it('should go to complaint page when clicking on category', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@category');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on incidentDate', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@incidentDate');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on topOfficers', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@topOfficers');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on remainingOfficers', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@remainingOfficers');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on left half of a complaint card', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@leftHalf');
      client.assert.urlContains('/complaint/1071234/');
    });
  });

  context('relevant coaccusals section', function () {
    it('should render coaccusal cards', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      relevantCoaccusalsSection.expect.element('@title').text.to.equal('COACCUSALS');
      relevantCoaccusalsSection.expect.element('@carouselTip').text.to.equal('<< Swipe for more');

      const coaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;
      const cardSelector = `${relevantCoaccusalsSection.selector} ${coaccusalCard.selector}`;
      client.assertCount(cardSelector, 4);

      const firstCoaccusalCard = coaccusalCard;
      firstCoaccusalCard.expect.element('@plusButton').to.be.present;
      firstCoaccusalCard.expect.element('@radarChart').to.be.present;
      firstCoaccusalCard.expect.element('@officerRank').text.to.equal('Detective');
      firstCoaccusalCard.expect.element('@officerName').text.to.equal('Richard Sullivan');
      firstCoaccusalCard.expect.element('@coaccusalCount').text.to.equal('53 coaccusals');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      const coaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;
      const cardSelector = `${relevantCoaccusalsSection.selector} ${coaccusalCard.selector}`;
      client.assertCount(cardSelector, 4);

      const nthCardSelector = n => relevantCoaccusalsSection.selector +
        ` .swiper-slide:nth-child(${n}) > a:first-child`;

      _.times(3, idx => client.dragAndDrop(nthCardSelector(idx + 2), -100, 0));
      client.assertCount(cardSelector, 8);

      _.times(4, idx => client.dragAndDrop(nthCardSelector(idx + 5), -100, 0));
      client.assertCount(cardSelector, 10);
    });

    it('should go to officer page when clicking on a nameWrapper', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      relevantCoaccusalsSection.section.coaccusalCard.click('@nameWrapper');
      client.assert.urlContains('/officer/123/richard-sullivan/');
    });

    it('should go to officer page when clicking on a coaccusalCount', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      relevantCoaccusalsSection.section.coaccusalCard.click('@coaccusalCount');
      client.assert.urlContains('/officer/123/richard-sullivan/');
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
