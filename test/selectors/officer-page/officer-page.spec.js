import should from 'should';

import {
  officerSummarySelector,
  officerMetricsSelector,
  officerYearlyPercentileSelector,
  getIsOfficerPinned,
} from 'selectors/officer-page';


describe('officer-page selectors', function () {
  describe('officerYearlyPercentileSelector', function () {
    it('should return percentile data and mapped color', function () {
      const props = {
        match: {
          params: {
            id: 11,
          },
        },
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
                    'percentile_allegation': '31.201',
                  },
                ],
              },
            },
          },
        },
      };

      officerYearlyPercentileSelector(state, props).should.eql([{
        'items': [{
          'axis': 'Use of Force Reports',
          'value': 0.049,
        }, {
          'axis': 'Internal Allegations',
          'value': 0.023,
        }, {
          'axis': 'Civilian Allegations',
          'value': 66.251,
        }],
        textColor: '#231F20',
        visualTokenBackground: '#F4A298',
        'year': 2006,
      }, {
        'items': [{
          'axis': 'Use of Force Reports',
          'value': 0.046,
        }, {
          'axis': 'Internal Allegations',
          'value': 0.022,
        }, {
          'axis': 'Civilian Allegations',
          'value': 75.065,
        }],
        textColor: '#231F20',
        visualTokenBackground: '#F4A298',
        'year': 2007,
      }]);
    });
  });

  describe('officerSummarySelector', function () {
    const props = {
      match: {
        params: {
          id: 11,
        },
      },
    };
    const state = {
      officerPage: {
        officers: {
          data: {
            11: {
              'officer_id': 11,
              'full_name': 'Officer 11',
              unit: {
                'unit_name': '001',
                'description': 'description',
              },
              rank: 'rank',
              'date_of_appt': '2015-09-23',
              race: 'race',
              gender: 'Male',
              badge: 'badge',
              'historic_badges': ['1', '2'],
              'birth_year': 1991,
              'has_unique_name': true,
            },
          },
        },
      },
    };

    it('should return summary', function () {
      officerSummarySelector(state, props).should.eql({
        id: 11,
        name: 'Officer 11',
        rank: 'rank',
        unit: 'Unit 001 - description',
        demographic: '26 years old, race, male.',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
        hasUniqueName: true,
      });
    });

    it('should return N/A if rank is not returned', function () {
      const nullRankState = {
        officerPage: {
          officers: {
            data: {
              11: {
                'officer_id': 11,
                'full_name': 'Officer 11',
                rank: null,
                unit: {
                  'description': 'description',
                },
                'date_of_appt': '2015-09-23',
                race: 'white',
                gender: 'Male',
                badge: 'badge',
                'historic_badges': ['1', '2'],
                'has_unique_name': true,
              },
            },
          },
        },
      };
      officerSummarySelector(nullRankState, props).should.eql({
        id: 11,
        name: 'Officer 11',
        rank: 'N/A',
        unit: 'description',
        demographic: 'White, male.',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
        hasUniqueName: true,
      });
    });

    it('should return empty demographic if all birth_year, race and sex are not available', function () {
      const emptyDemographicState = {
        officerPage: {
          officers: {
            data: {
              11: {
                'officer_id': 11,
                'full_name': 'Officer 11',
                rank: null,
                unit: {
                  'unit_name': '001',
                },
                'date_of_appt': '2015-09-23',
                badge: 'badge',
                'historic_badges': ['1', '2'],
                'has_unique_name': true,
              },
            },
          },
        },
      };
      officerSummarySelector(emptyDemographicState, props).should.eql({
        id: 11,
        name: 'Officer 11',
        rank: 'N/A',
        unit: 'Unit 001',
        demographic: '',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
        hasUniqueName: true,
      });
    });

    it('should able to return empty unit string', function () {
      const emptyUnitState = {
        officerPage: {
          officers: {
            data: {
              11: {
                'officer_id': 11,
                'full_name': 'Officer 11',
                rank: null,
                unit: {
                  'unit_id': 123,
                },
                'date_of_appt': '2015-09-23',
                badge: 'badge',
                'historic_badges': ['1', '2'],
                'has_unique_name': true,
              },
            },
          },
        },
      };
      officerSummarySelector(emptyUnitState, props).should.eql({
        id: 11,
        name: 'Officer 11',
        rank: 'N/A',
        unit: '',
        demographic: '',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
        hasUniqueName: true,
      });
    });

    it('should return empty Rank instead of N/A if rank is not returned', function () {
      const missingRankState = {
        officerPage: {
          officers: {
            data: {
              11: {
                'officer_id': 11,
                'full_name': 'Officer 11',
                unit: {
                  'unit_name': '001',
                  'description': 'description',
                },
                'date_of_appt': '2015-09-23',
                badge: 'badge',
                'historic_badges': ['1', '2'],
                'birth_year': 1991,
                'has_unique_name': true,
              },
            },
          },
        },
      };
      officerSummarySelector(missingRankState, props).should.eql({
        id: 11,
        name: 'Officer 11',
        rank: '',
        unit: 'Unit 001 - description',
        demographic: '26 years old.',
        badge: 'badge',
        historicBadges: ['1', '2'],
        careerDuration: 'SEP 23, 2015 — Present',
        hasUniqueName: true,
      });
    });

    it('should return null if officer with matching ID does not exist', function () {
      const notFoundProps = {
        match: {
          params: {
            id: 12,
          },
        },
      };

      should(officerSummarySelector(state, notFoundProps)).be.null();
    });
  });

  describe('officerMetricsSelector', function () {
    const props = {
      match: {
        params: {
          id: 11,
        },
      },
    };
    const state = {
      officerPage: {
        officers: {
          data: {
            11: {
              'allegation_count': 1,
              'percentile_allegation': '4.0000',
              'percentile_trr': '9.0000',
              'honorable_mention_count': 3,
              'honorable_mention_percentile': '3.0000',
              'sustained_count': 4,
              'discipline_count': 5,
              'trr_count': 7,
              'civilian_compliment_count': 10,
              'major_award_count': 5,
              'percentiles': [
                { 'year': 2015, 'percentile_trr': 8.0 },
                { 'year': 2016, 'percentile_trr': 9.0 },
              ],
            },
          },
        },
      },
    };

    it('should return metrics', function () {
      officerMetricsSelector(state, props).should.eql({
        allegationCount: 1,
        allegationPercentile: '4.0000',
        honorableMentionCount: 3,
        honorableMentionPercentile: '3.0000',
        sustainedCount: 4,
        disciplineCount: 5,
        trrCount: 7,
        majorAwardCount: 5,
        trrPercentile: '9.0000',
        civilianComplimentCount: 10,
      });
    });

    it('should return null if officer with matching ID does not exist', function () {
      const notFoundProps = {
        match: {
          params: {
            id: 12,
          },
        },
      };

      should(officerMetricsSelector(state, notFoundProps)).be.null();
    });
  });

  describe('getIsCrPinned', function () {
    it('should return true if officerId is in pinboard', function () {
      const state = {
        pinboardPage: {
          pinboard: {
            'officer_ids': [123, 124, 125],
          },
        },
      };
      getIsOfficerPinned(state, 123).should.be.true();
    });

    it('should return false if officerId is not in pinboard', function () {
      const state = {
        pinboardPage: {
          pinboard: {
            'officer_ids': [123, 124, 125],
          },
        },
      };
      getIsOfficerPinned(state, 126).should.be.false();
    });
  });
});
