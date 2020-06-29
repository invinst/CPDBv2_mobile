const complaintSummary = [
  {
    'category': 'Operation/Personnel Violations',
    'count': 10,
  },
  {
    'category': null,
    'count': 8,
  },
  {
    'category': 'Lockup Procedures',
    'count': 4,
  },
  {
    'category': 'Money / Property',
    'count': 4,
  },
  {
    'category': 'Illegal Search',
    'count': 4,
  },
  {
    'category': 'Traffic',
    'count': 4,
  },
  {
    'category': 'Use Of Force',
    'count': 3,
  },
  {
    'category': 'Verbal Abuse',
    'count': 1,
  },
];

const trrSummary = [
  {
    'force_type': null,
    'count': 141,
  },
  {
    'force_type': 'Physical Force - Holding',
    'count': 56,
  },
  {
    'force_type': 'Verbal Commands',
    'count': 38,
  },
  {
    'force_type': 'Physical Force - Stunning',
    'count': 35,
  },
  {
    'force_type': 'Member Presence',
    'count': 33,
  },
  {
    'force_type': 'Physical Force - Direct Mechanical',
    'count': 5,
  },
  {
    'force_type': 'Other Force',
    'count': 3,
  },
  {
    'force_type': 'Firearm',
    'count': 1,
  },
  {
    'force_type': 'Taser',
    'count': 1,
  },
];

const officersSummary = {
  'race': [
    {
      'race': 'Black',
      'percentage': 0.55,
    },
    {
      'race': 'White',
      'percentage': 0.43,
    },
    {
      'race': 'Other',
      'percentage': 0.02,
    },
  ],
  'gender': [
    {
      'gender': 'M',
      'percentage': 0.96,
    },
    {
      'gender': 'F',
      'percentage': 0.04,
    },
  ],
};

const complainantsSummary = {
  'race': [
    {
      'race': 'Black',
      'percentage': 0.67,
    },
    {
      'race': 'White',
      'percentage': 0.27,
    },
    {
      'race': 'Other',
      'percentage': 0.05,
    },
  ],
  'gender': [
    {
      'gender': 'F',
      'percentage': 0.49,
    },
    {
      'gender': 'M',
      'percentage': 0.47,
    },
    {
      'gender': '',
      'percentage': 0.04,
    },
  ],
};

module.exports = {
  complaintSummary,
  trrSummary,
  officersSummary,
  complainantsSummary,
};
