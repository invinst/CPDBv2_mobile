import should from 'should';
import { stub } from 'sinon';

import { trrSelector, getCMSRequested, buttonText, requestDocumentButtonMessage } from 'selectors/trr-page';
import * as draftjsUtils from 'utils/draftjs';


describe('trr-page selectors', function () {
  describe('trrSelector', function () {
    it('should do nothing & return null if trr is not found', function () {
      const state = {
        trrPage: {
          trrs: {},
        },
      };
      const props = {
        match: {
          params: {
            trrId: '1',
          },
        },
      };
      should(trrSelector(state, props)).be.null();
    });

    it('should correctly get and transform trr data', function () {
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
                  'description': 'Targeted Response Unit',
                },
                'percentile_allegation': 88.8,
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
              beat: 612,
            },
          },
        },
      };

      const props = {
        match: {
          params: {
            trrId: 781,
          },
        },
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
            items: [
              { axis: 'Use of Force Reports', value: 99.9 },
              { axis: 'Internal Allegations', value: 11.1 },
              { axis: 'Civilian Allegations', value: 22.2 },
            ],
            visualTokenBackground: '#FF412C',
            textColor: '#231F20',
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

    it('should correctly handle some missing data cases', function () {
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
              beat: 612,
            },
          },
        },
      };

      const props = {
        match: {
          params: {
            trrId: 781,
          },
        },
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

  describe('getCMSRequested selector', function () {
    it('should return the correct state of the cms requested', function () {
      getCMSRequested({ trrPage: { cmsRequested: true } }).should.be.true();
      getCMSRequested({ trrPage: { cmsRequested: false } }).should.be.false();
    });
  });

  describe('buttonText selector', function () {
    it('should return Request Documents', function () {
      buttonText().should.eql('Request Documents');
    });
  });

  describe('requestDocumentButtonMessage selector', function () {
    it('should return document request instruction message', function () {
      stub(draftjsUtils, 'convertContentStateToEditorState').callsFake((args) => args);
      const state = {
        trrPage: {
          cms: [
            {
              name: 'document_request_instruction',
              value: 'This is document request instruction message',
            },
            {
              name: 'some_fake_document',
              value: 'This is some fake message',
            },
          ],
        },
      };

      requestDocumentButtonMessage(state).should.eql('This is document request instruction message');
    });
  });
});
