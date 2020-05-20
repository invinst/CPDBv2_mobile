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
    'percentile_allegation': 99.9911,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9817',
    'percentile_allegation_internal': '87.8280',
    'percentile_allegation': '99.9911',
  },
  {
    'id': 8658,
    'full_name': 'Corey Flagg',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9696',
    'percentile_allegation': '73.2128',
    'percentile_allegation_internal': '99.6468',
  },
  {
    'id': 1782,
    'full_name': 'Charles Toussas',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9696',
    'percentile_allegation': '59.7657',
    'percentile_allegation_internal': '99.6468',
  },
  {
    'id': 2859,
    'full_name': 'Kevin Osborn',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'percentile_allegation': 33.2812,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9696',
    'percentile_allegation': '33.2812',
    'percentile_allegation_internal': '99.6468',
  },
  {
    'id': 8638,
    'full_name': 'Joe Parker',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'percentile_allegation': 12.9273,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9696',
    'percentile_allegation': '12.9273',
    'percentile_allegation_internal': '99.6468',
  },
];

const mockRecentActivities = [
  {
    'id': 12074,
    'full_name': 'Broderick Jones',
    'complaint_count': 104,
    'sustained_count': 11,
    'birth_year': 1971,
    'percentile_allegation': 99.9911,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9817',
    'percentile_allegation': '99.9911',
    'percentile_allegation_internal': '87.8280',
    kind: 'single_officer',
  },
  {
    'id': 12075,
    'full_name': 'Corey Flagg',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'percentile_allegation': 99.9822,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9696',
    'percentile_allegation': '99.9822',
    'percentile_allegation_internal': '99.6468',
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

module.exports = {
  mockLandingPageCms: mockLandingPageCms,
  mockTopOfficersByAllegation: mockTopOfficersByAllegation,
  mockRecentActivities: mockRecentActivities,
  mockNewDocuments: mockNewDocuments,
  mockComplaintSummaries: mockComplaintSummaries,
};
