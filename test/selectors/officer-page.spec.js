import should from 'should';
import {
  officerSummarySelector,
  officerTimelineSelector,
  hasMoreOfficerTimelineSelector
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

  describe('hasMoreOfficerTimelineSelector', function () {
    it('should return false if timeline with matching ID is not available', function () {
      const state = {
        officerPage: {
          timelines: {
            data: {
              2: {
                isRequesting: true,
                next: 'some-url'
              }
            }
          }
        }
      };

      const props = {
        params: {
          id: 2
        }
      };

      hasMoreOfficerTimelineSelector(state, props).should.be.false();
    });

    it('should return false if a timeline request is currently in progress', function () {
      const state = {
        officerPage: {
          timelines: {
            data: {
              2: {
                isRequesting: true,
                next: 'some-url'
              }
            }
          }
        }
      };

      const props = {
        params: {
          id: 2
        }
      };

      hasMoreOfficerTimelineSelector(state, props).should.be.false();
    });

    it('should return false if next url does not exist', function () {
      const state = {
        officerPage: {
          timelines: {
            data: {
              2: {
                isRequesting: false,
                next: null
              }
            }
          }
        }
      };

      const props = {
        params: {
          id: 2
        }
      };

      hasMoreOfficerTimelineSelector(state, props).should.be.false();
    });

    it('should return true if next url is available', function () {
      const state = {
        officerPage: {
          timelines: {
            data: {
              2: {
                isRequesting: false,
                next: 'some-url'
              }
            }
          }
        }
      };

      const props = {
        params: {
          id: 2
        }
      };

      hasMoreOfficerTimelineSelector(state, props).should.true();
    });
  });
});
