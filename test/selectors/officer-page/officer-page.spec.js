import should from 'should';

import {
  officerSummarySelector,
  officerMetricsSelector,
  officerYearlyPercentileSelector,
} from 'selectors/officer-page';


describe('officer-page selectors', () => {
  describe('officerYearlyPercentileSelector', function () {
    it('should return percentile data and mapped color', function () {
      const props = {
        params: {
          id: 11
        }
      };
      const state = {
        officerPage: {
          officers: {
            data: {
              11: {
                percentiles: [
                  {
                    'officer_id': 1,
                    year: 2005,
                    'percentile_allegation_civilian': null,
                    'percentile_allegation_internal': null,
                    'percentile_trr': null,
                    'percentile_allegation': '41.001',
                  },
                  {
                    'officer_id': 1,
                    year: 2006,
                    'percentile_allegation_civilian': '66.251',
                    'percentile_allegation_internal': '0.023',
                    'percentile_trr': '0.049',
                    'percentile_allegation': '41.001',
                  },
                  {
                    'officer_id': 1,
                    year: 2007,
                    'percentile_allegation_civilian': '75.065',
                    'percentile_allegation_internal': '0.022',
                    'percentile_trr': '0.046',
                    'percentile_allegation': '31.201'
                  }
                ]
              }
            }
          }
        }
      };

      officerYearlyPercentileSelector(state, props).should.eql([{
        'items': [{
          'axis': 'Use of Force Reports',
          'value': 0.049
        }, {
          'axis': 'Internal Allegations',
          'value': 0.023
        }, {
          'axis': 'Civilian Allegations',
          'value': 66.251
        }],
        'officerId': 1,
        textColor: '#231F20',
        visualTokenBackground: '#fc5d2c',
        'year': 2006,
      }, {
        'items': [{
          'axis': 'Use of Force Reports',
          'value': 0.046
        }, {
          'axis': 'Internal Allegations',
          'value': 0.022
        }, {
          'axis': 'Civilian Allegations',
          'value': 75.065
        }],
        'officerId': 1,
        textColor: '#231F20',
        visualTokenBackground: '#fc5d2c',
        'year': 2007,
      }]);
    });
  });

  describe('officerSummarySelector', function () {
    const props = {
      params: {
        id: 11
      }
    };
    const state = {
      officerPage: {
        officers: {
          data: {
            11: {
              'full_name': 'Officer 11',
              unit: {
                'unit_name': '001',
                'description': 'description'
              },
              rank: 'rank',
              'date_of_appt': '2015-09-23',
              race: 'race',
              gender: 'Male',
              badge: 'badge',
              'historic_badges': ['1', '2'],
              'birth_year': 1991,
            }
          }
        }
      }
    };

    it('should return summary', function () {
      officerSummarySelector(state, props).should.eql({
        name: 'Officer 11',
        rank: 'rank',
        unit: 'Unit 001 - description',
        demographic: '26 years old, race, male.',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
      });
    });

    it('should return N/A if rank is not returned', function () {
      const nullRankState = {
        officerPage: {
          officers: {
            data: {
              11: {
                'full_name': 'Officer 11',
                rank: null,
                unit: {
                  'description': 'description'
                },
                'date_of_appt': '2015-09-23',
                race: 'white',
                gender: 'Male',
                badge: 'badge',
                'historic_badges': ['1', '2'],
              }
            }
          }
        }
      };
      officerSummarySelector(nullRankState, props).should.eql({
        name: 'Officer 11',
        rank: 'N/A',
        unit: 'description',
        demographic: 'White, male.',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
      });
    });

    it('should return empty demographic if all birth_year, race and sex are not available', function () {
      const emptyDemographicState = {
        officerPage: {
          officers: {
            data: {
              11: {
                'full_name': 'Officer 11',
                rank: null,
                unit: {
                  'unit_name': '001',
                },
                'date_of_appt': '2015-09-23',
                badge: 'badge',
                'historic_badges': ['1', '2'],
              }
            }
          }
        }
      };
      officerSummarySelector(emptyDemographicState, props).should.eql({
        name: 'Officer 11',
        rank: 'N/A',
        unit: 'Unit 001',
        demographic: '',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
      });
    });

    it('should able to return empty unit string', function () {
      const emptyUnitState = {
        officerPage: {
          officers: {
            data: {
              11: {
                'full_name': 'Officer 11',
                rank: null,
                unit: {
                  'unit_id': 123,
                },
                'date_of_appt': '2015-09-23',
                badge: 'badge',
                'historic_badges': ['1', '2'],
              }
            }
          }
        }
      };
      officerSummarySelector(emptyUnitState, props).should.eql({
        name: 'Officer 11',
        rank: 'N/A',
        unit: '',
        demographic: '',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
      });
    });

    it('should return empty Rank instead of N/A if rank is not returned', function () {
      const missingRankState = {
        officerPage: {
          officers: {
            data: {
              11: {
                'full_name': 'Officer 11',
                unit: {
                  'unit_name': '001',
                  'description': 'description'
                },
                'date_of_appt': '2015-09-23',
                badge: 'badge',
                'historic_badges': ['1', '2'],
                'birth_year': 1991,
              }
            }
          }
        }
      };
      officerSummarySelector(missingRankState, props).should.eql({
        name: 'Officer 11',
        rank: '',
        unit: 'Unit 001 - description',
        demographic: '26 years old.',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
      });
    });

    it('should return null if officer with matching ID does not exist', function () {
      const notFoundProps = {
        params: {
          id: 12
        }
      };

      should(officerSummarySelector(state, notFoundProps)).be.null();
    });
  });

  describe('officerMetricsSelector', function () {
    const props = {
      params: {
        id: 11
      }
    };
    const state = {
      officerPage: {
        officers: {
          data: {
            11: {
              'allegation_count': 1,
              'complaint_percentile': 4.000,
              'honorable_mention_count': 3,
              'honorable_mention_percentile': 3.000,
              'sustained_count': 4,
              'discipline_count': 5,
              'trr_count': 7,
              'civilian_compliment_count': 10,
              'major_award_count': 5,
              'percentiles': [
                { 'year': 2015, 'percentile_trr': 8.0 },
                { 'year': 2016, 'percentile_trr': 9.0 },
              ]
            }
          }
        }
      }
    };

    it('should return metrics', function () {
      officerMetricsSelector(state, props).should.eql({
        allegationCount: 1,
        allegationPercentile: 4.000,
        honorableMentionCount: 3,
        honorableMentionPercentile: 3.000,
        sustainedCount: 4,
        disciplineCount: 5,
        trrCount: 7,
        majorAwardCount: 5,
        trrPercentile: 9.0,
        civilianComplimentCount: 10,
      });
    });

    it('should return null if officer with matching ID does not exist', function () {
      const notFoundProps = {
        params: {
          id: 12
        }
      };

      should(officerMetricsSelector(state, notFoundProps)).be.null();
    });
  });
});
