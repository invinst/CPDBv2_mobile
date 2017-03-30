import should from 'should';
import { officerSummarySelector, officerTimelineSelector } from 'selectors/officer-page';

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
                  'facets': [
                    {
                      'name': 'category',
                      'entries': [
                        {
                          'count': 11,
                          'name': 'Use of Force'
                        }
                      ]
                    },
                    {
                      'name': 'race',
                      'entries': [
                        {
                          'count': 3,
                          'name': 'Black'
                        },
                        {
                          'count': 1,
                          'name': 'White'
                        },
                        {
                          'count': 2,
                          'name': 'White/Hispanic'
                        }
                      ]
                    },
                    {
                      'name': 'age',
                      'entries': [
                        {
                          'count': 1,
                          'name': '38'
                        }
                      ]
                    },
                    {
                      'name': 'gender',
                      'entries': [
                        {
                          'count': 4,
                          'name': 'Male'
                        },
                        {
                          'count': 2,
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
                'unit': '008'
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
          facets: [
            {
              name: 'Category',
              entries: [
                {
                  'count': 11,
                  'name': 'Use of Force'
                }
              ]
            },
            {
              name: 'Complainant Race',
              entries: [
                {
                  'count': 3,
                  'name': 'Black'
                },
                {
                  'count': 1,
                  'name': 'White'
                },
                {
                  'count': 2,
                  'name': 'White/Hispanic'
                }
              ]
            },
            {
              'name': 'Complainant Age',
              'entries': [
                {
                  'count': 1,
                  'name': '38'
                }
              ]
            },
            {
              name: 'Complainant Gender',
              entries: [
                {
                  'count': 4,
                  'name': 'Male'
                },
                {
                  'count': 2,
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

  describe('officerTimelineSelector', function () {
    it('should return officer timeline with matching ID', function () {
      const props = {
        params: {
          id: 11
        }
      };

      const state = {
        officerPage: {
          timelines: {
            data: {
              11: {
                foo: 'bar',
                results: [
                  {
                    date: '2000-01-01'
                  }
                ]
              }
            }
          }
        }
      };

      officerTimelineSelector(state, props).should.be.eql({
        foo: 'bar',
        results: [
          {
            date: 'Jan 01, 2000'
          }
        ]
      });
    });

    it('should return null if officer timeline with matching ID does not exist', function () {
      const props = {
        params: {
          id: 11
        }
      };

      const state = {
        officerPage: {
          timelines: {
            data: {
              22: { 'not': 'matching' }
            }
          }
        }
      };

      should(officerTimelineSelector(state, props)).be.null();
    });
  });
});
