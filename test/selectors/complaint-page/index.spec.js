import should from 'should';
import sinon from 'sinon';
import { find } from 'lodash';

import * as draftjsUtils from 'utils/draftjs';
import {
  complaintSelector,
  getCMSRequested,
  buttonText,
  requestDocumentButtonMessage,
} from 'selectors/complaint-page';
import { CoaccusedFactory } from 'utils/tests/factories/complaint';


describe('complaint-page selectors', function () {
  describe('complaintSelector', function () {
    it('should do nothing & return null if complaint is not found', function () {
      const state = {
        breadcrumb: {
          breadcrumbs: [],
        },
        complaintPage: {
          complaints: {},
        },
      };
      const props = {
        params: {
          complaintId: '1',
        },
      };
      should(complaintSelector(state, props)).be.null();
    });

    it('should return default value if not found', function () {
      const state = {
        breadcrumb: {
          breadcrumbs: [],
        },
        complaintPage: {
          complaints: {
            '111': {
              'incident_date': null,
              coaccused: [],
            },
          },
        },
      };

      const props = {
        params: {
          complaintId: '111',
        },
      };

      const result = complaintSelector(state, props);
      should(result.incidentDate).be.null();
      result.category.should.eql('Unknown');
      result.subcategory.should.eql('Unknown');
    });

    it('should correctly get and transform complaint data', function () {
      const state = {
        breadcrumb: {
          breadcrumbs: [],
        },
        complaintPage: {
          complaints: {
            '111': {
              'most_common_category': {
                'category': 'False Arrest',
                'allegation_name': 'Illegal Arrest/ False Arrest',
              },
              'summary': 'Summary',
              'address': 'Talman Ave',
              'beat': '0831',
              'complainants': [{
                'gender': 'Male',
                'age': 45,
                'race': 'Black',
              }],
              'victims': [{
                'gender': 'Male',
                'age': 54,
                'race': 'White',
              }],
              'incident_date': '2005-07-29',
              'location': 'Building',
              'start_date': '2005-07-29',
              'end_date': '2005-07-30',
              'point': '',
              'crid': '307389',
              'coaccused': [
                {
                  'category': 'Operation/Personnel Violations',
                  'final_outcome': 'Penalty Not Served',
                  'full_name': 'Jerome Finnigan',
                  'allegation_count': 1,
                  'id': 2235,
                  'final_finding': 'Sustained',
                  'rank': 'Police Officer',
                  'disciplined': true,
                },
              ],
              'involvements': [
                {
                  'officer_id': 1,
                  'involved_type': 'investigator',
                  'full_name': 'Peter Parker',
                },
                {
                  'officer_id': 2,
                  'involved_type': 'police_witness',
                  'full_name': 'Patrick Boyle',
                },
              ],
              'attachments': [
                {
                  'file_type': 'audio',
                  'url': 'http://audio.io',
                  'preview_image_url': 'http://preview.audio',
                  'title': 'audio',
                  'id': '123456',
                },
                {
                  'file_type': 'document',
                  'url': 'http://document.io/file.pdf',
                  'preview_image_url': 'http://preview.document',
                  'title': 'document',
                  'id': '654321',
                },
              ],
            },
          },
        },
      };

      const props = {
        params: {
          complaintId: '111',
        },
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
            'category': 'Operation/Personnel Violations',
            'finalFinding': 'Sustained',
            'finalOutcome': 'Penalty Not Served',
            'fullName': 'Jerome Finnigan',
            'allegationCount': 1,
            'id': 2235,
            'rank': 'Police Officer',
            'findingOutcome': 'Sustained - Penalty Not Served',
            'percentile': null,
            'disciplined': true,
            'isPinned': false,
          },
        ],
        'investigators': [
          {
            'involved_type': 'investigator',
            'full_name': 'Peter Parker',
            'officer_id': 1,
            'percentile': null,
          },
        ],
        'policeWitnesses': [
          {
            'involved_type': 'police_witness',
            'full_name': 'Patrick Boyle',
            'officer_id': 2,
            'percentile': null,
          },
        ],
        'attachments': [
          {
            'fileType': 'audio',
            'url': 'http://audio.io',
            'previewImageUrl': 'http://preview.audio',
            'title': 'audio',
            'id': '123456',
          },
          {
            'fileType': 'document',
            'url': 'http://document.io/file.pdf',
            'previewImageUrl': 'http://preview.document',
            'title': 'document',
            'id': '654321',
          },
        ],
      });
    });

    it('should return list of coaccused with isPinned', function () {
      const state = {
        complaintPage: {
          complaints: {
            '123': {
              coaccused: [
                CoaccusedFactory.build({ id: 1 }),
                CoaccusedFactory.build({ id: 2 }),
              ],
            },
          },
        },
        pinboardPage: {
          pinboard: {
            'officer_ids': ['1'],
          },
        },
      };

      const props = {
        params: {
          complaintId: '123',
        },
      };

      const coaccusals = complaintSelector(state, props).coaccused;
      find(coaccusals, { id: 1 }).isPinned.should.be.true();
      find(coaccusals, { id: 2 }).isPinned.should.be.false();
    });
  });

  it('should prioritize officers user visited', function () {
    const state = {
      breadcrumb: {
        breadcrumbs: [
          {
            url: '/officer/1/',
            params: {
              officerId: '1',
            },
          },
          {
            url: '/officer/2/',
            params: {
              officerId: '2',
            },
          },
        ],
      },
      complaintPage: {
        complaints: {
          '123': {
            crid: '123',
            coaccused: [{ id: 3 }, { id: 2 }, { id: 1 }],
          },
        },
      },
    };

    const props = {
      params: {
        complaintId: '123',
      },
    };

    complaintSelector(state, props).coaccused.map(obj => obj.id).should.eql([2, 1, 3]);
  });

  it('should prioritize officer with sustained finding', function () {
    const state = {
      breadcrumb: {
        breadcrumbs: [],
      },
      complaintPage: {
        complaints: {
          '123': {
            crid: '123',
            coaccused: [
              { 'id': 1, 'final_finding': 'Unsustained' },
              { 'id': 2, 'final_finding': 'Sustained' },
            ],
          },
        },
      },
    };

    const props = {
      params: {
        complaintId: '123',
      },
    };

    complaintSelector(state, props).coaccused.map(obj => obj.id).should.eql([2, 1]);
  });

  it('should prioritize officers with most complaints', function () {
    const state = {
      breadcrumb: {
        breadcrumbs: [],
      },
      complaintPage: {
        complaints: {
          '123': {
            crid: '123',
            coaccused: [
              { 'id': 1, 'allegation_count': 1 },
              { 'id': 2, 'allegation_count': 2 },
            ],
          },
        },
      },
    };

    const props = {
      params: {
        complaintId: '123',
      },
    };

    complaintSelector(state, props).coaccused.map(obj => obj.id).should.eql([2, 1]);
  });

  it('getCMSRequested', function () {
    getCMSRequested({ complaintPage: { cmsRequested: true } }).should.be.true();
    getCMSRequested({ complaintPage: { cmsRequested: false } }).should.be.false();
  });

  describe('buttonText selector', function () {
    it('should return New Document Notifications if we have attachments', function () {
      const state = {
        breadcrumb: {
          breadcrumbs: [],
        },
        complaintPage: {
          complaints: {
            '123': {
              crid: '123',
              attachments: [{
                url: 'https://assets.documentcloud.org/documents/3518950/CRID-294088-CR.pdf',
                'preview_image_url': 'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088.pdf',
                title: 'CRID 294088 CR',
                'file_type': 'document',
              }],
            },
          },
        },
      };

      const props = {
        crid: '123',
      };
      buttonText(state, props).should.eql('New Document Notifications');
    });

    it('should return Request Documents if we have no attachment', function () {
      const state = {
        breadcrumb: {
          breadcrumbs: [],
        },
        complaintPage: {
          complaints: {
            '123': {
              crid: '123',
              attachments: [],
            },
          },
        },
      };

      const props = {
        crid: '123',
      };
      buttonText(state, props).should.eql('Request Documents');
    });
  });

  describe('requestDocumentButtonMessage selector', function () {
    beforeEach(function () {
      sinon.stub(draftjsUtils, 'convertContentStateToEditorState').callsFake((args) => args);
    });

    it('should return document request instruction message', function () {
      const state = {
        complaintPage: {
          cms: [
            {
              name: 'document_request_instruction',
              value: 'This is document request instruction message',
            },
            {
              name: 'new_document_notification',
              value: 'This is new document notification instruction message',
            },
          ],
          complaints: {
            '123': {
              crid: '123',
              attachments: [],
            },
          },
        },
      };

      const props = {
        crid: '123',
      };
      requestDocumentButtonMessage(state, props).should.eql('This is document request instruction message');
    });

    it('should return new document notification instruction message', function () {
      const state = {
        complaintPage: {
          cms: [
            {
              name: 'document_request_instruction',
              value: 'This is document request instruction message',
            },
            {
              name: 'new_document_notification',
              value: 'This is new document notification instruction message',
            },
          ],
          complaints: {
            '123': {
              crid: '123',
              attachments: [{
                url: 'https://assets.documentcloud.org/documents/3518950/CRID-294088-CR.pdf',
                'preview_image_url': 'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088.pdf',
                title: 'CRID 294088 CR',
                'file_type': 'document',
              }],
            },
          },
        },
      };

      const props = {
        crid: '123',
      };
      requestDocumentButtonMessage(state, props).should.eql('This is new document notification instruction message');
    });
  });
});
