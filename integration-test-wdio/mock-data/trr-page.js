const mockTRR = {
  id: 781,
  officer: {
    id: 583,
    'full_name': 'Donovan Markiewicz',
    gender: 'Male',
    race: 'White',
    'appointed_date': '2005-09-26',
    'birth_year': 1973,
    'resignation_date': '',
    unit: {
      'unit_name': '253',
      'description': 'Targeted Response Unit',
    },
    'percentile_allegation': 55.6188,
    'percentile_allegation_civilian': 47.638,
    'percentile_allegation_internal': 61.1521,
    'percentile_trr': 56.6663,
  },
  'officer_in_uniform': false,
  'officer_assigned_beat': '4682E',
  'officer_on_duty': true,
  'subject_race': 'BLACK',
  'subject_gender': 'Male',
  'subject_age': 27,
  'force_category': 'Other',
  'force_types': ['Physical Force - Stunning', 'Verbal Commands', 'Member Presence'],
  'date_of_incident': '2004-04-23',
  'location_type': 'Street',
  address: '11XX 79Th St',
  beat: 612,
};

module.exports = {
  mockTRR: mockTRR,
};
