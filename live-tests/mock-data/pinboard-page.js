'use strict';

var _ = require('lodash');
const { getPaginationResponse } = require(__dirname + '/../utils/getPaginationResponse');


const officer123 = {
  'officer_id': 123,
  'full_name': 'Richard Sullivan',
  active: true,
  'allegation_count': 104,
  badge: '8548',
  'historic_badges': ['8547', '8546'],
  'birth_year': 1957,
  'civilian_compliment_count': 4,
  'complaint_percentile': 99.895,
  'date_of_appt': '1993-12-13',
  'date_of_resignation': '2017-01-15',
  'discipline_count': 1,
  gender: 'Male',
  'honorable_mention_count': 55,
  'honorable_mention_percentile': 85.87,
  'major_award_count': 1,
  race: 'White',
  rank: 'Police Officer',
  'sustained_count': 1,
  'trr_count': 1,
  unit: {
    'unit_id': 6,
    description: 'District 005',
    'unit_name': '005',
  },
  percentiles: [
    {
      'officer_id': 123,
      year: 2005,
      'percentile_allegation_civilian': '66.251',
      'percentile_allegation_internal': '0.023',
      'percentile_allegation': '41.001',
    },
    {
      'officer_id': 123,
      year: 2006,
      'percentile_allegation_civilian': '66.251',
      'percentile_allegation_internal': '0.023',
      'percentile_trr': '44.7',
      'percentile_allegation': '41.001',
    },
    {
      'officer_id': 123,
      year: 2007,
      'percentile_allegation_civilian': '0.022',
      'percentile_allegation_internal': '75.065',
      'percentile_trr': '0.046',
      'percentile_allegation': '31.201',
    },
  ],
};

const pinboardData = {
  'id': '5cd06f2b',
  'title': 'Pinboard Title',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Pinboard Description',
};

const pinboardCRsData = [
  {
    'crid': '1234567',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'most_common_category': 'Use Of Force',
  },
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
    },
  },
];

const pinboardTRRsData = [
  {
    'id': 1234,
    'trr_datetime': '2012-01-01',
    'category': 'Impact Weapon',
    'point': { 'lon': 1.0, 'lat': 1.0 },
  },
];

const socialGraphData = {
  'officers': [
    {
      'full_name': 'Glenn Evans',
      id: 8138,
      'percentile': {
        'percentile_allegation_civilian': '4.4000',
        'percentile_allegation_internal': '5.5000',
        'percentile_trr': '6.6000',
      },
    },
    {
      'full_name': 'Isaac Lee',
      id: 15956,
      'percentile': {
        'percentile_allegation_civilian': '7.7000',
        'percentile_allegation_internal': '8.8000',
        'percentile_trr': '9.9000',
      },
    },
    {
      'full_name': 'Thomas Kampenga',
      id: 14045,
      'percentile': {
        'percentile_allegation_civilian': '10.10000',
        'percentile_allegation_internal': '11.1100',
        'percentile_trr': '12.1200',
      },
    },
    {
      'full_name': 'Melvin Ector',
      id: 31945,
      'percentile': {
        'percentile_allegation_civilian': '13.1300',
        'percentile_allegation_internal': '14.1400',
        'percentile_trr': '15.1500',
      },
    },
    {
      'full_name': 'Sean Brandon',
      id: 2671,
      'percentile': {
        'percentile_allegation_civilian': '16.1600',
        'percentile_allegation_internal': '17.1700',
        'percentile_trr': '18.1800',
      },
    },
    {
      'full_name': 'Estella Perez-Stanford',
      id: 22297,
      'percentile': {
        'percentile_allegation_civilian': '19.1900',
        'percentile_allegation_internal': '20.2000',
        'percentile_trr': '21.2100',
      },
    },
    {
      'full_name': 'Johnny Cavers',
      id: 4269,
      'percentile': {
        'percentile_allegation_civilian': '22.2200',
        'percentile_allegation_internal': '23.2300',
        'percentile_trr': '24.2400',
      },
    },
    {
      'full_name': 'Gilbert Cobb',
      id: 4881,
      'percentile': {
        'percentile_allegation_civilian': '25.2500',
        'percentile_allegation_internal': '26.2600',
        'percentile_trr': '27.2700',
      },
    },
    {
      'full_name': 'John Hart',
      id: 11580,
      'percentile': {
        'percentile_allegation_civilian': '28.2800',
        'percentile_allegation_internal': '29.2900',
        'percentile_trr': '30.3000',
      },
    },
    {
      'full_name': 'William Roberison',
      id: 24157,
      'percentile': {
        'percentile_allegation_civilian': '31.3100',
        'percentile_allegation_internal': '32.3200',
        'percentile_trr': '33.3300',
      },
    },
    {
      'full_name': 'Francis Higgins',
      id: 12176,
      'percentile': {
        'percentile_allegation_civilian': '34.3400',
        'percentile_allegation_internal': '35.3500',
        'percentile_trr': '36.3600',
      },
    },
    {
      'full_name': 'David Portis',
      id: 22861,
      'percentile': {
        'percentile_allegation_civilian': '37.3700',
        'percentile_allegation_internal': '38.3800',
        'percentile_trr': '39.3900',
      },
    },
    {
      'full_name': 'Eugene Offett',
      id: 21194,
      'percentile': {
        'percentile_allegation_civilian': '40.4000',
        'percentile_allegation_internal': '41.4100',
        'percentile_trr': '42.4200',
      },
    },
    {
      'full_name': 'Joseph Blaye',
      id: 2171,
      'percentile': {
        'percentile_allegation_civilian': '43.4300',
        'percentile_allegation_internal': '44.4400',
        'percentile_trr': '45.4500',
      },
    },
    {
      'full_name': 'Charles Toussas',
      id: 28805,
      'percentile': {
        'percentile_allegation_civilian': '46.4600',
        'percentile_allegation_internal': '47.4700',
        'percentile_trr': '48.4800',
      },
    },
    {
      'full_name': 'Bennie Watson',
      id: 30209,
      'percentile': {
        'percentile_allegation_civilian': '49.4900',
        'percentile_allegation_internal': '50.5000',
        'percentile_trr': '51.5100',
      },
    },
    {
      'full_name': 'Tracy Hughes',
      id: 12737,
      'percentile': {
        'percentile_allegation_civilian': '52.5200',
        'percentile_allegation_internal': '53.5300',
        'percentile_trr': '54.5400',
      },
    },
    {
      'full_name': 'Donnell Calhoun',
      id: 3663,
      'percentile': {
        'percentile_allegation_civilian': '55.5500',
        'percentile_allegation_internal': '56.5600',
        'percentile_trr': '57.5700',
      },
    },
    {
      'full_name': 'Hardy White',
      id: 30466,
      'percentile': {
        'percentile_allegation_civilian': '58.5800',
        'percentile_allegation_internal': '59.5900',
        'percentile_trr': '60.6000',
      },
    },
    {
      'full_name': 'Matthew Brandon',
      id: 2675,
      'percentile': {
        'percentile_allegation_civilian': '61.6100',
        'percentile_allegation_internal': '62.6200',
        'percentile_trr': '63.6300',
      },
    },
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
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 6 },
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
    '2008-01-11 00:00:00+00:00',
  ],
};

const socialGraphBigData = {
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
    { 'full_name': 'Matthew Brandon', id: 2675 },
  ],
  'coaccused_data': [
    { 'officer_id_1': 2675, 'officer_id_2': 24157, 'incident_date': '1990-01-09', 'accussed_count': 2 },
    { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1991-02-20', 'accussed_count': 2 },
    { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1991-07-06', 'accussed_count': 3 },
    { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1991-08-07', 'accussed_count': 4 },
    { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1992-03-08', 'accussed_count': 5 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1992-07-18', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1993-03-28', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1993-04-03', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 22861, 'incident_date': '1993-06-01', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1993-06-03', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1993-06-09', 'accussed_count': 3 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1993-07-13', 'accussed_count': 3 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1993-10-16', 'accussed_count': 4 },
    { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1994-01-31', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-01-31', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1994-01-31', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-01-31', 'accussed_count': 4 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-01-31', 'accussed_count': 5 },
    { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1994-02-15', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-02-26', 'accussed_count': 5 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-03-06', 'accussed_count': 6 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-07', 'accussed_count': 6 },
    { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-03-07', 'accussed_count': 2 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-03-07', 'accussed_count': 7 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-03-12', 'accussed_count': 8 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12', 'accussed_count': 7 },
    { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-03-12', 'accussed_count': 3 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-04-17', 'accussed_count': 9 },
    { 'officer_id_1': 4881, 'officer_id_2': 14045, 'incident_date': '1994-05-24', 'accussed_count': 2 },
    { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1994-05-24', 'accussed_count': 3 },
    { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-05-24', 'accussed_count': 10 },
    { 'officer_id_1': 14045, 'officer_id_2': 21194, 'incident_date': '1994-05-24', 'accussed_count': 2 },
    { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-05-24', 'accussed_count': 8 },
    { 'officer_id_1': 3663, 'officer_id_2': 4881, 'incident_date': '1994-05-24', 'accussed_count': 2 },
    { 'officer_id_1': 12176, 'officer_id_2': 21194, 'incident_date': '1994-05-24', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 12176, 'incident_date': '1994-05-24', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1994-05-24', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-05-24', 'accussed_count': 5 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1994-05-24', 'accussed_count': 3 },
    { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-05-24', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1994-06-21', 'accussed_count': 4 },
    { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1994-06-21', 'accussed_count': 4 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-06-21', 'accussed_count': 6 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-08-17', 'accussed_count': 7 },
    { 'officer_id_1': 4269, 'officer_id_2': 30209, 'incident_date': '1995-02-28', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1995-05-21', 'accussed_count': 8 },
    { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1995-07-28', 'accussed_count': 9 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1996-01-20', 'accussed_count': 5 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1996-04-20', 'accussed_count': 6 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1996-05-28', 'accussed_count': 7 },
    { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1996-07-27', 'accussed_count': 8 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1996-12-27', 'accussed_count': 2 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1996-12-30', 'accussed_count': 3 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1997-06-20', 'accussed_count': 4 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1997-07-11', 'accussed_count': 5 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1997-08-23', 'accussed_count': 6 },
    { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1998-06-27', 'accussed_count': 7 },
    { 'officer_id_1': 3663, 'officer_id_2': 8138, 'incident_date': '1998-06-27', 'accussed_count': 2 },
    { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '1998-09-22', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1998-11-09', 'accussed_count': 2 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1998-11-17', 'accussed_count': 2 },
    { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1998-11-28', 'accussed_count': 2 },
    { 'officer_id_1': 30209, 'officer_id_2': 31945, 'incident_date': '1998-12-03', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1998-12-03', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 30209, 'incident_date': '1998-12-03', 'accussed_count': 2 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-02-08', 'accussed_count': 3 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-03-30', 'accussed_count': 4 },
    { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '1999-07-22', 'accussed_count': 3 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-07-22', 'accussed_count': 5 },
    { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1999-07-22', 'accussed_count': 3 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-11-16', 'accussed_count': 6 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-12-15', 'accussed_count': 7 },
    { 'officer_id_1': 4881, 'officer_id_2': 21194, 'incident_date': '2000-04-20', 'accussed_count': 2 },
    { 'officer_id_1': 4269, 'officer_id_2': 21194, 'incident_date': '2000-04-28', 'accussed_count': 2 },
    { 'officer_id_1': 4269, 'officer_id_2': 4881, 'incident_date': '2000-04-28', 'accussed_count': 2 },
    { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '2000-04-28', 'accussed_count': 2 },
    { 'officer_id_1': 21194, 'officer_id_2': 31945, 'incident_date': '2000-04-28', 'accussed_count': 2 },
    { 'officer_id_1': 4881, 'officer_id_2': 31945, 'incident_date': '2000-04-28', 'accussed_count': 2 },
    { 'officer_id_1': 4881, 'officer_id_2': 21194, 'incident_date': '2000-04-28', 'accussed_count': 3 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2000-05-20', 'accussed_count': 9 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2000-05-20', 'accussed_count': 8 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2000-09-21', 'accussed_count': 10 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2001-01-15', 'accussed_count': 11 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2001-02-22', 'accussed_count': 12 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2001-07-09', 'accussed_count': 13 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2001-10-02', 'accussed_count': 14 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2001-10-19', 'accussed_count': 15 },
    { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '2002-04-01', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '2002-09-28', 'accussed_count': 4 },
    { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '2002-09-28', 'accussed_count': 4 },
    { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '2002-10-13', 'accussed_count': 5 },
    { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '2002-10-13', 'accussed_count': 5 },
    { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '2002-10-13', 'accussed_count': 2 },
    { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '2003-10-25', 'accussed_count': 3 },
    { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '2003-10-25', 'accussed_count': 4 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2006-03-15', 'accussed_count': 16 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2006-09-11', 'accussed_count': 17 },
    { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2008-01-11', 'accussed_count': 18 },
  ],
  'list_event': [
    '1990-01-09',
    '1991-02-20',
    '1991-07-06',
    '1991-08-07',
    '1992-03-08',
    '1992-07-18',
    '1993-03-28',
    '1993-04-03',
    '1993-06-01',
    '1993-06-03',
    '1993-06-09',
    '1993-07-13',
    '1993-10-16',
    '1994-01-31',
    '1994-02-15',
    '1994-02-26',
    '1994-03-06',
    '1994-03-07',
    '1994-03-12',
    '1994-04-17',
    '1994-05-24',
    '1994-06-21',
    '1994-08-17',
    '1995-02-28',
    '1995-05-21',
    '1995-07-28',
    '1996-01-20',
    '1996-04-20',
    '1996-05-28',
    '1996-07-27',
    '1996-12-27',
    '1996-12-30',
    '1997-06-20',
    '1997-07-11',
    '1997-08-23',
    '1998-06-27',
    '1998-09-22',
    '1998-11-09',
    '1998-11-17',
    '1998-11-28',
    '1998-12-03',
    '1999-02-08',
    '1999-03-30',
    '1999-07-22',
    '1999-11-16',
    '1999-12-15',
    '2000-04-20',
    '2000-04-28',
    '2000-05-20',
    '2000-09-21',
    '2001-01-15',
    '2001-02-22',
    '2001-07-09',
    '2001-10-02',
    '2001-10-19',
    '2002-04-01',
    '2002-09-28',
    '2002-10-13',
    '2003-10-25',
    '2006-03-15',
    '2006-09-11',
    '2008-01-11',
  ],
};

const geographicCrsData = {
  count: 5,
  limit: 200,
  results: [
    {
      'date': '2008-05-27',
      'crid': '1016899',
      'category': 'Illegal Search',
      'coaccused_count': 13,
      'kind': 'CR',
      'victims': [
        {
          'gender': 'Female',
          'race': 'Black',
        },
        {
          'gender': 'Female',
          'race': 'Black',
        },
      ],
    },
    {
      'date': '1981-05-31',
      'crid': 'C147074',
      'category': 'Use Of Force',
      'coaccused_count': 3,
      'kind': 'CR',
      'point': {
        'lon': -87.6183565,
        'lat': 41.8095411,
      },
      'victims': [],
    },
    {
      'date': '1981-05-31',
      'crid': 'C147074',
      'category': 'Use Of Force',
      'coaccused_count': 3,
      'kind': 'CR',
      'point': {
        'lon': -87.6183565,
        'lat': 41.8095411,
      },
      'victims': [],
    },
    {
      'date': '1986-02-15',
      'crid': 'C150021',
      'category': 'Drug / Alcohol Abuse',
      'coaccused_count': 1,
      'kind': 'CR',
      'point': {
        'lon': -87.6276846,
        'lat': 41.8683196,
      },
      'victims': [],
    },
    {
      'date': '1987-05-21',
      'crid': 'C156113',
      'category': 'False Arrest',
      'coaccused_count': 4,
      'kind': 'CR',
      'point': {
        'lon': -87.705456,
        'lat': 41.873988,
      },
      'victims': [],
    },
  ],
};

const geographicTrrsData = {
  count: 2,
  limit: 200,
  results: [
    {
      'trr_id': 2188,
      'date': '2004-07-03',
      'kind': 'FORCE',
      'taser': false,
      'firearm_used': false,
      'point': {
        'lon': -87.613242,
        'lat': 41.6445969,
      },
    },
    {
      'trr_id': 6238,
      'date': '2005-01-21',
      'kind': 'FORCE',
      'taser': false,
      'firearm_used': false,
      'point': {
        'lon': -87.6013364,
        'lat': 41.6936152,
      },
    },
  ],
};

const updatePinboardTitleParams = {
  'title': 'Updated Title',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Pinboard Description',
};

const updatedPinboardTitle = {
  'id': '5cd06f2b',
  'title': 'Updated Title',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Pinboard Description',
};

const updatePinboardDescriptionParams = {
  'title': 'Updated Title',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Updated Description',
};

const updatedPinboardDescription = {
  'id': '5cd06f2b',
  'title': 'Updated Title',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Updated Description',
};

const baseRelevantDocumentsUrl = '/api/v2/mobile/pinboards/5cd06f2b/relevant-documents/?';
const baseRelevantCoaccusalsUrl = '/api/v2/mobile/pinboards/5cd06f2b/relevant-coaccusals/?';
const baseRelevantComplaintsUrl = '/api/v2/mobile/pinboards/5cd06f2b/relevant-complaints/?';

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
    'officers': [firstRelevantDocumentOfficer].concat(_.times(9, generateRelevantDocumentOfficer)),
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
    'officers': [],
  },
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
    })),
  ],
};
const generateRelevantComplaint = crid => ({
  crid,
  'category': 'Operations/Personnel Violation',
  'incident_date': '2014-05-02',
  'point': { lat: 45, lon: -87 },
  'officers': [],
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

const mockCMSPinboardPage = {
  fields: [{
    name: 'empty_pinboard_title',
    type: 'rich_text',
    value: {
      blocks: [
        {
          key: '73964',
          data: {},
          text: 'Get started',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
  }, {
    name: 'empty_pinboard_description',
    type: 'rich_text',
    value: {
      blocks: [
        {
          key: '62c51',
          data: {},
          text: 'Use search to find officers and individual complaint records and press the plus button ' +
            'to add cards to your pinboard.',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        }, {
          key: '6qsci',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        }, {
          key: '41tdu',
          data: {},
          text: 'Come back to the pinboard to give it a title and see a network map or discover relevant documents.',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
  }],
};

const createPinboardffff6666Params = {
  'officer_ids': [1, 2],
  'crids': ['5678123'],
  'trr_ids': [3, 2],
};

const createPinboardffff6666Data = {
  'id': 'ffff6666',
  'title': '',
  'description': '',
  'officer_ids': [1, 2],
  'crids': ['5678123'],
  'trr_ids': [3, 2],
};

const pinboardffff6666CRsData = [
  {
    'crid': '5678123',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'most_common_category': 'Use Of Force',
  },
];

const pinboardffff6666OfficersData = [
  {
    'id': 1,
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
    },
  },
  {
    'id': 2,
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
    },
  },
];

const pinboardffff6666TRRsData = [
  {
    'id': 3,
    'trr_datetime': '2012-01-01',
    'category': 'Impact Weapon',
    'point': { 'lon': 1.0, 'lat': 1.0 },
  },
  {
    'id': 2,
    'trr_datetime': '2012-01-01',
    'category': 'Impact Weapon',
    'point': { 'lon': 1.0, 'lat': 1.0 },
  },
];

const createPinboardeeee7777Params = {
  'officer_ids': [1, 2],
  'crids': ['987654', '5678123'],
  'trr_ids': [9, 7],
};

const createPinboardeeee7777Data = {
  'id': 'eeee7777',
  'title': '',
  'description': '',
  'officer_ids': [1, 2],
  'crids': ['5678123'],
  'trr_ids': [],
  'not_found_items': {
    'crids': ['987654'],
    'trr_ids': [9, 7],
  },
};

const pinboardeeee7777CRsData = pinboardffff6666CRsData;
const pinboardeeee7777OfficersData = pinboardffff6666OfficersData;
const pinboardeeee7777TRRsData = [];

module.exports = {
  pinboardData,
  pinboardCRsData,
  pinboardOfficersData,
  pinboardTRRsData,
  socialGraphData,
  socialGraphBigData,
  geographicCrsData,
  geographicTrrsData,
  baseRelevantDocumentsUrl,
  baseRelevantCoaccusalsUrl,
  baseRelevantComplaintsUrl,
  firstRelevantDocumentOfficer,
  firstRelevantDocument,
  firstRelevantDocumentsResponse,
  secondRelevantDocumentsResponse,
  lastRelevantDocumentsResponse,
  firstRelevantCoaccusal,
  firstRelevantCoaccusalsResponse,
  secondRelevantCoaccusalsResponse,
  lastRelevantCoaccusalsResponse,
  firstRelevantComplaint,
  firstRelevantComplaintsResponse,
  secondRelevantComplaintsResponse,
  lastRelevantComplaintsResponse,
  updatePinboardTitleParams,
  updatedPinboardTitle,
  updatePinboardDescriptionParams,
  updatedPinboardDescription,
  officer123,
  generateRelevantDocument,
  generateRelevantCoaccusal,
  generateRelevantComplaint,
  mockCMSPinboardPage,
  createPinboardffff6666Params,
  createPinboardffff6666Data,
  pinboardffff6666CRsData,
  pinboardffff6666OfficersData,
  pinboardffff6666TRRsData,
  createPinboardeeee7777Params,
  createPinboardeeee7777Data,
  pinboardeeee7777CRsData,
  pinboardeeee7777OfficersData,
  pinboardeeee7777TRRsData,
};
