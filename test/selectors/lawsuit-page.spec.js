import { lawsuitSelector } from 'selectors/lawsuit-page';
import should from 'should';

describe('Lawsuit selectors', function () {
  describe('lawsuitSelector', function () {
    const props = {
      match: {
        params: {
          lawsuitCaseNo: '00-L-5230',
        },
      },
    };
    const state = (totalSettlement = 90000) => ({
      lawsuitPage: {
        lawsuits: {
          '00-L-5230': {
            'case_no': '00-L-5230',
            'summary': 'Hutchinson was shot and killed outside a bar near the Addison Red Line stop.',
            'primary_cause': 'EXCESSIVE FORCE/MINOR',
            'address': '200 E. Chicago Ave., Chicago IL',
            'incident_date': '2000-03-16',
            'location': 'near intersection of N Wavelandand Sheffield',
            'plaintiffs': [
              {
                'name': 'Sharon Ambielli',
              },
              {
                'name': 'Kevin Vodak',
              },
            ],
            'officers': [
              {
                'percentile_allegation': '59.5430',
                'percentile_trr': '49.1036',
                'percentile_allegation_civilian': '47.6380',
                'percentile_allegation_internal': '0.0000',
                'id': 32218,
                'full_name': 'Joseph Nega',
                'allegation_count': 12,
                'sustained_count': 0,
                'birth_year': 1964,
                'race': 'White',
                'gender': 'M',
                'rank': 'Detective',
                'lawsuit_count': 3,
                'total_lawsuit_settlements': '7500022500.00',
              },
              {
                'percentile_allegation': '34.6987',
                'percentile_trr': '67.9110',
                'percentile_allegation_civilian': '43.9207',
                'percentile_allegation_internal': '0.0000',
                'id': 32300,
                'full_name': 'Robert Rose',
                'allegation_count': 4,
                'sustained_count': 0,
                'birth_year': 1964,
                'race': 'White',
                'gender': 'M',
                'rank': 'Detective',
                'lawsuit_count': 3,
                'total_lawsuit_settlements': '7500022500.00',
              },
            ],
            'interactions': [
              'Protest',
            ],
            'services': [
              'On Duty',
            ],
            'misconducts': [
              'Excessive force',
              'Racial epithets',
            ],
            'violences': [
              'Physical Force',
            ],
            'outcomes': [
              'Killed by officer',
            ],
            'point': {
              'lon': 37.3,
              'lat': 80.2,
            },
            'payments': [
              {
                'payee': 'Genre Wilson',
                'settlement': '0.00',
                'legal_fees': '2500000000.00',
              },
              {
                'payee': 'Lucy Bells',
                'settlement': totalSettlement,
                'legal_fees': '0.00',
              },
            ],
            'total_payments': `${2500000000.00 + totalSettlement}`,
            'total_settlement': `${totalSettlement}`,
            'total_legal_fees': '2500000000.00',
            'attachment': {
              'id': '95636',
              'title': 'Product all far later exist he author.',
              'file_type': 'document',
              'url': 'https://assets.documentcloud.org/documents/6246754/CRID-1086093-CR-COPA-Summary-Report.pdf',
              'preview_image_url': 'https://assets.documentcloud.org/documents/'
                + '6246754/pages/CRID-1086093-CR-COPA-Summary-Report-p1-normal.gif',
            },
          },
        },
      },
    });

    it('should do nothing & return null if lawsuit is not found', function () {
      const state = {
        lawsuitPage: {
          lawsuits: {},
        },
      };
      const props = {
        match: {
          params: {
            lawsuitCaseNo: '1',
          },
        },
      };
      should(lawsuitSelector(state, props)).be.null();
    });

    it('should return correct result', function () {
      lawsuitSelector(state(), props).should.eql(
        {
          'address': '200 E. Chicago Ave., Chicago IL',
          'caseNo': '00-L-5230',
          'primaryCause': 'EXCESSIVE FORCE/MINOR',
          'incidentDate': '2000-03-16',
          'location': 'near intersection of N Wavelandand Sheffield',
          'interactions': ['Protest'],
          'misconducts': [
            'Excessive force',
            'Racial epithets',
          ],
          'officers': [
            {
              'complaintCount': 12,
              'fullName': 'Joseph Nega',
              'officerId': 32218,
              'percentile': {
                'items': [
                  {
                    'axis': 'Use of Force Reports',
                    'value': 49.1036,
                  },
                  {
                    'axis': 'Internal Allegations',
                    'value': 0,
                  },
                  {
                    'axis': 'Civilian Allegations',
                    'value': 47.638,
                  },
                ],
                'textColor': '#231F20',
                'visualTokenBackground': '#FF6453',
              },
              'url': '/officer/32218/joseph-nega/',
              'allegationPercentile': 59.543,
              'sustainedCount': 0,
              'age': '53-year-old',
              'isPinned': false,
              'race': 'White',
              'gender': 'm',
              'rank': 'Detective',
              'lawsuitCount': 3,
              'totalLawsuitSettlements': '7.5b',
            },
            {
              'complaintCount': 4,
              'fullName': 'Robert Rose',
              'officerId': 32300,
              'percentile': {
                'items': [
                  {
                    'axis': 'Use of Force Reports',
                    'value': 67.911,
                  },
                  {
                    'axis': 'Internal Allegations',
                    'value': 0,
                  },
                  {
                    'axis': 'Civilian Allegations',
                    'value': 43.9207,
                  },
                ],
                'textColor': '#231F20',
                'visualTokenBackground': '#F4A298',
              },
              'url': '/officer/32300/robert-rose/',
              'allegationPercentile': 34.6987,
              'sustainedCount': 0,
              'age': '53-year-old',
              'isPinned': false,
              'race': 'White',
              'gender': 'm',
              'rank': 'Detective',
              'lawsuitCount': 3,
              'totalLawsuitSettlements': '7.5b',
            },
          ],
          'outcomes': ['Killed by officer'],
          'point': {
            'lon': 37.3,
            'lat': 80.2,
          },
          'payments': [
            {
              'legalFees': '2,500,000,000.00',
              'payee': 'Genre Wilson',
              'settlement': null,
            },
            {
              'legalFees': null,
              'payee': 'Lucy Bells',
              'settlement': '90,000.00',
            },
          ],
          'plaintiffs': [
            { 'name': 'Sharon Ambielli' },
            { 'name': 'Kevin Vodak' },
          ],
          'services': ['On Duty'],
          'summary': 'Hutchinson was shot and killed outside a bar near the Addison Red Line stop.',
          'totalPaymentsDetails': {
            'totalPayments': '2,500,090,000.00',
            'totalLegalFees': '2,500,000,000.00',
            'totalSettlement': '90,000.00',
            'mustBeAcceptedByCouncilCity': false,
          },
          'totalPaymentsDisplay': '2.5b',
          'violences': ['Physical Force'],
          'attachment': {
            'id': '95636',
            'title': 'Product all far later exist he author.',
            'fileType': 'document',
            'url': 'https://assets.documentcloud.org/documents/6246754/CRID-1086093-CR-COPA-Summary-Report.pdf',
            'previewImageUrl': 'https://assets.documentcloud.org/documents/'
              + '6246754/pages/CRID-1086093-CR-COPA-Summary-Report-p1-normal.gif',
          },
        }
      );
    });

    it('should return correct result when primary_cause is null', function () {
      const store = state();
      store.lawsuitPage.lawsuits['00-L-5230']['primary_cause'] = null;
      lawsuitSelector(store, props).primaryCause.should.eql('Unknown');
    });

    describe('totalPaymentsDetails', function () {
      it('should return correct result when total settlement over 100K', function () {
        lawsuitSelector(state(110000), props).totalPaymentsDetails.should.eql({
          'totalPayments': '2,500,110,000.00',
          'totalLegalFees': '2,500,000,000.00',
          'totalSettlement': '110,000.00',
          'mustBeAcceptedByCouncilCity': true,
        });
      });

      it('should return correct result when total settlement under 100K', function () {
        lawsuitSelector(state(90000), props).totalPaymentsDetails.should.eql({
          'totalPayments': '2,500,090,000.00',
          'totalLegalFees': '2,500,000,000.00',
          'totalSettlement': '90,000.00',
          'mustBeAcceptedByCouncilCity': false,
        });
      });
    });
  });
});
