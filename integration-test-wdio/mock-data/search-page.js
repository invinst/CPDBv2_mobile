import { range } from 'lodash';

export const createPinboardWithRecentItemsParams = {
  'crids': ['1002144'],
  'officer_ids': [8562],
  'trr_ids': [14487],
};

export const createPinboardWithRecentItemsResponse = {
  'id': 'eeee7777',
  'title': '',
  'description': '',
};

export const mockSearchQueryResponse = {
  'OFFICER': [
    {
      id: 9876,
      name: 'John Wang',
      badge: '9999',
    },
  ],
};

export const mockSearchQueryResponseForRecentItems = {
  'OFFICER': [
    {
      id: 8562,
      name: 'Jerome Finnigan',
      badge: '5167',
    },
  ],
  'CR': [
    {
      crid: '1002144',
      category: 'False Arrest',
      'incident_date': '2006-05-29',
    },
  ],
  'TRR': [
    {
      id: 14487,
    },
  ],
  'LAWSUIT': [
    {
      id: 234567,
      'case_no': '00-L-5230',
      'primary_cause': 'EXCESSIVE FORCE/MINOR',
      'summary': 'Lawsuit summary',
      'incident_date': '2016-09-11',
    },
  ],
};

export const mockSearchQueryResponseWithDate = {
  'DATE > CR': [
    {
      crid: '297449',
      id: '38221',
      category: 'Domestic',
      highlight: {
        summary: ['On October', 'regarding an incident that occurred'],
      },
      'incident_date': '2011-10-13',
    },
    {
      crid: '297473',
      id: '38245',
      category: 'Use Of Force',
      highlight: {
        summary: ['On July', 'an off-duty'],
      },
      'incident_date': '2009-06-13',
    },
  ],
  'DATE > TRR': [
    { id: '767' },
    { id: '773' },
  ],
  'DATE > OFFICERS': [
    {
      id: 1234,
      name: 'Jerome Finnigan',
      badge: '6789',
      'percentile_trr': '72.1048',
      'percentile_allegation_civilian': '77.0532',
      'percentile_allegation': '96.5674',
      'percentile_allegation_internal': '98.5982',
    },
  ],
  OFFICER: [
    {
      id: 7694,
      name: 'William Eaker',
      badge: '6056',
      'percentile_trr': '79.1048',
      'percentile_allegation_civilian': '97.0434',
      'percentile_allegation': '98.5554',
      'percentile_allegation_internal': '88.5567',
    },
  ],
  'CR': [
    {
      crid: '397449',
      id: '48221',
      category: 'Unknown',
      highlight: {
        summary: ['On July', 'an off-duty'],
      },
      'incident_date': '2009-06-13',
    },
    {
      crid: '397473',
      id: '48245',
      category: 'Domestic',
      highlight: {
        summary: ['On October', 'regarding an incident that occurred'],
      },
      'incident_date': '2011-10-13',
    },
  ],
  'TRR': [
    { id: '867' },
    { id: '873' },
  ],
  'LAWSUIT': [
    {
      id: 234567,
      'case_no': '00-L-5230',
      'primary_cause': 'Excessive force',
      'summary': 'Lawsuit summary',
      'incident_date': '2016-09-11',
    },
    {
      id: 234568,
      'case_no': '00-L-5231',
      'primary_cause': 'Excessive force',
      'summary': 'Lawsuit summary',
      'incident_date': '2016-10-11',
    },
  ],
};

export const mockOfficerSearchQueryResponse = {
  count: 35,
  next: 'http://localhost:8000/api/v2/search-mobile/single/?contentType=OFFICER&offset=30&term=2004-04-23+ke',
  previous: null,
  results: [
    {
      id: 7694,
      name: 'William Eaker',
      badge: '6056',
      'percentile_trr': '79.1048',
      'percentile_allegation_civilian': '97.0434',
      'percentile_allegation': '98.5554',
      'percentile_allegation_internal': '88.5567',
    },
    {
      id: 7695,
      name: 'Joseph Boisso',
      badge: '2308',
      'percentile_trr': '65',
      'percentile_allegation_civilian': '90',
      'percentile_allegation': '92',
      'percentile_allegation_internal': '88.5567',
    },
  ],
};

export const mockFirstOfficersSearchQueryResponse = {
  count: 35,
  next: 'http://localhost:8000/api/v2/search-mobile/single/?contentType=OFFICER&offset=30&term=2004-04-23+ke',
  previous: null,
  results: range(30).map(idx => ({
    id: 7694 + idx,
    name: `William Eaker ${idx}`,
    badge: '6056',
    'percentile_trr': '79.1048',
    'percentile_allegation_civilian': '97.0434',
    'percentile_allegation': '98.5554',
    'percentile_allegation_internal': '88.5567',
  })),
};

export const mockSecondOfficersSearchQueryResponse = {
  count: 35,
  next: null,
  previous: 'http://localhost:8000/api/v2/search-mobile/single/?contentType=OFFICER&limit=30&term=2004-04-23+ke',
  results: range(5).map(idx => ({
    id: 8697 + idx,
    name: `Joseph Boisso ${idx}}`,
    badge: '2308',
    'percentile_trr': '65',
    'percentile_allegation_civilian': '90',
    'percentile_allegation': '92',
    'percentile_allegation_internal': '88.5567',
  })),
};

export const mockDateOfficerSearchQueryResponse = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 1234,
      name: 'Jerome Finnigan',
      badge: '6789',
      'percentile_trr': '72.1048',
      'percentile_allegation_civilian': '77.0532',
      'percentile_allegation': '96.5674',
      'percentile_allegation_internal': '98.5982',
    },
    {
      id: 7694,
      name: 'William Eaker',
      badge: '6056',
      'percentile_trr': '79.1048',
      'percentile_allegation_civilian': '97.0434',
      'percentile_allegation': '98.5554',
      'percentile_allegation_internal': '88.5567',
    },
    {
      id: 7695,
      name: 'Joseph Boisso',
      badge: '2308',
      'percentile_trr': '65',
      'percentile_allegation_civilian': '90',
      'percentile_allegation': '92',
      'percentile_allegation_internal': '88.5567',
    },
  ],
};

export const mockInvestigatorCRSearchResponse = {
  'INVESTIGATOR > CR': [
    {
      crid: '123456',
      id: '123456',
      category: 'Criminal Misconduct',
      highlight: {
        summary: ['On July', 'an off-duty'],
      },
      'incident_date': '2009-06-13',
    },
    {
      crid: '654321',
      id: '654321',
      category: 'Domestic',
      highlight: {
        summary: ['On October', 'regarding an incident that occurred'],
      },
      'incident_date': '2011-10-13',
    },
  ],
};

export const emptyPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
};

export const createPinboardResponse = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': ['123456'],
  'trr_ids': [],
  'description': '',
};

export const createEmptyPinboardResponse = {
  'id': 1,
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': 'Description',
};

export const mockNewRecentSearchItemsResponse = [
  {
    'id': 8562,
    'name': 'Jerome Finnigan',
    'badge': '123456',
    'type': 'OFFICER',
  },
  {
    'crid': '1002144',
    'id': '1002144',
    'incident_date': '2010-05-29',
    'category': 'False Arrest',
    'type': 'CR',
  },
  {
    'id': 14487,
    'type': 'TRR',
  },
  {
    'id': 234567,
    'case_no': '00-L-5230',
    'primary_cause': 'EXCESSIVE FORCE/MINOR',
    'summary': 'Lawsuit summary',
    'incident_date': '2016-09-11',
    'type': 'LAWSUIT',
  },
];

export const officer8562 = {
  'officer_id': 8562,
  'full_name': 'Jerome Finnigan',
  'badge': '5167',
};

export const cr1002144 = {
  'crid': '1002144',
  'incident_date': '2006-05-29',
  'category': 'False Arrest',
};

export const trr14487 = {
  'id': 14487,
};

export const lawsuit00L5230 = {
  'case_no': '00-L-5230',
  'primary_cause': 'EXCESSIVE FORCE/MINOR',
  'summary': 'Lawsuit summary',
  'incident_date': '2016-10-11',
};

export const mockNewCreatedPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': ['123456'],
  'trr_ids': [],
  'description': '',
};

export const mockPinboardComplaint = [
  {
    'crid': '123456',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
];

export const mockComplaintPinnedItemPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': ['123456'],
  'trr_ids': [],
  'description': '',
};

export const mockUpdatedComplaintPinnedItemPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': ['123456', '654321'],
  'trr_ids': [],
  'description': '',
};

export const mockPinboardComplaints = [
  {
    'crid': '123456',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
  {
    'crid': '654321',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
];

export const mockSearchQueryLongResponse = {
  'OFFICER': [
    {
      id: 9876,
      name: 'John Wang',
      badge: '9999',
    },
    officer8562,
  ],
  'TRR': [
    { id: '767' },
    { id: '773' },
  ],
  'CR': [
    cr1002144,
    trr14487,
  ],
};
