import { coaccusalGroupsSelector, hasCoaccusalSelector, isCoaccusalSuccess } from 'selectors/officer-page/coaccusals';


describe('Officer coaccusals selectors', function () {
  describe('coaccusalGroupsSelector', function () {
    it('should return empty if the state is empty', function () {
      coaccusalGroupsSelector({
        officerPage: {
          coaccusals: {
            data: [],
          },
        },
      }, 8562).should.be.empty();
    });

    it('should group coaccusals into correct groups', function () {
      const state = {
        pinboardPage: { pinboard: { 'officer_ids': ['1', '2'] } },
        officerPage: {
          coaccusals: {
            data: {
              8562: [
                {
                  id: 1,
                  'full_name': 'Jerome Finnigan',
                  'coaccusal_count': 4,
                  rank: 'Po As Detective',
                  'percentile_allegation': '96.0',
                  'percentile_allegation_civilian': '94.0',
                  'percentile_allegation_internal': '93.0',
                  'percentile_trr': '95.0',
                },
                {
                  id: 2,
                  'full_name': 'Edward May',
                  'coaccusal_count': 2,
                  rank: 'Po As Detective',
                  'percentile_allegation': '86.0',
                  'percentile_allegation_civilian': '83.0',
                  'percentile_allegation_internal': '84.0',
                  'percentile_trr': '85.0',
                },
                {
                  id: 3,
                  'full_name': 'Richard Coyle',
                  'coaccusal_count': 1,
                  rank: 'Police Officer',
                  'percentile_allegation': '76.0',
                  'percentile_allegation_civilian': '73.0',
                  'percentile_allegation_internal': '74.0',
                  'percentile_trr': '75.0',
                },
              ],
            },
          },
        },
      };

      coaccusalGroupsSelector(state, 8562).should.eql([
        {
          name: 'COACCUSED 2-4 TIMES',
          coaccusals: [
            {
              id: 1,
              officerId: 1,
              fullName: 'Jerome Finnigan',
              coaccusalCount: 4,
              rank: 'Po As Detective',
              percentile: {
                items: [
                  {
                    'axis': 'Use of Force Reports',
                    'value': 95,
                  },
                  {
                    'axis': 'Internal Allegations',
                    'value': 93,
                  },
                  {
                    'axis': 'Civilian Allegations',
                    'value': 94,
                  },
                ],
                textColor: '#DFDFDF',
                visualTokenBackground: '#F52524',
              },
              isPinned: true,
            },
            {
              id: 2,
              officerId: 2,
              fullName: 'Edward May',
              coaccusalCount: 2,
              rank: 'Po As Detective',
              percentile: {
                items: [
                  {
                    'axis': 'Use of Force Reports',
                    'value': 85,
                  },
                  {
                    'axis': 'Internal Allegations',
                    'value': 84,
                  },
                  {
                    'axis': 'Civilian Allegations',
                    'value': 83,
                  },
                ],
                textColor: '#231F20',
                visualTokenBackground: '#FF412C',
              },
              isPinned: true,
            },
          ],
        },
        {
          name: 'COACCUSED 1 TIME',
          coaccusals: [
            {
              id: 3,
              officerId: 3,
              fullName: 'Richard Coyle',
              coaccusalCount: 1,
              rank: 'Police Officer',
              percentile: {
                items: [
                  {
                    'axis': 'Use of Force Reports',
                    'value': 75,
                  },
                  {
                    'axis': 'Internal Allegations',
                    'value': 74,
                  },
                  {
                    'axis': 'Civilian Allegations',
                    'value': 73,
                  },
                ],
                textColor: '#231F20',
                visualTokenBackground: '#FF412C',
              },
              isPinned: false,
            },
          ],
        },
      ]);
    });
  });

  describe('hasCoaccusalSelector', function () {
    it('should return false when there is no data', function () {
      const state = {
        officerPage: {
          coaccusals: {
            data: {},
          },
        },
      };
      hasCoaccusalSelector(state).should.be.false();
    });

    it('should return true when have data', function () {
      const state = {
        officerPage: {
          coaccusals: {
            data: {
              8562: [{
                id: 1,
                'full_name': 'Jerome Finnigan',
                'coaccusal_count': 4,
                rank: 'Po As Detective',
                'percentile_trr': '95.0000',
                'percentile_allegation_internal': '94.0000',
                'percentile_allegation_civilian': '93.0000',
              }],
            },
          },
        },
      };
      hasCoaccusalSelector(state, 8562).should.be.true();
    });
  });

  describe('isCoaccusalSuccess', function () {
    it('should return default value', function () {
      const state = {
        officerPage: {
          coaccusals: {
            isSuccess: {
              123: true,
            },
          },
        },
      };
      isCoaccusalSuccess(state, 8562).should.be.false();
    });

    it('should return correct value', function () {
      const state = {
        officerPage: {
          coaccusals: {
            isSuccess: {
              8562: true,
            },
          },
        },
      };
      isCoaccusalSuccess(state, 8562).should.be.true();
    });
  });
});
