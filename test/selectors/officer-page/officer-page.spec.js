import should from 'should';
import {
  officerSummarySelector,
} from 'selectors/officer-page';

describe('officer-page selectors', () => {
  describe('officerSummarySelector', () => {
    it('should return officer summary with matching ID', () => {
      const props = {
        params: {
          id: 11
        }
      };

      const state = {
        officerPage: {
          summaries: {
            data: {
              11: {
                'date_of_appt': '2001-01-1',
                'gender': 'Male',
                'complaint_records': {
                  'count': 20,
                  'sustained_count': '2',
                  'facets': [
                    {
                      'name': 'category',
                      'entries': [
                        {
                          'count': 11,
                          'sustained_count': 1,
                          'name': 'Use of Force'
                        }
                      ]
                    },
                    {
                      'name': 'complainant race',
                      'entries': [
                        {
                          'count': 3,
                          'sustained_count': 1,
                          'name': 'Black'
                        },
                        {
                          'count': 1,
                          'sustained_count': 1,
                          'name': 'White'
                        },
                        {
                          'count': 2,
                          'sustained_count': 1,
                          'name': 'White/Hispanic'
                        }
                      ]
                    },
                    {
                      'name': 'complainant age',
                      'entries': [
                        {
                          'count': 1,
                          'sustained_count': 1,
                          'name': '38'
                        }
                      ]
                    },
                    {
                      'name': 'complainant gender',
                      'entries': [
                        {
                          'count': 4,
                          'sustained_count': 1,
                          'name': 'Male'
                        },
                        {
                          'count': 2,
                          'sustained_count': 1,
                          'name': 'Female'
                        }
                      ]
                    }
                  ]
                },
                'rank': 'Police Officer',
                'race': 'White',
                'full_name': 'Jason Van Dyke',
                'badge': '9465',
                'id': 7655,
                'unit': {
                  'unit_name': '008',
                  'id': 5,
                  'description': 'District 008'
                }
              }
            }
          }
        }
      };

      const currentYear = new Date().getFullYear();

      officerSummarySelector(state, props).should.be.eql({
        name: 'Jason Van Dyke',
        unit: '008',
        rank: 'Police Officer',
        badge: '9465',
        dateOfAppt: 'JAN 01, 2001',
        yearsSinceDateOfAppt: `${currentYear - 2001} years`,
        race: 'White',
        sex: 'Male',
        complaints: {
          count: 20,
          sustainedCount: '2',
          facets: [
            {
              name: 'Category',
              entries: [
                {
                  'count': 11,
                  'sustained_count': 1,
                  'name': 'Use of Force'
                }
              ]
            },
            {
              name: 'Complainant Race',
              entries: [
                {
                  'count': 3,
                  'sustained_count': 1,
                  'name': 'Black'
                },
                {
                  'count': 1,
                  'sustained_count': 1,
                  'name': 'White'
                },
                {
                  'count': 2,
                  'sustained_count': 1,
                  'name': 'White/Hispanic'
                }
              ]
            },
            {
              'name': 'Complainant Age',
              'entries': [
                {
                  'count': 1,
                  'sustained_count': 1,
                  'name': '38'
                }
              ]
            },
            {
              name: 'Complainant Gender',
              entries: [
                {
                  'count': 4,
                  'sustained_count': 1,
                  'name': 'Male'
                },
                {
                  'count': 2,
                  'sustained_count': 1,
                  'name': 'Female'
                }
              ]
            }
          ]
        }
      });
    });

    it('should return null if officer summary with matching ID does not exist', function () {
      const props = {
        params: {
          id: 11
        }
      };

      const state = {
        officerPage: {
          summaries: {
            data: {
              22: { 'not': 'matching' }
            }
          }
        }
      };

      should(officerSummarySelector(state, props)).be.null();
    });
  });
});
