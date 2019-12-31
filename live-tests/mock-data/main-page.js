const mockLandingPageCms = {
  fields: [
    {
      name: 'navbar_title',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff82',
          text: 'Citizens Police Data Project',
          type: 'unstyled',
        }],
      },
    },
    {
      type: 'rich_text',
      name: 'carousel_allegation_title',
      value: {
        entityMap: {},
        blocks: [
          {
            text: 'Repeaters',
            entityRanges: [],
            depth: 0,
            key: '0f97e',
            type: 'unstyled',
            inlineStyleRanges: [],
            data: {},
          },
        ],
      },
    },
    {
      type: 'rich_text',
      name: 'carousel_allegation_desc',
      value: {
        entityMap: {},
        blocks: [
          {
            text: 'Officers with a higher complaint rate than 99% of the rest of the police force',
            entityRanges: [],
            depth: 0,
            key: '1eda3',
            type: 'unstyled',
            inlineStyleRanges: [],
            data: {},
          },
        ],
      },
    },
    {
      type: 'rich_text',
      name: 'carousel_activity_title',
      value: {
        entityMap: {},
        blocks: [
          {
            text: 'Mentioned on Twitter',
            entityRanges: [],
            depth: 0,
            key: '0f97e',
            type: 'unstyled',
            inlineStyleRanges: [],
            data: {},
          },
        ],
      },
    },
    {
      type: 'rich_text',
      name: 'carousel_activity_desc',
      value: {
        entityMap: {},
        blocks: [
          {
            text: 'Send an officer’s name to @CPDPbot on twitter and it will show up here.',
            entityRanges: [],
            depth: 0,
            key: '1eda3',
            type: 'unstyled',
            inlineStyleRanges: [],
            data: {},
          },
        ],
      },
    },
    {
      type: 'rich_text',
      name: 'carousel_document_title',
      value: {
        entityMap: {},
        blocks: [
          {
            text: 'New Documents',
            entityRanges: [],
            depth: 0,
            key: '0f97e',
            type: 'unstyled',
            inlineStyleRanges: [],
            data: {},
          },
        ],
      },
    },
    {
      type: 'rich_text',
      name: 'carousel_document_desc',
      value: {
        entityMap: {},
        blocks: [
          {
            text: 'When you request a document through CPDP, we will file a FOIA request for its release.',
            entityRanges: [],
            depth: 0,
            key: '1eda3',
            type: 'unstyled',
            inlineStyleRanges: [],
            data: {},
          },
        ],
      },
    },
    {
      type: 'rich_text',
      name: 'carousel_complaint_title',
      value: {
        entityMap: {},
        blocks: [
          {
            text: 'Complaint Summaries',
            entityRanges: [],
            depth: 0,
            key: '0f97e',
            type: 'unstyled',
            inlineStyleRanges: [],
            data: {},
          },
        ],
      },
    },
    {
      type: 'rich_text',
      name: 'carousel_complaint_desc',
      value: {
        entityMap: {},
        blocks: [
          {
            text: 'The Civilian Office of Police Accountability (COPA) publishes summaries of some complaints.',
            entityRanges: [],
            depth: 0,
            key: '1eda3',
            type: 'unstyled',
            inlineStyleRanges: [],
            data: {},
          },
        ],
      },
    },
  ],
};

const mockTopOfficersByAllegation = [
  {
    'id': 13788,
    'full_name': 'Broderick Jones',
    'complaint_count': 104,
    'sustained_count': 11,
    'birth_year': 1971,
    'complaint_percentile': 99.9911,
    'race': 'Black',
    'gender': 'Male',
    'rank': 'Police Officer',
    'percentile': {
      'percentile_trr': '0.0000',
      'percentile_allegation_civilian': '99.9817',
      'percentile_allegation': '99.9911',
      'year': 2005,
      'id': 13788,
      'percentile_allegation_internal': '87.8280',
    },
  },
  {
    'id': 8658,
    'full_name': 'Corey Flagg',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'complaint_percentile': 99.9822,
    'race': 'Black',
    'gender': 'Male',
    'rank': 'Police Officer',
    'percentile': {
      'percentile_trr': '0.0000',
      'percentile_allegation_civilian': '99.9696',
      'percentile_allegation': '99.9822',
      'year': 2005,
      'id': 8658,
      'percentile_allegation_internal': '99.6468',
    },
  },
];

const mockRecentActivities = [
  {
    'id': 12074,
    'full_name': 'Broderick Jones',
    'complaint_count': 104,
    'sustained_count': 11,
    'birth_year': 1971,
    'complaint_percentile': 99.9911,
    'race': 'Black',
    'gender': 'Male',
    'rank': 'Police Officer',
    'percentile': {
      'percentile_trr': '0.0000',
      'percentile_allegation_civilian': '99.9817',
      'percentile_allegation': '99.9911',
      'year': 2005,
      'id': 13788,
      'percentile_allegation_internal': '87.8280',
    },
    kind: 'single_officer',
  },
  {
    'id': 12075,
    'full_name': 'Corey Flagg',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'complaint_percentile': 99.9822,
    'race': 'Black',
    'gender': 'Male',
    'rank': 'Police Officer',
    'percentile': {
      'percentile_trr': '0.0000',
      'percentile_allegation_civilian': '99.9696',
      'percentile_allegation': '99.9822',
      'year': 2005,
      'id': 8658,
      'percentile_allegation_internal': '99.6468',
    },
    kind: 'single_officer',
  },
];

const mockNewDocuments = [
  {
    crid: '170123',
    'incident_date': '2009-06-13',
    category: 'Criminal Misconduct',
    'latest_document': [{
      'title': 'CRID 1071970 OCIR 2 of 3',
      'url': '',
      'preview_image_url': 'http://via.placeholder.com/133x176',
    }],
  },
  {
    crid: '170456',
    'incident_date': '2009-06-13',
    category: 'Operation/Personnel Violations',
    'latest_document': [],
  },
];

const mockComplaintSummaries = [
  {
    crid: '123',
    summary: 'regarding an incident that occurred',
    'incident_date': '2016-11-30',
    'category_names': ['Use of Force'],
  },
  {
    crid: '456',
    summary: 'Officer A was off-duty and inside her residence.',
    'incident_date': '2009-06-13',
    'category_names': ['Domestic'],
  },
];

const mockToasts = [
  {
    name: 'OFFICER',
    template: '**{rank} {full_name}** {age} {race} {gender},' +
      '\nwith *{complaint_count} complaints*, *{sustained_count} sustained* {action_type}.',
  },
  {
    name: 'CR',
    template: '**CR #{crid}** *categorized as {category}*\nhappened in {incident_date} {action_type}.',
  },
  {
    name: 'TRR',
    template: '**TRR #{id}** *categorized as {force_type}*\nhappened in {incident_date} {action_type}.',
  },
];

module.exports = {
  mockLandingPageCms: mockLandingPageCms,
  mockTopOfficersByAllegation: mockTopOfficersByAllegation,
  mockRecentActivities: mockRecentActivities,
  mockNewDocuments: mockNewDocuments,
  mockComplaintSummaries: mockComplaintSummaries,
  mockToasts: mockToasts,
};
