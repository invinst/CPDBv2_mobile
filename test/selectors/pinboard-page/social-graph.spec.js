import {
  graphDataSelector,
  getSocialGraphRequesting,
  getCoaccusedData
} from 'selectors/pinboard-page/social-graph';


describe('PinboardPage selectors', function () {
  describe('graphDataSelector', function () {
    it('should return graph data correctly', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              officers: [
                {
                  'full_name': 'Jerome Finnigan',
                  'id': 1,
                },
                {
                  'full_name': 'Edward May',
                  'id': 2
                }
              ],
              'coaccused_data': [
                {
                  'officer_id_1': 1,
                  'officer_id_2': 2,
                  'incident_date': '1988-10-03T00:00:00Z',
                  'accussed_count': 1,
                },
                {
                  'officer_id_1': 3,
                  'officer_id_2': 4,
                  'incident_date': '1990-10-03T00:00:00Z',
                  'accussed_count': 5,
                }
              ],
              'list_event': [
                '1988-10-03 00:00:00+00:00',
                '1989-12-11 00:00:00+00:00',
                '1990-01-09 00:00:00+00:00',
                '1990-12-13 00:00:00+00:00',
                '1991-01-02 00:00:00+00:00',
                '1991-01-06 00:00:00+00:00',
                '1991-01-15 00:00:00+00:00',
                '1991-02-18 00:00:00+00:00',
                '1991-02-20 00:00:00+00:00',
                '1991-03-06 00:00:00+00:00'
              ]
            }
          }
        }
      };

      graphDataSelector(state).should.eql({
        officers: [
          {
            fullName: 'Jerome Finnigan',
            id: 1,
          },
          {
            fullName: 'Edward May',
            id: 2
          }
        ],
        coaccusedData: [
          {
            officerId1: 1,
            officerId2: 2,
            incidentDate: '1988-10-03T00:00:00Z',
            accussedCount: 1
          },
          {
            officerId1: 3,
            officerId2: 4,
            incidentDate: '1990-10-03T00:00:00Z',
            accussedCount: 5
          }
        ],
        listEvent: [
          '1988-10-03 00:00:00+00:00',
          '1989-12-11 00:00:00+00:00',
          '1990-01-09 00:00:00+00:00',
          '1990-12-13 00:00:00+00:00',
          '1991-01-02 00:00:00+00:00',
          '1991-01-06 00:00:00+00:00',
          '1991-01-15 00:00:00+00:00',
          '1991-02-18 00:00:00+00:00',
          '1991-02-20 00:00:00+00:00',
          '1991-03-06 00:00:00+00:00'
        ]
      });
    });
  });

  describe('getRequesting', function () {
    it('should return requesting status', function () {
      getSocialGraphRequesting({
        pinboardPage: {
          graphData: { requesting: false, data: {} }
        }
      }).should.be.false();

      getSocialGraphRequesting({
        pinboardPage: {
          graphData: { requesting: true, data: {}, }
        }
      }).should.be.true();
    });
  });

  describe('getCoaccusedData', function () {
    it('should return coaccused data data correctly', function () {
      const coaccusedData = [
        {
          'officer_id_1': 1,
          'officer_id_2': 2,
          'incident_date': '1988-10-03',
          'accussed_count': 1,
        },
        {
          'officer_id_1': 3,
          'officer_id_2': 4,
          'incident_date': '1990-10-03',
          'accussed_count': 5,
        }
      ];
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              officers: [
                {
                  'full_name': 'Jerome Finnigan',
                  'id': 1,
                  'percentile': {
                    'percentile_trr': '78.2707',
                    'percentile_allegation_civilian': '97.8772',
                    'percentile_allegation_internal': '61.1521'
                  },
                },
              ],
              'coaccused_data': coaccusedData,
              'list_event': [
                '1988-10-03',
              ]
            }
          }
        }
      };

      getCoaccusedData(state).should.eql(coaccusedData);
    });
  });
});
