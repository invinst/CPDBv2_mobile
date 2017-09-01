import { complaintSelector } from 'selectors/complaint-page';
import should from 'should';

describe('complaint-page selectors', () => {
  describe('complaintSelector', () => {
    it('should do nothing & return null if complaint is not found', () => {
      const state = {
        complaintPage: {
          complaints: {}
        }
      };
      const props = {
        params: {
          complaintId: '1'
        }
      };
      should(complaintSelector(state, props)).be.null();
    });

    it('should correctly get and transform complaint data', () => {
      const state = {
        complaintPage: {
          complaints: {
            '111': {
              'address': '',
              'beat': '',
              'complainants': [],
              'incident_date': '2005-07-29',
              'location': '',
              'point': '',
              'crid': '307389',
              'coaccused': [
                {
                  'category': 'Operation\/Personnel Violations',
                  'subcategory': 'Miscellaneous',
                  'end_date': null,
                  'gender': 'Male',
                  'final_outcome': 'Penalty Not Served',
                  'start_date': '2005-07-29',
                  'race': 'White',
                  'full_name': 'Jerome Finnigan',
                  'recc_outcome': 'Unknown',
                  'badge': '5167',
                  'id': 2235,
                  'final_finding': 'Sustained'
                }
              ],
              involvements: [
                {
                  'involved_type': 'Inmate',
                  'officers': [
                    {
                      'abbr_name': 'J. Van Dyke',
                      'id': 7655,
                      'extra_info': 'male, white'
                    }
                  ]
                },
                {
                  'involved_type': 'Complainant',
                  'officers': [
                    {
                      'abbr_name': 'D. Mc Naughton',
                      'id': 4762,
                      'extra_info': 'male, white'
                    }
                  ]
                }
              ]
            }
          }
        }
      };

      const props = {
        params: {
          complaintId: '111'
        }
      };

      complaintSelector(state, props).should.eql({
        'address': '',
        'beat': '',
        'complainants': [],
        'incidentDate': 'Jul 29, 2005',
        'location': '',
        'point': '',
        'crid': '307389',
        'coaccused': [
          {
            'category': 'Operation\/Personnel Violations',
            'subcategory': 'Miscellaneous',
            'startDate': 'Jul 29, 2005',
            'endDate': null,
            'finalFinding': 'Sustained',
            'finalOutcome': 'Penalty Not Served',
            'fullName': 'Jerome Finnigan',
            'gender': 'male',
            'badge': '5167',
            'id': 2235,
            'race': 'white',
            'reccOutcome': 'Unknown'
          }
        ],
        'involvements': [
          {
            'involvedType': 'Inmate',
            'officers': [
              {
                'abbrName': 'J. Van Dyke',
                'extraInfo': 'male, white',
                'id': 7655
              }
            ]
          },
          {
            'involvedType': 'Complainant',
            'officers': [
              {
                'abbrName': 'D. Mc Naughton',
                'extraInfo': 'male, white',
                'id': 4762
              }
            ]
          }
        ]
      });
    });
  });
});
