import should from 'should';

import { trrSelector } from 'selectors/trr-page';


describe('trr-page selectors', () => {
  describe('trrSelector', () => {
    it('should do nothing & return null if trr is not found', () => {
      const state = {
        trrPage: {
          trrs: {}
        }
      };
      const props = {
        params: {
          trrId: '1'
        }
      };
      should(trrSelector(state, props)).be.null();
    });

    it('should correctly get and transform trr data', () => {
      const state = {
        trrPage: {
          trrs: {
            111: { 'force_category': 'Firearm' },
            781: {
              id: 123,
              officer: {
                id: 583,
                'full_name': 'Donovan Markiewicz',
                gender: 'Male',
                race: 'White',
                'appointed_date': '2005-09-26',
                'birth_year': 1973,
                'date_of_resignation': '2015-12-23',
                unit: {
                  'unit_name': '253',
                  'description': 'Targeted Response Unit'
                },
                'percentile_allegation_internal': 11.1,
                'percentile_allegation_civilian': 22.2,
                'percentile_trr': 99.9,
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
              point: {
                lng: 1.1,
                lat: 2.2,
              },
              address: '11XX 79Th St',
              beat: 612
            }
          }
        }
      };

      const props = {
        params: {
          trrId: 781
        }
      };

      trrSelector(state, props).should.eql({
        category: 'Other',
        officer: {
          officerId: 583,
          fullName: 'Donovan Markiewicz',
          demographic: '44 years old, white, male.',
          careerDuration: 'SEP 26, 2005 — DEC 23, 2015',
          unitName: '253',
          unitDescription: 'Targeted Response Unit',
          assignedBeat: 'Beat 4682E',
          onDuty: 'Yes',
          inUniform: 'No',
          percentile: {
            officerId: undefined,
            year: undefined,
            items: [
              { axis: 'Use of Force Reports', value: 99.9 },
              { axis: 'Internal Allegations', value: 11.1 },
              { axis: 'Civilian Allegations', value: 22.2 }
            ],
            visualTokenBackground: '#e85050',
            textColor: '#231F20',
            hasEnoughPercentile: true,
          },
        },
        info: {
          victimDemographic: 'Black, Male, Age 27',
          forceTypes: ['Physical Force - Stunning', 'Verbal Commands', 'Member Presence'],
          incidentDate: 'APR 23, 2004',
          address: '11XX 79Th St',
          locationType: 'Street',
          point: {
            lng: 1.1,
            lat: 2.2,
          },
          beat: '612',
        },
      });
    });

    it('should correctly handle some missing data cases', () => {
      const state = {
        trrPage: {
          trrs: {
            111: { 'force_category': 'Firearm' },
            781: {
              id: 123,
              'officer_in_uniform': false,
              'officer_assigned_beat': '4682E',
              'officer_on_duty': true,
              'subject_race': 'BLACK',
              'subject_age': 27,
              'force_category': 'Other',
              'force_types': ['Physical Force - Stunning', 'Verbal Commands', 'Member Presence'],
              'date_of_incident': '2004-04-23',
              'location_type': 'Street',
              address: '11XX 79Th St',
              beat: 612
            }
          }
        }
      };

      const props = {
        params: {
          trrId: 781
        }
      };

      trrSelector(state, props).should.eql({
        category: 'Other',
        officer: {},
        info: {
          victimDemographic: 'Black, Age 27',
          forceTypes: ['Physical Force - Stunning', 'Verbal Commands', 'Member Presence'],
          incidentDate: 'APR 23, 2004',
          address: '11XX 79Th St',
          locationType: 'Street',
          point: undefined,
          beat: '612',
        },
      });
    });
  });
});
