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

    it('should return default value if not found', function () {
      const state = {
        complaintPage: {
          complaints: {
            '111': {
              'incident_date': null,
              coaccused: []
            }
          }
        }
      };

      const props = {
        params: {
          complaintId: '111'
        }
      };

      const result = complaintSelector(state, props);
      should(result.incidentDate).be.null();
      result.category.should.eql('Unknown');
      result.subcategory.should.eql('Unknown');
    });

    it('should correctly get and transform complaint data', () => {
      const state = {
        complaintPage: {
          complaints: {
            '111': {
              'most_common_category': {
                'category': 'False Arrest',
                'allegation_name': 'Illegal Arrest/ False Arrest'
              },
              'summary': 'Summary',
              'address': 'Talman Ave',
              'beat': '0831',
              'complainants': [{
                'gender': 'Male',
                'age': 45,
                'race': 'Black'
              }],
              'victims': [{
                'gender': 'Male',
                'age': 54,
                'race': 'White'
              }],
              'incident_date': '2005-07-29',
              'location': 'Building',
              'start_date': '2005-07-29',
              'end_date': '2005-07-30',
              'point': '',
              'crid': '307389',
              'coaccused': [
                {
                  'category': 'Operation\/Personnel Violations',
                  'final_outcome': 'Penalty Not Served',
                  'full_name': 'Jerome Finnigan',
                  'id': 2235,
                  'final_finding': 'Sustained',
                  'rank': 'Police Officer',
                  'disciplined': true
                }
              ],
              'involvements': [
                {
                  'involved_type': 'investigator',
                  'full_name': 'Peter Parker'
                },
                {
                  'involved_type': 'police_witness',
                  'full_name': 'Patrick Boyle'
                }
              ],
              'attachments': []
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
        'category': 'False Arrest',
        'subcategory': 'Illegal Arrest/ False Arrest',
        'summary': 'Summary',
        'address': 'Talman Ave',
        'beat': '0831',
        'complainants': ['Black, Male, Age 45'],
        'victims': ['White, Male, Age 54'],
        'incidentDate': 'Jul 29, 2005',
        'startDate': 'Jul 29, 2005',
        'endDate': 'Jul 30, 2005',
        'location': 'Building',
        'point': '',
        'crid': '307389',
        'coaccused': [
          {
            'category': 'Operation\/Personnel Violations',
            'finalFinding': 'Sustained',
            'finalOutcome': 'Penalty Not Served',
            'fullName': 'Jerome Finnigan',
            'id': 2235,
            'rank': 'Police Officer',
            'findingOutcome': 'Sustained - Penalty Not Served',
            'percentile': {},
            'disciplined': true
          }
        ],
        'investigators': [
          {
            'involved_type': 'investigator',
            'full_name': 'Peter Parker',
            'percentile': {}
          }
        ],
        'policeWitnesses': [
          {
            'involved_type': 'police_witness',
            'full_name': 'Patrick Boyle',
            'percentile': {}
          }
        ],
        'attachments': []
      });
    });
  });
});
